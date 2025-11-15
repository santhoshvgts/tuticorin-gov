import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Voter from '@/lib/models/Voter';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name') || '';
    const relationName = searchParams.get('relationName') || '';
    const houseNo = searchParams.get('houseNo') || '';
    const idCardNo = searchParams.get('idCardNo') || '';
    const partNo = searchParams.get('partNo');
    const age = searchParams.get('age');
    const sex = searchParams.get('sex');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    const searchQuery: any = {};
    const andConditions: any[] = [];

    // Build search query based on provided fields
    if (name) {
      // Text search for Tamil names (case-insensitive, partial match)
      andConditions.push({
        $or: [
          { fmNameV2: { $regex: name, $options: 'i' } },
          { rlnFmNmV2: { $regex: name, $options: 'i' } },
        ],
      });
    }

    if (relationName) {
      // Search for relation name in Tamil (case-insensitive, partial match)
      andConditions.push({ rlnFmNmV2: { $regex: relationName, $options: 'i' } });
    }

    if (houseNo) {
      andConditions.push({ houseNo: houseNo });
    }

    if (idCardNo) {
      andConditions.push({ idCardNo: { $regex: idCardNo, $options: 'i' } });
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
    if (andConditions.length > 0) {
      searchQuery.$and = andConditions;
    }

    // Execute search
    const [voters, total] = await Promise.all([
      Voter.find(searchQuery)
        .sort({ acNo: 1, partNo: 1, slNoInPart: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Voter.countDocuments(searchQuery),
    ]);

    return NextResponse.json({
      success: true,
      data: voters,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An error occurred while searching',
      },
      { status: 500 }
    );
  }
}

