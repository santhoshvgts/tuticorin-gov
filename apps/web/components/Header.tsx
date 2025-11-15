'use client';

import { Phone, Mail } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="text-center">
          <h1 className="text-base lg:text-xl font-bold text-blue-900 leading-tight">
            Special Intensive Revision
          </h1>
          <p className="text-sm lg:text-lg font-semibold text-gray-700 mt-0.5 lg:mt-1">
            2002 Data Thoothukudi District
          </p>
        </div>
      </div>
    </header>
  );
}
