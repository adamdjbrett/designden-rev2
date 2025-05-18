import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Award, Clock, ChevronRight } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import StatusIndicator from '../../components/common/StatusIndicator';
import { useAuth } from '../../context/AuthContext';
import { mockStudentCourses } from '../../utils/mockData';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [recentForms, setRecentForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 700));

      // In a real app, this would be fetched from an API
      setEnrolledCourses(mockStudentCourses);
      
      // Generate recent forms from the enrolled courses
      const forms = mockStudentCourses.flatMap((course: any) => 
        course.forms.map((form: any) => ({
          ...form,
          courseName: course.name,
          courseId: course.id
        }))
      );
      
      // Sort by the most recently attempted and take the 5 most recent
      const sortedForms = forms.sort((a: any, b: any) => 
        new Date(b.lastAttempt).getTime() - new Date(a.lastAttempt).getTime()
      ).slice(0, 5);
      
      setRecentForms(sortedForms);
      setIsLoading(false);
    };

    loadData();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {user?.name}! View your courses and certification progress.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-primary-50 border-l-4 border-primary-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-600">Enrolled Courses</p>
              <p className="text-2xl font-semibold text-gray-900">{isLoading ? '...' : enrolledCourses.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-success-50 border-l-4 border-success-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
              <Award size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-success-600">Certifications</p>
              <p className="text-2xl font-semibold text-gray-900">
                {isLoading ? '...' : recentForms.filter((form: any) => form.status === 'completed').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-warning-50 border-l-4 border-warning-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-warning-600">Pending</p>
              <p className="text-2xl font-semibold text-gray-900">
                {isLoading ? '...' : recentForms.filter((form: any) => form.status === 'pending').length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Enrolled Courses */}
      <h2 className="text-lg font-medium text-gray-900 mb-4">Your Courses</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {enrolledCourses.map((course: any) => (
            <Card 
              key={course.id} 
              className="hover:shadow-card-hover transition-shadow duration-300 h-full flex flex-col"
            >
              <div className="border-b pb-4 mb-4">
                <h3 className="text-lg font-medium text-gray-900">{course.name}</h3>
                <p className="text-sm text-gray-500">{course.year} {course.term}</p>
              </div>
              
              <div className="mb-4 flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round(course.forms.filter((f: any) => f.status === 'completed').length / course.forms.length * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${Math.round(course.forms.filter((f: any) => f.status === 'completed').length / course.forms.length * 100)}%` }}
                  ></div>
                </div>
                
                <div className="mt-4">
                  <span className="text-sm font-medium text-gray-700">Certifications</span>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {course.forms.slice(0, 4).map((form: any, formIndex: number) => (
                      <div key={formIndex} className="flex items-center">
                        <StatusIndicator status={form.status} size="sm" />
                        <span className="ml-2 text-sm text-gray-700 truncate">{form.name}</span>
                      </div>
                    ))}
                    {course.forms.length > 4 && (
                      <div className="text-sm text-gray-500 pl-6">
                        +{course.forms.length - 4} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-auto">
                <Link to={`/student/courses/${course.id}`}>
                  <Button
                    fullWidth
                    variant="outline"
                    icon={<ChevronRight size={16} />}
                    iconPosition="right"
                  >
                    View Course
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Recent forms */}
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Certifications</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <Card>
          <ul className="divide-y divide-gray-200">
            {recentForms.map((form: any, index: number) => (
              <li key={index} className="py-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center">
                    <StatusIndicator status={form.status} />
                    <h3 className="ml-2 text-sm font-medium text-gray-900">{form.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{form.courseName}</p>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-gray-500 mr-4">
                    {new Date(form.lastAttempt).toLocaleDateString()}
                  </span>
                  <Link to={`/student/courses/${form.courseId}/forms/${form.id}`}>
                    <Button size="sm" variant="outline">
                      {form.status === 'completed' ? 'View' : 'Continue'}
                    </Button>
                  </Link>
                </div>
              </li>
            ))}
            {recentForms.length === 0 && (
              <li className="py-8 text-center">
                <p className="text-gray-500">No recent activity found.</p>
              </li>
            )}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default StudentDashboard;