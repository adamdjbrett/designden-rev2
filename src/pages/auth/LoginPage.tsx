import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { LogIn, Mail, Lock } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { login, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  const from = location.state?.from?.pathname || '/';

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    setError(null);
    
    try {
      await login(data.email, data.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Log in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="animate-slide-in">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {(error || authError) && (
              <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">{error || authError}</span>
              </div>
            )}

            <div>
              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                icon={<Mail size={18} />}
                error={errors.email?.message}
                fullWidth
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                autoComplete="current-password"
                icon={<Lock size={18} />}
                error={errors.password?.message}
                fullWidth
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  }
                })}
              />
            </div>

            <div>
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isLoading}
                icon={<LogIn size={18} />}
              >
                Log in
              </Button>
            </div>

            {/* Demo accounts for testing */}
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2">Demo Accounts:</p>
              <div className="grid grid-cols-1 gap-2">
                <button
                  type="button"
                  className="text-xs py-1 px-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    // Pre-fill form for admin
                    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
                    const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
                    if (emailInput) emailInput.value = 'admin@designden.space';
                    if (passwordInput) passwordInput.value = 'password';
                  }}
                >
                  Admin: admin@designden.space / password
                </button>
                <button
                  type="button"
                  className="text-xs py-1 px-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    // Pre-fill form for staff
                    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
                    const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
                    if (emailInput) emailInput.value = 'staff@designden.space';
                    if (passwordInput) passwordInput.value = 'password';
                  }}
                >
                  Staff: staff@designden.space / password
                </button>
                <button
                  type="button"
                  className="text-xs py-1 px-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    // Pre-fill form for student
                    const emailInput = document.querySelector('input[name="email"]') as HTMLInputElement;
                    const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
                    if (emailInput) emailInput.value = 'student@designden.space';
                    if (passwordInput) passwordInput.value = 'password';
                  }}
                >
                  Student: student@designden.space / password
                </button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;