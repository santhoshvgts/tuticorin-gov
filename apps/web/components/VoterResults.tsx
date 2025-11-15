'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';
import { Card, CardContent } from '@workspace/ui/components/card';

interface Voter {
  _id: string;
  acNo: number;
  partNo: number;
  slNoInPart: number;
  houseNo?: string;
  sectionNo?: string;
  fmNameV2?: string;
  rlnFmNmV2?: string;
  rlnType?: string;
  age?: number;
  sex?: string;
  idCardNo?: string;
  psName?: string;
}

interface VoterResultsProps {
  voters: Voter[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

export default function VoterResults({ voters, pagination, onPageChange }: VoterResultsProps) {
  if (voters.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>No results found. Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
          {pagination.total.toLocaleString()} results
        </p>
      </div>

      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-3">
        {voters.map((voter) => (
          <Card key={voter._id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-base text-gray-900">
                      {voter.fmNameV2 || '-'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {voter.rlnFmNmV2 ? `${voter.rlnType}: ${voter.rlnFmNmV2}` : '-'}
                    </div>
                  </div>
                  <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                    SL {voter.slNoInPart}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pt-2 border-t">
                  <div>
                    <span className="text-gray-500">AC/Part:</span>
                    <span className="ml-1 font-medium">{voter.acNo}/{voter.partNo}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">House:</span>
                    <span className="ml-1 font-medium">{voter.houseNo || '-'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Age:</span>
                    <span className="ml-1 font-medium">{voter.age || '-'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Gender:</span>
                    <span className="ml-1 font-medium">{voter.sex || '-'}</span>
                  </div>
                  {voter.idCardNo && (
                    <div className="col-span-2">
                      <span className="text-gray-500">ID Card:</span>
                      <span className="ml-1 font-mono text-xs">{voter.idCardNo}</span>
                    </div>
                  )}
                  {voter.psName && (
                    <div className="col-span-2">
                      <span className="text-gray-500">Polling Station:</span>
                      <span className="ml-1 text-xs">{voter.psName}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                AC No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                Part No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                SL No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                Name (Tamil)
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                Relation
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                House No
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                Age
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                Gender
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                ID Card
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">
                Polling Station
              </th>
            </tr>
          </thead>
          <tbody>
            {voters.map((voter) => (
              <tr key={voter._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2 text-sm">{voter.acNo}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">{voter.partNo}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">{voter.slNoInPart}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm font-medium">
                  {voter.fmNameV2 || '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  {voter.rlnFmNmV2 ? `${voter.rlnFmNmV2} (${voter.rlnType || ''})` : '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  {voter.houseNo || '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm">{voter.age || '-'}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm">{voter.sex || '-'}</td>
                <td className="border border-gray-300 px-4 py-2 text-sm font-mono text-xs">
                  {voter.idCardNo || '-'}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-sm">{voter.psName || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

