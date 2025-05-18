import { Outlet } from 'react-router-dom';
import { Palette } from 'lucide-react';
import Footer from '../components/common/Footer';

const BaseLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Palette className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-2xl font-semibold text-gray-900">Parish STEM Design Den</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default BaseLayout;