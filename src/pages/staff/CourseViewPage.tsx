import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Download, 
  Mail,
  CheckCircle, 
  XCircle, 
  HelpCircle, 
  Search
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { mockCourses } from '../../utils/mockData';

const CourseViewPage = () => {
  const { id } = useParams<{ id: string }>();
  const [courseData, setCourseData] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'students' | 'forms'>('students');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate API data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, these would be fetched from an API
      const course = mockCourses.find(c => c.id === id);
      
      if (course) {
        // Generate mock student data for this course
        const mockStudentData = Array.from({ length: 25 }, (_, index) => {
          // Generate random form completion statuses for each student
          const formStatuses = course.forms.map((form: any) => {
            const random = Math.random();
            let status;
            if (random < 0.6) status = 'completed';
            else if (random < 0.8) status = 'failed';
            else status = 'pending';
            
            return {
              id: form.id,
              name: form.name,
              status,
              completedDate: status === 'completed' ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : null
            };
          });
          
          return {
            id: `student-${index + 1}`,
            name: `Student ${index + 1}`,
            email: `student${index + 1}@designden.space`,
            studentId: `S${10000 + index}`,
            avatarUrl: `https://i.pravatar.cc/150?u=student${index + 1}`,
            enrollmentDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
            forms: formStatuses
          };
        });
        
        setCourseData(course);
        setStudents(mockStudentData);
      }
      
      setIsLoading(false);
    };
    
    loadData();
  }, [id]);

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Link to="/staff/dashboard" className="mt-4 inline-block">
          <Button variant="outline">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Course header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">{courseData.name}</h1>
        <p className="text-gray-600 mt-1">
          {courseData.year} {courseData.term} · {courseData.enrolledStudents.length} students enrolled
        </p>
        
        <div className="mt-6 flex flex-wrap gap-3">
          <Button 
            variant="outline" 
            size="sm"
            icon={<Mail size={16} />}
          >
            Email All Students
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            icon={<Download size={16} />}
          >
            Export Progress Report
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('students')}
              className={`
                w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
                ${activeTab === 'students'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <Users className="w-5 h-5 inline mr-2" />
              Students
            </button>
            <button
              onClick={() => setActiveTab('forms')}
              className={`
                w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
                ${activeTab === 'forms'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <FileText className="w-5 h-5 inline mr-2" />
              Certification Forms
            </button>
          </nav>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'students' ? (
        <div>
          {/* Search and filters */}
          <div className="mb-6">
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
              fullWidth
            />
          </div>

          {/* Students table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enrollment Date
                    </th>
                    
                    {courseData.forms.map((form: any, formIndex: number) => (
                      <th 
                        key={form.id}
                        scope="col" 
                        className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <div title={form.name}>F{formIndex + 1}</div>
                      </th>
                    ))}
                    
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student: any) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={student.avatarUrl} alt={student.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.name}</div>
                            <div className="text-sm text-gray-500">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {student.studentId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(student.enrollmentDate).toLocaleDateString()}
                      </td>
                      
                      {student.forms.map((form: any) => (
                        <td key={form.id} className="px-3 py-4 whitespace-nowrap text-center">
                          <div className="flex justify-center">
                            {form.status === 'completed' ? (
                              <CheckCircle className="h-5 w-5 text-success-500" title={`Completed on ${new Date(form.completedDate).toLocaleDateString()}`} />
                            ) : form.status === 'failed' ? (
                              <XCircle className="h-5 w-5 text-error-500" title="Failed" />
                            ) : (
                              <HelpCircle className="h-5 w-5 text-gray-400" title="Not started" />
                            )}
                          </div>
                        </td>
                      ))}
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className="bg-primary-600 h-2.5 rounded-full" 
                              style={{ width: `${
                                (student.forms.filter((f: any) => f.status === 'completed').length / 
                                student.forms.length) * 100
                              }%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">
                            {Math.round((student.forms.filter((f: any) => f.status === 'completed').length / 
                            student.forms.length) * 100)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan={5 + courseData.forms.length} className="px-6 py-10 text-center text-gray-500">
                        No students found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseData.forms.map((form: any, index: number) => (
            <Card key={form.id}>
              <h3 className="text-lg font-medium text-gray-900">{form.name}</h3>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-primary-50 rounded-lg p-4">
                  <span className="text-sm font-medium text-primary-700">Completion Rate</span>
                  <div className="mt-2 flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${60 + index * 5}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {60 + index * 5}%
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <span className="text-sm font-medium text-gray-700">Student Status</span>
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center">
                      <div className="text-success-500">
                        <CheckCircle size={18} />
                      </div>
                      <span className="text-xs mt-1">{15 - index * 2}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-error-500">
                        <XCircle size={18} />
                      </div>
                      <span className="text-xs mt-1">{2 + index}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-gray-400">
                        <HelpCircle size={18} />
                      </div>
                      <span className="text-xs mt-1">{8 - index}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  icon={<Eye size={16} />}
                >
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  icon={<Download size={16} />}
                >
                  Export Results
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseViewPage;