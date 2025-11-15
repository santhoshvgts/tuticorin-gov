'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@workspace/ui/components/button';

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

      <div className="overflow-x-auto">
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

