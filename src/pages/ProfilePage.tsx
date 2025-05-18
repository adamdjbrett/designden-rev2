import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Car as IdCard } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';

interface ProfileFormInputs {
  name: string;
  email: string;
  studentId?: string;
  avatarUrl?: string;
}

const ProfilePage = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfileFormInputs>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      studentId: user?.studentId || '',
      avatarUrl: user?.avatarUrl || ''
    }
  });

  const onSubmit = async (data: ProfileFormInputs) => {
    setIsSaving(true);
    setSuccessMessage(null);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, this would update the user's profile through an API
      console.log('Profile update data:', data);
      
      setIsSaving(false);
      setIsEditing(false);
      setSuccessMessage('Profile updated successfully');
      
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
  };

  return (
    <div className="container mx-auto max-w-3xl animate-fade-in">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Profile</h1>

      <Card className="mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
            <div className="relative">
              <img
                src={user?.avatarUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || '')}
                alt={user?.name}
                className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
              />
              {isEditing && (
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-2 shadow-md hover:bg-primary-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
            <p className="text-gray-600 mb-1">{user?.email}</p>
            <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 capitalize">
              {user?.role}
            </div>
            {user?.studentId && (
              <p className="text-sm text-gray-500 mt-2 flex items-center justify-center sm:justify-start">
                <IdCard size={16} className="mr-1" />
                Student ID: {user.studentId}
              </p>
            )}
          </div>
        </div>

        {!isEditing ? (
          <div className="flex justify-end">
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
            >
              Edit Profile
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            {successMessage && (
              <div className="bg-success-50 border border-success-200 text-success-800 px-4 py-3 rounded mb-4">
                {successMessage}
              </div>
            )}
            
            <div className="space-y-4 mb-6">
              <Input
                label="Full name"
                icon={<User size={18} />}
                error={errors.name?.message}
                fullWidth
                {...register('name', {
                  required: 'Name is required',
                  minLength: {
                    value: 2,
                    message: 'Name must be at least 2 characters',
                  }
                })}
              />
              
              <Input
                label="Email address"
                type="email"
                icon={<Mail size={18} />}
                disabled
                fullWidth
                {...register('email')}
              />
              
              {user?.role === 'student' && (
                <Input
                  label="Student ID"
                  icon={<IdCard size={18} />}
                  disabled
                  fullWidth
                  {...register('studentId')}
                />
              )}
              
              <Input
                label="Avatar URL"
                placeholder="https://example.com/avatar.jpg"
                fullWidth
                {...register('avatarUrl')}
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="ghost"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                isLoading={isSaving}
              >
                Save Changes
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
};

export default ProfilePage;