'use client';

import { useState } from 'react';
import SearchForm, { SearchParams } from '@/components/SearchForm';
import VoterResults from '@/components/VoterResults';

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

interface SearchResponse {
  success: boolean;
  data: Voter[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: string;
}

export default function Page() {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 50,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSearchParams, setCurrentSearchParams] = useState<SearchParams | null>(null);

  const performSearch = async (params: SearchParams, page: number = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams({
        page: page.toString(),
        limit: '50',
      });

      if (params.name) searchParams.append('name', params.name);
      if (params.relationName) searchParams.append('relationName', params.relationName);
      if (params.houseNo) searchParams.append('houseNo', params.houseNo);
      if (params.idCardNo) searchParams.append('idCardNo', params.idCardNo);
      if (params.partNo) searchParams.append('partNo', params.partNo);
      if (params.age) searchParams.append('age', params.age);
      if (params.sex) searchParams.append('sex', params.sex);

      const response = await fetch(`/api/voters/search?${searchParams.toString()}`);
      const data: SearchResponse = await response.json();

      if (data.success) {
        setVoters(data.data);
        setPagination(data.pagination);
        setCurrentSearchParams(params);
      } else {
        setError(data.error || 'An error occurred while searching');
        setVoters([]);
      }
    } catch (err) {
      setError('Failed to connect to server. Please try again.');
      setVoters([]);
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (params: SearchParams) => {
    performSearch(params, 1);
  };

  const handlePageChange = (page: number) => {
    if (currentSearchParams) {
      performSearch(currentSearchParams, page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thoothukudi Electoral Roll Search
          </h1>
          <p className="text-gray-600">
            Search the 2002 electoral roll for Assembly Constituency 210
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {voters.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <VoterResults
              voters={voters}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}
