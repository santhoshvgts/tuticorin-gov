'use client';

import { useState } from 'react';
import SearchForm, { SearchParams } from '@/components/SearchForm';
import VoterResults from '@/components/VoterResults';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

  const handleReset = () => {
    setVoters([]);
    setPagination({
      total: 0,
      page: 1,
      limit: 50,
      totalPages: 0,
    });
    setCurrentSearchParams(null);
    setError(null);
  };

  const handlePageChange = (page: number) => {
    if (currentSearchParams) {
      performSearch(currentSearchParams, page);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      {/* Sticky Search Form - Desktop Only */}
      <div className="hidden lg:block sticky top-[73px] z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <SearchForm onSearch={handleSearch} onReset={handleReset} isLoading={isLoading} />
        </div>
      </div>

      {/* Mobile Search Form */}
      <div className="lg:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <SearchForm onSearch={handleSearch} onReset={handleReset} isLoading={isLoading} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 lg:py-6 flex-1">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Results */}
        {voters.length > 0 && (
          <VoterResults
            voters={voters}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}

        {/* Empty State - No Search Applied */}
        {!error && voters.length === 0 && !currentSearchParams && (
          <div className="p-8 lg:p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <svg
                  className="mx-auto h-20 w-20 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Search Electoral Roll</h3>
              <div className="space-y-3 text-sm text-gray-600 text-left max-w-lg mx-auto">
                <p className="font-medium text-center mb-4">Use the filters above to search for voters:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li><span className="font-medium">Name:</span> Search by voter name or relation name (supports Tamil and English)</li>
                  <li><span className="font-medium">Relation Name:</span> Search by father/husband/mother name</li>
                  <li><span className="font-medium">House Number:</span> Search by exact house number</li>
                  <li><span className="font-medium">ID Card Number:</span> Search by exact EPIC/Voter ID number</li>
                  <li><span className="font-medium">Part Number:</span> Search by specific part number</li>
                  <li><span className="font-medium">More Filters:</span> Filter by age and gender</li>
                </ul>
                <p className="text-center mt-6 text-gray-500 italic">
                  Enter at least one search criterion and click the Search button
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State - No Results Found */}
        {!error && voters.length === 0 && currentSearchParams && (
          <div className="p-8 lg:p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-4">
                <svg
                  className="mx-auto h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-sm text-gray-600 mb-4">
                We couldn't find any voters matching your search criteria. Please try adjusting your filters or search terms.
              </p>
              <button
                onClick={handleReset}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
