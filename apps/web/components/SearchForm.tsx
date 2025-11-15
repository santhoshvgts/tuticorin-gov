'use client';

import { useState } from 'react';
import { Button } from '@workspace/ui/components/button';
import { Search, Loader2 } from 'lucide-react';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export interface SearchParams {
  name?: string;
  relationName?: string;
  houseNo?: string;
  idCardNo?: string;
  partNo?: string;
  age?: string;
  sex?: string;
}

export default function SearchForm({ onSearch, isLoading }: SearchFormProps) {
  const [name, setName] = useState('');
  const [relationName, setRelationName] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [idCardNo, setIdCardNo] = useState('');
  const [partNo, setPartNo] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least one search field is filled
    if (!name.trim() && !relationName.trim() && !houseNo.trim() && !idCardNo.trim()) {
      return;
    }

    onSearch({
      name: name.trim() || undefined,
      relationName: relationName.trim() || undefined,
      houseNo: houseNo.trim() || undefined,
      idCardNo: idCardNo.trim() || undefined,
      partNo: partNo.trim() || undefined,
      age: age.trim() || undefined,
      sex: sex.trim() || undefined,
    });
  };

  const handleReset = () => {
    setName('');
    setRelationName('');
    setHouseNo('');
    setIdCardNo('');
    setPartNo('');
    setAge('');
    setSex('');
  };

  const hasSearchCriteria = name.trim() || relationName.trim() || houseNo.trim() || idCardNo.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name (Tamil)
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name in Tamil..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="relation-name" className="block text-sm font-medium mb-2">
            Relation Name (Tamil)
          </label>
          <input
            id="relation-name"
            type="text"
            value={relationName}
            onChange={(e) => setRelationName(e.target.value)}
            placeholder="Enter relation name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="house-no" className="block text-sm font-medium mb-2">
            House Number
          </label>
          <input
            id="house-no"
            type="text"
            value={houseNo}
            onChange={(e) => setHouseNo(e.target.value)}
            placeholder="Enter house number..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="id-card" className="block text-sm font-medium mb-2">
            ID Card Number
          </label>
          <input
            id="id-card"
            type="text"
            value={idCardNo}
            onChange={(e) => setIdCardNo(e.target.value)}
            placeholder="Enter ID card number..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="part-no" className="block text-sm font-medium mb-2">
            Part No
          </label>
          <input
            id="part-no"
            type="number"
            value={partNo}
            onChange={(e) => setPartNo(e.target.value)}
            placeholder="Filter by part number..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-sm font-medium mb-2">
            Age
          </label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Filter by age..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="sex" className="block text-sm font-medium mb-2">
            Gender
          </label>
          <select
            id="sex"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isLoading || !hasSearchCriteria}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
    </form>
  );
}

