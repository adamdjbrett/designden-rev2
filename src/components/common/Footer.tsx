import React from 'react';
import { Palette } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex items-center">
            <Palette className="h-6 w-6 text-primary-600" />
            <span className="ml-2 text-lg font-semibold text-gray-900">Design Den</span>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-center md:text-right text-sm text-gray-500">
              &copy; {new Date().getFullYear()} The Design Den. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;