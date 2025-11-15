import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Voter from '@/lib/models/Voter';
import AC210 from '@/lib/models/AC210';
import AC211 from '@/lib/models/AC211';
import AC212 from '@/lib/models/AC212';
import AC224 from '@/lib/models/AC224';
import AC225 from '@/lib/models/AC225';
import AC226 from '@/lib/models/AC226';
import AC227 from '@/lib/models/AC227';
import LegacyPart from '@/lib/models/LegacyPart';

// Model mapping based on tsc (Taluk/Constituency) parameter
const MODEL_MAP: Record<string, any> = {
  'AC210': AC210,
  'AC211': AC211,
  'AC212': AC212,
  'AC224': AC224,
  'AC225': AC225,
  'AC226': AC226,
  'AC227': AC227,
  'Voter': Voter, // Default/legacy
};

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const tsc = searchParams.get('tsc') || 'Voter'; // Get constituency parameter
    const name = searchParams.get('name') || '';
    const relationName = searchParams.get('relationName') || '';
    const idCardNo = searchParams.get('idCardNo') || '';
    const partNo = searchParams.get('partNo');
    const age = searchParams.get('age');
    const sex = searchParams.get('sex');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Select the appropriate model based on tsc parameter
    const Model = MODEL_MAP[tsc] || Voter;

    // Validate tsc parameter
    if (!MODEL_MAP[tsc] && tsc !== 'Voter') {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid tsc parameter. Valid values are: ${Object.keys(MODEL_MAP).join(', ')}`,
        },
        { status: 400 }
      );
    }

    const andConditions = [];

    // Build search query based on provided fields
    if (name) {
      // Search only elector name in both Tamil and English fields (case-insensitive, partial match)
      andConditions.push({
        $or: [
          { fmNameV2: { $regex: name, $options: 'i' } },
          { fmNameEn: { $regex: name, $options: 'i' } },
        ],
      });
    }

    if (relationName) {
      // Search both Tamil and English relation name fields (case-insensitive, partial match)
      andConditions.push({
        $or: [
          { rlnFmNmV2: { $regex: relationName, $options: 'i' } },
          { rlnFmNmEn: { $regex: relationName, $options: 'i' } },
        ],
      });
    }

    if (idCardNo) {
      andConditions.push({ idCardNo: idCardNo });
    }

    // Apply additional filters
    if (partNo) {
      andConditions.push({ partNo: parseInt(partNo) });
    }
    if (age) {
      andConditions.push({ age: parseInt(age) });
    }
    if (sex) {
      andConditions.push({ sex: sex.toUpperCase() });
    }

    // Combine all conditions
    const searchQuery = andConditions.length > 0 ? { $and: andConditions } : {};

    // Execute search using aggregation to join with LegacyPart for polling station name
    // This joins voter data with LegacyPart table based on BOTH acNo AND partNo
    // Example: AC210 voter with partNo=1 -> LegacyPart record where acNo=210 AND partNo=1
    //          AC212 voter with partNo=5 -> LegacyPart record where acNo=212 AND partNo=5
    const [votersResult, total] = await Promise.all([
      Model.aggregate([
        { $match: searchQuery },
        { $sort: { acNo: 1, partNo: 1, slNoInPart: 1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: 'legacyparts', // MongoDB collection name (lowercase, pluralized)
            let: { acNo: '$acNo', partNo: '$partNo' }, // Pass both acNo and partNo from voter record
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$acNo', '$$acNo'] },     // Match on acNo (210, 211, 212, or 224)
                      { $eq: ['$partNo', '$$partNo'] }  // Match on partNo (1, 2, 3, etc.)
                    ]
                  }
                }
              },
              { $limit: 1 } // Get only the first matching record
            ],
            as: 'legacyPartInfo'
          }
        },
        {
          $addFields: {
            psName: {
              $ifNull: [
                { $arrayElemAt: ['$legacyPartInfo.partNameV1', 0] },
                '$psName' // Fallback to original psName if no match found
              ]
            }
          }
        },
        {
          $project: {
            legacyPartInfo: 0 // Remove the temporary joined data
          }
        }
      ]),
      Model.countDocuments(searchQuery),
    ]);

    return NextResponse.json({
      success: true,
      data: votersResult,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred while searching',
      },
      { status: 500 }
    );
  }
}

