import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Palette, Home, Users, FileUp, FilePlus, BarChart, FormInput as Forms, Briefcase, Book, User, LogOut, Menu, X } from 'lucide-react';
import Footer from '../components/common/Footer';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getNavLinks = () => {
    const links = [];

    if (user?.role === 'admin') {
      links.push(
        { to: '/admin/dashboard', icon: <Home size={20} />, text: 'Dashboard' },
        { to: '/admin/import-export', icon: <FileUp size={20} />, text: 'Import/Export' },
        { to: '/admin/create', icon: <FilePlus size={20} />, text: 'Create' },
        { to: '/admin/progress', icon: <BarChart size={20} />, text: 'Progress' },
        { to: '/admin/forms', icon: <Forms size={20} />, text: 'Forms' },
      );
    } else if (user?.role === 'staff') {
      links.push(
        { to: '/staff/dashboard', icon: <Home size={20} />, text: 'Dashboard' },
        { to: '/staff/courses', icon: <Briefcase size={20} />, text: 'Courses' },
      );
    } else if (user?.role === 'student') {
      links.push(
        { to: '/student/dashboard', icon: <Home size={20} />, text: 'Dashboard' },
        { to: '/student/courses', icon: <Book size={20} />, text: 'My Courses' },
      );
    }

    // Common links
    links.push(
      { to: '/profile', icon: <User size={20} />, text: 'Profile' },
    );

    return links;
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Palette className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900 hidden sm:inline-block">Parish STEM Design Den</span>
            </div>

            <div className="flex items-center">
              {user && (
                <div className="flex items-center space-x-4">
                  <div className="hidden sm:flex items-center">
                    <img
                      src={user.avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)}
                      alt={user.name}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100 transition duration-150"
                    aria-label="Log out"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              )}
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="ml-2 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none md:hidden"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 md:pt-16 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav className="mt-5 px-2 space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className={`group flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    location.pathname === link.to
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className={`mr-3 ${
                    location.pathname === link.to ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-600'
                  }`}>
                    {link.icon}
                  </div>
                  {link.text}
                </Link>
              ))}
              
              <button
                onClick={handleLogout}
                className="w-full group flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
              >
                <div className="mr-3 text-gray-500 group-hover:text-gray-600">
                  <LogOut size={20} />
                </div>
                Log out
              </button>
            </nav>
          </div>
        </aside>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <Palette className="h-8 w-8 text-primary-600" />
                  <span className="ml-2 text-2xl font-bold text-gray-900">Parish STEM Design Den</span>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {navLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.to}
                      className={`group flex items-center px-4 py-2 text-base font-medium rounded-md ${
                        location.pathname === link.to
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className={`mr-4 ${
                        location.pathname === link.to ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-600'
                      }`}>
                        {link.icon}
                      </div>
                      {link.text}
                    </Link>
                  ))}
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full group flex items-center px-4 py-2 text-base font-medium rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    <div className="mr-4 text-gray-500 group-hover:text-gray-600">
                      <LogOut size={20} />
                    </div>
                    Log out
                  </button>
                </nav>
              </div>
              
              {user && (
                <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                  <div className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-10 w-10 rounded-full"
                          src={user.avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name)}
                          alt={user.name}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">{user.name}</p>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700 capitalize">{user.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 md:ml-64 pt-4 pb-10 px-4 sm:px-6 lg:px-8">
          <div className="animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
      
      {/* Footer for mobile */}
      <div className="md:hidden border-t border-gray-200">
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;