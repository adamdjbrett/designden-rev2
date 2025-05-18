import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Card from '../../components/common/Card';
import { UserRole } from '../../context/AuthContext';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

const roleOptions = [
  { value: 'student', label: 'Student' },
  { value: 'staff', label: 'Staff' },
  { value: 'admin', label: 'Administrator' },
];

const RegisterPage = () => {
  const { register: registerUser, isLoading, error: authError } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    defaultValues: {
      role: 'student',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: RegisterFormInputs) => {
    setError(null);

    if (data.password !== data.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await registerUser(data.email, data.password, data.name, data.role);
      
      // Navigate based on role
      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (data.role === 'staff') {
        navigate('/staff/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-14rem)] flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-fade-in">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            log in to your existing account
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
                label="Full name"
                type="text"
                autoComplete="name"
                icon={<User size={18} />}
                error={errors.name?.message}
                fullWidth
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  },
                })}
              />
            </div>

            <div>
              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                helpText="Must use a designden.space email address"
                icon={<Mail size={18} />}
                error={errors.email?.message}
                fullWidth
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@designden\.space$/i,
                    message: 'Must use a designden.space email address',
                  },
                })}
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                autoComplete="new-password"
                icon={<Lock size={18} />}
                error={errors.password?.message}
                fullWidth
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
              />
            </div>

            <div>
              <Input
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                icon={<Lock size={18} />}
                error={errors.confirmPassword?.message}
                fullWidth
                {...register('confirmPassword', {
                  required: 'Confirm your password',
                  validate: value => value === password || 'Passwords do not match',
                })}
              />
            </div>

            <div>
              <Select
                label="Account type"
                options={roleOptions}
                error={errors.role?.message}
                fullWidth
                {...register('role', {
                  required: 'Please select an account type',
                })}
              />
            </div>

            <div>
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isLoading}
                icon={<UserPlus size={18} />}
              >
                Create Account
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;