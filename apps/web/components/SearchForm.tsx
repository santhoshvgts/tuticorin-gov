'use client';

import { useState } from 'react';
import { Button } from '@workspace/ui/components/button';
import { Search, Loader2, Filter, X } from 'lucide-react';
import PollingStationSelect from './PollingStationSelect';
import TransliterateInput from './TransliterateInput';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
  onReset?: () => void;
  isLoading: boolean;
  constituency: string;
}

export interface SearchParams {
  name?: string;
  relationName?: string;
  partNo?: string;
  sex?: string;
}

export default function SearchForm({ onSearch, onReset, isLoading, constituency }: SearchFormProps) {
  const [name, setName] = useState('');
  const [relationName, setRelationName] = useState('');
  const [partNo, setPartNo] = useState('');
  const [sex, setSex] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if at least one search field is filled
    if (!name.trim() && !relationName.trim()) {
      return;
    }

    onSearch({
      name: name.trim() || undefined,
      relationName: relationName.trim() || undefined,
      partNo: partNo.trim() || undefined,
      sex: sex.trim() || undefined,
    });
  };

  const handleReset = () => {
    setName('');
    setRelationName('');
    setPartNo('');
    setSex('');
    setShowAdvancedFilters(false);

    // Call parent reset handler to clear results
    if (onReset) {
      onReset();
    }
  };

  const hasSearchCriteria = name.trim() || relationName.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Mobile: Two column layout */}
      <div className="grid grid-cols-1 gap-3 lg:hidden">
        <TransliterateInput
          id="name"
          value={name}
          onChange={setName}
          placeholder="Type name in English..."
          label="Elector Name / வாக்காளர் பெயர்"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <TransliterateInput
          id="relation-name-mobile-primary"
          value={relationName}
          onChange={setRelationName}
          placeholder="Type relation name in English..."
          label="Relation Name / உறவினர் பெயர்"
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div>
          <label htmlFor="sex-mobile-primary" className="block text-xs font-medium mb-1.5">
            Gender / பாலினம்
          </label>
          <select
            id="sex-mobile-primary"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
      </div>

      {/* Desktop: All filters, buttons in one row */}
      <div className="hidden lg:flex lg:gap-3 lg:items-start">
        <div className="flex-1">
          <TransliterateInput
            id="name-desktop"
            value={name}
            onChange={setName}
            placeholder="Type name in English..."
            label="Elector Name / வாக்காளர் பெயர்"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1">
          <TransliterateInput
            id="relation-name-desktop"
            value={relationName}
            onChange={setRelationName}
            placeholder="Type relation name in English..."
            label="Relation Name / உறவினர் பெயர்"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex-1">
          <label htmlFor="sex-desktop" className="block text-xs font-medium mb-1.5">
            Gender / பாலினம்
          </label>
          <select
            id="sex-desktop"
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>

        <div className="flex gap-2 pt-6">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="whitespace-nowrap"
          >
            {showAdvancedFilters ? (
              <>
                <X className="h-4 w-4" />
                <span className="ml-1.5">Hide</span>
              </>
            ) : (
              <>
                <Filter className="h-4 w-4" />
                <span className="ml-1.5">More</span>
              </>
            )}
          </Button>

          <Button type="submit" disabled={isLoading || !hasSearchCriteria} size="sm" className="whitespace-nowrap">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="ml-1.5">Searching...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span className="ml-1.5">Search</span>
              </>
            )}
          </Button>

          <Button type="button" variant="outline" onClick={handleReset} size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Desktop: Advanced Filters */}
      <div className={`hidden lg:grid lg:grid-cols-1 lg:gap-3 ${showAdvancedFilters ? 'lg:grid' : 'lg:hidden'}`}>
        <div>
          <label htmlFor="part-no-desktop" className="block text-xs font-medium mb-1.5">
            Polling Station / வாக்குச் சாவடி
          </label>
          <PollingStationSelect
            id="part-no-desktop"
            value={partNo}
            onChange={setPartNo}
            constituency={constituency}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Mobile: Action Buttons */}
      <div className="flex gap-2 pt-1 lg:hidden">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
        >
          {showAdvancedFilters ? (
            <>
              <X className="h-4 w-4" />
              <span className="ml-1.5">Hide</span>
            </>
          ) : (
            <>
              <Filter className="h-4 w-4" />
              <span className="ml-1.5">More</span>
            </>
          )}
        </Button>

        <Button type="submit" disabled={isLoading || !hasSearchCriteria} size="sm">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span className="ml-2">Searching...</span>
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              <span className="ml-2">Search</span>
            </>
          )}
        </Button>

        <Button type="button" variant="outline" onClick={handleReset} size="sm">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Mobile: Advanced Filters */}
      <div className={`space-y-3 lg:hidden ${showAdvancedFilters ? 'block' : 'hidden'}`}>
        <div>
          <label htmlFor="part-no-mobile" className="block text-xs font-medium mb-1.5">
            Polling Station / வாக்குச் சாவடி
          </label>
          <PollingStationSelect
            id="part-no-mobile"
            value={partNo}
            onChange={setPartNo}
            constituency={constituency}
            disabled={isLoading}
          />
        </div>
      </div>
    </form>
  );
}

