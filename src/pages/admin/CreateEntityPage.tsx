import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  Users, 
  BookOpen, 
  UserPlus, 
  BookPlus, 
  CheckCircle 
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';

type EntityType = 'student' | 'class' | 'student-with-class';

const CreateEntityPage = () => {
  const [entityType, setEntityType] = useState<EntityType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const renderEntityForm = () => {
    switch (entityType) {
      case 'student':
        return <CreateStudentForm onSuccess={() => setIsSuccess(true)} />;
      case 'class':
        return <CreateClassForm onSuccess={() => setIsSuccess(true)} />;
      case 'student-with-class':
        return <CreateStudentWithClassForm onSuccess={() => setIsSuccess(true)} />;
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New Entity</h1>
        <p className="text-gray-600 mt-1">Add new students or classes to the system</p>
      </div>

      {isSuccess ? (
        <Card className="text-center py-8 animate-fade-in">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-success-100">
            <CheckCircle className="h-6 w-6 text-success-600" />
          </div>
          <h3 className="mt-3 text-lg font-medium text-gray-900">Creation successful!</h3>
          <p className="mt-2 text-sm text-gray-500">
            The new entity has been successfully created in the system.
          </p>
          <div className="mt-6 flex justify-center space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                setEntityType(null);
                setIsSuccess(false);
              }}
            >
              Create Another
            </Button>
            <Button onClick={() => navigate('/admin/dashboard')}>
              Return to Dashboard
            </Button>
          </div>
        </Card>
      ) : entityType ? (
        <>
          <div className="flex items-center mb-6">
            <button
              onClick={() => setEntityType(null)}
              className="text-gray-500 hover:text-gray-700 mr-4"
            >
              &larr; Back
            </button>
            <h2 className="text-lg font-medium text-gray-900">
              {entityType === 'student' 
                ? 'Create New Student' 
                : entityType === 'class' 
                  ? 'Create New Class' 
                  : 'Add Student to Class'}
            </h2>
          </div>
          
          {renderEntityForm()}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="hover:shadow-card-hover cursor-pointer transition-all duration-200 transform hover:-translate-y-1"
            onClick={() => setEntityType('student')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mb-4">
                <UserPlus size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Create Student
              </h3>
              <p className="text-gray-500 text-sm">
                Add a new student to the system with basic profile information
              </p>
            </div>
          </Card>

          <Card 
            className="hover:shadow-card-hover cursor-pointer transition-all duration-200 transform hover:-translate-y-1"
            onClick={() => setEntityType('class')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-accent-100 text-accent-600 mb-4">
                <BookPlus size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Create Class
              </h3>
              <p className="text-gray-500 text-sm">
                Create a new class with details about year, term, and description
              </p>
            </div>
          </Card>

          <Card 
            className="hover:shadow-card-hover cursor-pointer transition-all duration-200 transform hover:-translate-y-1"
            onClick={() => setEntityType('student-with-class')}
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mb-4">
                <Users size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Add Student to Class
              </h3>
              <p className="text-gray-500 text-sm">
                Enroll an existing student in a class or create a new student and enroll them
              </p>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

// Form Components
interface FormProps {
  onSuccess: () => void;
}

const CreateStudentForm = ({ onSuccess }: FormProps) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Student data submitted:', data);
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            fullWidth
            error={errors.name?.message?.toString()}
            {...register('name', { required: 'Name is required' })}
          />

          <Input
            label="Email Address"
            type="email"
            fullWidth
            helpText="Must be a designden.space domain"
            error={errors.email?.message?.toString()}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@designden\.space$/i,
                message: 'Email must use designden.space domain',
              }
            })}
          />
          
          <Input
            label="Student ID"
            fullWidth
            error={errors.studentId?.message?.toString()}
            {...register('studentId', { required: 'Student ID is required' })}
          />
          
          <Select
            label="Role"
            options={[
              { value: 'student', label: 'Student' }
            ]}
            fullWidth
            {...register('role')}
          />
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={isSubmitting}
            icon={<UserPlus size={18} />}
          >
            Create Student
          </Button>
        </div>
      </form>
    </Card>
  );
};

