'use client';

import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-800 text-gray-300 py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-3 text-center text-xs lg:text-sm">
          {/* Purpose Statement */}
          <div className="text-sm lg:text-base font-medium">
            தூத்துக்குடி சட்டமன்ற தொகுதி 210-ன் தேர்தாளர் பட்டியல் தேடல் அமைப்பு / Electoral Roll Search System for Thoothukudi Assembly Constituency 210
          </div>

          {/* Divider */}
          <div className="w-full border-t border-gray-600"></div>

          {/* Copyright and Last Updated */}
          <div className="flex flex-col gap-1">
            <p>
              © {new Date().getFullYear()} Public (Elections) Department, Tamil Nadu. All rights reserved.
            </p>
            <p>
              Last Updated: {new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full p-3 shadow-lg transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
}
