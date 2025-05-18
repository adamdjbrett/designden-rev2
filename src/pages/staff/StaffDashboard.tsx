import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ClipboardCheck } from 'lucide-react';
import Card from '../../components/common/Card';
import StatusIndicator from '../../components/common/StatusIndicator';
import { mockCourses, mockStudents } from '../../utils/mockData';

const StaffDashboard = () => {
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real application, we would fetch this data from an API
      setAssignedCourses(mockCourses);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
        <p className="text-gray-600 mt-1">View courses and student certifications</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-primary-50 border-l-4 border-primary-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-600">Courses</p>
              <p className="text-2xl font-semibold text-gray-900">{mockCourses.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-accent-50 border-l-4 border-accent-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-accent-600">Students</p>
              <p className="text-2xl font-semibold text-gray-900">{mockStudents.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-success-50 border-l-4 border-success-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
              <ClipboardCheck size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-success-600">Certifications</p>
              <p className="text-2xl font-semibold text-gray-900">87</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Courses table */}
      <h2 className="text-lg font-medium text-gray-900 mb-4">Your Courses</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <div className="overflow-hidden bg-white shadow-sm rounded-lg mb-8">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Term
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Students
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Forms
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockCourses.map((course: any) => (
                  <tr key={course.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        <Link to={`/staff/courses/${course.id}`} className="text-primary-600 hover:text-primary-900">
                          {course.name}
                        </Link>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{course.year} {course.term}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.enrolledStudents.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {course.forms.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className="bg-success-500 h-2.5 rounded-full" 
                            style={{ width: `${course.completionRate}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-800">{course.completionRate}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent certifications */}
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Student Certifications</h2>
      <Card className="mb-8">
        <ul className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((item, index) => (
            <li key={index} className="py-4 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full"
                  src={`https://i.pravatar.cc/150?u=${index}`}
                  alt=""
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {['Alex Johnson', 'Maria Garcia', 'Sam Taylor', 'Jamie Lee', 'Corey Smith'][index]}
                  </p>
                  <p className="text-sm text-gray-500">
                    {['Laser Cutter Safety', '3D Printing Basics', 'CNC Router Operation', 'Vinyl Cutter Certification', 'Design Software Basics'][index]}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <StatusIndicator status="completed" text={true} />
                <span className="ml-4 text-sm text-gray-500">
                  {['1h ago', '3h ago', '5h ago', 'Yesterday', '2 days ago'][index]}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default StaffDashboard;