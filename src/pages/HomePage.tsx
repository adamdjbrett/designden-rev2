import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Palette, ChevronRight, Zap, Shield, Award } from 'lucide-react';
import Button from '../components/common/Button';

const HomePage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // Redirect based on user role
      if (user?.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user?.role === 'staff') {
        navigate('/staff/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } else {
      navigate('/register');
    }
  };

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary-600" />,
      title: 'Streamlined Learning',
      description: 'Intuitive platform designed to help students master skills quickly and effectively.'
    },
    {
      icon: <Shield className="h-6 w-6 text-accent-500" />,
      title: 'Certification Tracking',
      description: 'Automatically track and manage tool certifications for all enrolled students.'
    },
    {
      icon: <Award className="h-6 w-6 text-success-500" />,
      title: 'Comprehensive Progress Monitoring',
      description: 'Visually track student progress with clear indicators for course completion.'
    },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181355/pexels-photo-1181355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750')] mix-blend-overlay opacity-10 bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="flex items-center mb-6 animate-pulse-soft">
            <Palette className="h-12 w-12" />
            <h1 className="ml-3 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              The Design Den
            </h1>
          </div>
          <p className="mt-3 max-w-md mx-auto text-lg text-white text-opacity-90 sm:text-xl md:mt-5 md:max-w-3xl">
            Empowering students with the skills and certifications they need to succeed in design and beyond.
          </p>
          <div className="mt-10 max-w-md sm:flex sm:justify-center md:mt-12">
            <div className="rounded-md shadow">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="w-full flex items-center justify-center bg-white text-primary-700 hover:bg-gray-50 border-2 border-white"
                icon={<ChevronRight size={20} />}
                iconPosition="right"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
              </Button>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              {!isAuthenticated && (
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  size="lg"
                  className="w-full flex items-center justify-center bg-transparent text-white hover:bg-primary-700/30 border-2 border-white"
                >
                  Log In
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Everything you need in one place
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Our platform is designed to make learning, certification, and progress tracking seamless.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full transition-transform duration-300 hover:-translate-y-1">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-white rounded-md shadow-lg">
                          {feature.icon}
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                      <p className="mt-5 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-primary-600">Join The Design Den today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="w-full"
                icon={<ChevronRight size={20} />}
                iconPosition="right"
              >
                {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
              </Button>
            </div>
            {!isAuthenticated && (
              <div className="ml-3 inline-flex rounded-md shadow">
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  size="lg"
                >
                  Log In
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;