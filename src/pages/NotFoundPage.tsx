import { Link, useLocation } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import Button from '../components/common/Button';

const NotFoundPage = () => {
  const location = useLocation();
  const isUnauthorized = location.pathname === '/unauthorized';

  return (
    <div className="min-h-[calc(100vh-14rem)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="text-center">
        <div className="inline-flex items-center justify-center bg-warning-100 rounded-full p-3">
          <AlertTriangle className="h-10 w-10 text-warning-600" />
        </div>
        
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          {isUnauthorized ? 'Access Denied' : 'Page not found'}
        </h1>
        
        <p className="mt-3 max-w-md mx-auto text-base text-gray-600">
          {isUnauthorized 
            ? 'You don\'t have permission to access this page.'
            : 'Sorry, we couldn\'t find the page you\'re looking for.'}
        </p>
        
        <div className="mt-10">
          <Link to="/">
            <Button>
              Go back home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;