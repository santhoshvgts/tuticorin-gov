'use client';

import Image from 'next/image';
import { Phone, Mail } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex items-center gap-3 lg:gap-5">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/tnsec-logo.png"
              alt="Tamil Nadu State Election Commission"
              width={60}
              height={60}
              className="w-12 h-12 lg:w-16 lg:h-16"
              priority
            />
          </div>

          {/* Title */}
          <div className="flex-1">
            <h1 className="text-base lg:text-xl font-bold text-blue-900 leading-tight">
              தமிழ்நாடு மாநில தேர்தல் ஆணையம்
            </h1>
            <p className="text-sm lg:text-lg font-semibold text-gray-700 mt-0.5 lg:mt-1">
              Tamil Nadu State Election Commission
            </p>
          </div>

          {/* Contact Info - Desktop */}
          <div className="hidden lg:flex flex-col gap-2 text-sm">
            <a
              href="tel:044-23635010"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-900 transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>044-23635010</span>
            </a>
            <a
              href="mailto:tnsec.tn@nic.in"
              className="flex items-center gap-2 text-gray-700 hover:text-blue-900 transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span>tnsec.tn@nic.in</span>
            </a>
          </div>

          {/* Contact Info - Mobile */}
          <div className="flex lg:hidden flex-col gap-1 text-xs">
            <a
              href="tel:044-23635010"
              className="flex items-center gap-1 text-gray-700 hover:text-blue-900 transition-colors"
            >
              <Phone className="h-3 w-3" />
              <span>044-23635010</span>
            </a>
            <a
              href="mailto:tnsec.tn@nic.in"
              className="flex items-center gap-1 text-gray-700 hover:text-blue-900 transition-colors"
            >
              <Mail className="h-3 w-3" />
              <span>tnsec.tn@nic.in</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