const CreateClassForm = ({ onSuccess }: FormProps) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 5 }, (_, i) => ({ 
    value: (currentYear + i).toString(), 
    label: (currentYear + i).toString() 
  }));

  const termOptions = [
    { value: 'Spring', label: 'Spring' },
    { value: 'Summer', label: 'Summer' },
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' }
  ];

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Class data submitted:', data);
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Course Name"
            fullWidth
            error={errors.name?.message?.toString()}
            {...register('name', { required: 'Course name is required' })}
          />
          
          <Input
            label="Course Code"
            fullWidth
            error={errors.code?.message?.toString()}
            {...register('code', { required: 'Course code is required' })}
          />
          
          <Select
            label="Year"
            options={yearOptions}
            fullWidth
            error={errors.year?.message?.toString()}
            {...register('year', { required: 'Year is required' })}
          />
          
          <Select
            label="Term"
            options={termOptions}
            fullWidth
            error={errors.term?.message?.toString()}
            {...register('term', { required: 'Term is required' })}
          />
          
          <div className="md:col-span-2">
            <Input
              label="Description"
              as="textarea"
              rows={4}
              fullWidth
              error={errors.description?.message?.toString()}
              {...register('description', { required: 'Description is required' })}
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={isSubmitting}
            icon={<BookPlus size={18} />}
          >
            Create Class
          </Button>
        </div>
      </form>
    </Card>
  );
};

const CreateStudentWithClassForm = ({ onSuccess }: FormProps) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      studentType: 'existing'
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const studentType = watch('studentType');

  // Mock data for existing students and classes
  const existingStudents = [
    { value: '1', label: 'John Doe (S12345)' },
    { value: '2', label: 'Jane Smith (S67890)' },
    { value: '3', label: 'Alex Johnson (S24680)' }
  ];
  
  const existingClasses = [
    { value: '1', label: 'Introduction to Design (2025 Spring)' },
    { value: '2', label: 'Advanced Typography (2025 Spring)' },
    { value: '3', label: 'Visual Communication (2025 Summer)' }
  ];

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Student with class data submitted:', data);
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Student Selection</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary-600"
                value="existing"
                {...register('studentType')}
              />
              <span className="ml-2 text-gray-700">Existing Student</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary-600"
                value="new"
                {...register('studentType')}
              />
              <span className="ml-2 text-gray-700">New Student</span>
            </label>
          </div>
        </div>
        
        <div className="space-y-6">
          {studentType === 'existing' ? (
            <Select
              label="Select Student"
              options={existingStudents}
              fullWidth
              error={errors.existingStudentId?.message?.toString()}
              {...register('existingStudentId', { required: 'Student selection is required' })}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                fullWidth
                error={errors.name?.message?.toString()}
                {...register('name', { 
                  required: studentType === 'new' ? 'Name is required' : false 
                })}
              />
              <Input
                label="Email Address"
                type="email"
                fullWidth
                helpText="Must be a designden.space domain"
                error={errors.email?.message?.toString()}
                {...register('email', { 
                  required: studentType === 'new' ? 'Email is required' : false,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@designden\.space$/i,
                    message: 'Email must use designden.space domain',
                  }
                })}
              />
              <Input
                label="Student ID"
                fullWidth
                error={errors.studentId?.message?.toString()}
                {...register('studentId', { 
                  required: studentType === 'new' ? 'Student ID is required' : false 
                })}
              />
            </div>
          )}
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Class Selection</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-primary-600"
                  value="existing"
                  {...register('classType')}
                  defaultChecked
                />
                <span className="ml-2 text-gray-700">Existing Class</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-primary-600"
                  value="new"
                  {...register('classType')}
                />
                <span className="ml-2 text-gray-700">New Class</span>
              </label>
            </div>
          </div>
          
          {watch('classType') === 'existing' ? (
            <Select
              label="Select Class"
              options={existingClasses}
              fullWidth
              error={errors.existingClassId?.message?.toString()}
              {...register('existingClassId', { required: 'Class selection is required' })}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Course Name"
                fullWidth
                error={errors.className?.message?.toString()}
                {...register('className', { 
                  required: watch('classType') === 'new' ? 'Course name is required' : false 
                })}
              />
              <Input
                label="Course Code"
                fullWidth
                error={errors.classCode?.message?.toString()}
                {...register('classCode', { 
                  required: watch('classType') === 'new' ? 'Course code is required' : false 
                })}
              />
              <Select
                label="Year"
                options={[
                  { value: '2025', label: '2025' },
                  { value: '2026', label: '2026' }
                ]}
                fullWidth
                error={errors.classYear?.message?.toString()}
                {...register('classYear', { 
                  required: watch('classType') === 'new' ? 'Year is required' : false 
                })}
              />
              <Select
                label="Term"
                options={[
                  { value: 'Spring', label: 'Spring' },
                  { value: 'Summer', label: 'Summer' },
                  { value: 'Fall', label: 'Fall' },
                  { value: 'Winter', label: 'Winter' }
                ]}
                fullWidth
                error={errors.classTerm?.message?.toString()}
                {...register('classTerm', { 
                  required: watch('classType') === 'new' ? 'Term is required' : false 
                })}
              />
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            isLoading={isSubmitting}
            icon={<BookOpen size={18} />}
          >
            Enroll Student
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateEntityPage;