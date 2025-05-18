import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Users, Calendar, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusIndicator from '../../components/common/StatusIndicator';
import { mockStudentCourses } from '../../utils/mockData';
import type { StatusType } from '../../components/common/StatusIndicator';

const CoursePage = () => {
  const { id } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // In a real app, this would be fetched from an API
      const course = mockStudentCourses.find(c => c.id === id);
      setCourseData(course || null);
      setIsLoading(false);
    };

    fetchCourse();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!courseData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
        <p className="text-gray-600 mt-2">The course you're looking for doesn't exist or you don't have access to it.</p>
        <Link to="/student/dashboard" className="mt-4 inline-block">
          <Button variant="outline">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const completedForms = courseData.forms.filter((form: any) => form.status === 'completed');
  const completionPercentage = Math.round((completedForms.length / courseData.forms.length) * 100);

  return (
    <div className="animate-fade-in">
      {/* Course header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold text-gray-900">{courseData.name}</h1>
            <p className="text-gray-600 mt-1">{courseData.description}</p>
            
            <div className="flex flex-wrap mt-3 gap-4">
              <div className="flex items-center text-gray-600">
                <Calendar size={16} className="mr-1" />
                <span className="text-sm">{courseData.year} {courseData.term}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users size={16} className="mr-1" />
                <span className="text-sm">{courseData.enrolledStudents.length} Students</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpen size={16} className="mr-1" />
                <span className="text-sm">{courseData.forms.length} Certification Forms</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-600">Course Progress</p>
              <div className="flex items-center justify-center mt-1">
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20" viewBox="0 0 100 100">
                    {/* Background circle */}
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="#E5E7EB"
                      strokeWidth="10"
                    />
                    {/* Progress circle */}
                    {completionPercentage > 0 && (
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={completionPercentage === 100 ? "#10B981" : "#3B82F6"}
                        strokeWidth="10"
                        strokeDasharray={`${(Math.PI * 90 * completionPercentage) / 100} ${
                          Math.PI * 90 * (1 - completionPercentage / 100)
                        }`}
                        strokeDashoffset={(Math.PI * 90) / 4}
                        strokeLinecap="round"
                      />
                    )}
                  </svg>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-800">{completionPercentage}%</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {completedForms.length} of {courseData.forms.length} completed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Certification forms */}
      <h2 className="text-lg font-medium text-gray-900 mb-4">Certification Forms</h2>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
        <ul className="divide-y divide-gray-200">
          {courseData.forms.map((form: any) => (
            <li key={form.id} className="p-4 sm:p-6 hover:bg-gray-50">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start mb-4 sm:mb-0">
                  {form.status === 'completed' ? (
                    <CheckCircle className="h-6 w-6 text-success-500 flex-shrink-0" />
                  ) : form.status === 'failed' ? (
                    <XCircle className="h-6 w-6 text-error-500 flex-shrink-0" />
                  ) : (
                    <HelpCircle className="h-6 w-6 text-gray-400 flex-shrink-0" />
                  )}
                  <div className="ml-3">
                    <h3 className="text-base font-medium text-gray-900">{form.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{form.description}</p>
                    
                    {form.lastAttempt && (
                      <p className="mt-1 text-xs text-gray-500">
                        Last attempt: {new Date(form.lastAttempt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <StatusBadge status={form.status as StatusType} />
                  <Link to={`/student/courses/${courseData.id}/forms/${form.id}`}>
                    <Button 
                      size="sm" 
                      variant={form.status === 'completed' ? 'outline' : 'primary'}
                    >
                      {form.status === 'completed' ? 'Review' : 'Start Certification'}
                    </Button>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Helper components
const StatusBadge = ({ status }: { status: StatusType }) => {
  const colorClasses = {
    completed: 'bg-success-100 text-success-800',
    failed: 'bg-error-100 text-error-800',
    pending: 'bg-gray-100 text-gray-800'
  };

  const statusText = {
    completed: 'Completed',
    failed: 'Failed',
    pending: 'Not Started'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[status]}`}>
      {statusText[status]}
    </span>
  );
};

export default CoursePage;