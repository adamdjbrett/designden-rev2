import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, CheckCircle, XCircle, HelpCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import { mockCourses, mockStudents } from '../../utils/mockData';

// Helper function to generate random progress data
const generateRandomProgress = (courseCount: number, formCount: number) => {
  const progress = [];
  for (let i = 0; i < courseCount; i++) {
    const forms = [];
    for (let j = 0; j < formCount; j++) {
      const random = Math.random();
      let status;
      if (random < 0.6) status = 'completed';
      else if (random < 0.8) status = 'failed';
      else status = 'pending';
      
      forms.push({
        id: `form-${i}-${j}`,
        name: `Form ${j + 1}`,
        status
      });
    }
    
    progress.push({
      id: `course-${i}`,
      name: mockCourses[i % mockCourses.length].name,
      forms
    });
  }
  
  return progress;
};

const ProgressOverviewPage = () => {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedTerm, setSelectedTerm] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [studentProgress, setStudentProgress] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate API data loading
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate dummy progress data for students
      const progressData = mockStudents.map(student => {
        const courseProgress = generateRandomProgress(3, 4);  
        return {
          ...student,
          courses: courseProgress
        };
      });
      
      setStudentProgress(progressData);
      setFilteredStudents(progressData);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  // Apply filters when filter values change
  useEffect(() => {
    if (studentProgress.length === 0) return;
    
    setIsLoading(true);
    
    // Simulate filter processing delay
    const timeoutId = setTimeout(() => {
      let filtered = [...studentProgress];
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(student => 
          student.name.toLowerCase().includes(query) || 
          student.email.toLowerCase().includes(query) || 
          student.studentId.toLowerCase().includes(query)
        );
      }
      
      // Additional course/term filtering would be implemented here in a real app
      // This is just a mock visualization
      
      setFilteredStudents(filtered);
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedYear, selectedTerm, selectedCourse, studentProgress]);

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Progress Overview</h1>
        <p className="text-gray-600 mt-1">Track certification progress across all students and courses</p>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <Input
              placeholder="Search by name, email, or ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
              fullWidth
            />
          </div>
          
          <Select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            options={[
              { value: 'All', label: 'All Years' },
              { value: '2024', label: '2024' },
              { value: '2025', label: '2025' },
              { value: '2026', label: '2026' }
            ]}
            fullWidth
          />
          
          <Select
            value={selectedTerm}
            onChange={e => setSelectedTerm(e.target.value)}
            options={[
              { value: 'All', label: 'All Terms' },
              { value: 'Spring', label: 'Spring' },
              { value: 'Summer', label: 'Summer' },
              { value: 'Fall', label: 'Fall' },
              { value: 'Winter', label: 'Winter' }
            ]}
            fullWidth
          />
          
          <Select
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            options={[
              { value: 'All', label: 'All Courses' },
              ...mockCourses.map(course => ({ value: course.id, label: course.name }))
            ]}
            fullWidth
          />
        </div>
      </Card>

      {/* Progress table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 bg-white">
                    Student
                  </th>
                  
                  {/* Generate column headers for each form */}
                  {filteredStudents[0]?.courses[0]?.forms.map((form: any, formIndex: number) => (
                    <th 
                      key={formIndex}
                      scope="col" 
                      className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                      title={`Form ${formIndex + 1}`}
                    >
                      F{formIndex + 1}
                    </th>
                  ))}
                  
                  <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Overall
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student, studentIndex) => (
                  <tr key={student.id} className={studentIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-inherit">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={student.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}`}
                            alt={student.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {student.studentId}
                          </div>
                        </div>
                      </div>
                    </td>
                    
                    {/* Course progress cells */}
                    {student.courses[0].forms.map((form: any, formIndex: number) => (
                      <td key={`${student.id}-${formIndex}`} className="px-3 py-4 whitespace-nowrap text-center">
                        <div className="flex justify-center">
                          {form.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-success-500" />
                          ) : form.status === 'failed' ? (
                            <XCircle className="h-5 w-5 text-error-500" />
                          ) : (
                            <HelpCircle className="h-5 w-5 text-gray-400" />
                          )}
                        </div>
                      </td>
                    ))}
                    
                    {/* Overall progress cell */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2.5 mr-2">
                          <div 
                            className="bg-primary-600 h-2.5 rounded-full" 
                            style={{ width: `${
                              (student.courses[0].forms.filter((f: any) => f.status === 'completed').length / 
                              student.courses[0].forms.length) * 100
                            }%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">
                          {Math.round((student.courses[0].forms.filter((f: any) => f.status === 'completed').length / 
                          student.courses[0].forms.length) * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredStudents.length === 0 && (
                  <tr>
                    <td 
                      colSpan={filteredStudents[0]?.courses[0]?.forms.length + 2 || 6} 
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex flex-col items-center">
                        <AlertTriangle className="h-8 w-8 text-warning-400 mb-2" />
                        <p>No students found matching your filters.</p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-4"
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedYear('2025');
                            setSelectedTerm('All');
                            setSelectedCourse('All');
                          }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 px-6 py-2 border-t border-gray-200">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-success-500 mr-1" />
                <span>Completed</span>
              </div>
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-error-500 mr-1" />
                <span>Failed</span>
              </div>
              <div className="flex items-center">
                <HelpCircle className="h-4 w-4 text-gray-400 mr-1" />
                <span>Not Started</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Export options */}
      <div className="mt-6 flex justify-end">
        <div className="space-x-3">
          <Button variant="outline">
            Export CSV
          </Button>
          <Button variant="outline">
            Print Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverviewPage;