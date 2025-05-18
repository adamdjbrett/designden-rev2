import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, ClipboardCheck, FileUp, FilePlus, BarChart, FormInput as Forms } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import { mockStudents, mockCourses } from '../../utils/mockData';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
    totalForms: 0,
    completedCertifications: 0
  });

  // Simulate data loading
  useEffect(() => {
    const loadData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, these would be fetched from an API
      setStats({
        totalStudents: mockStudents.length,
        totalCourses: mockCourses.length,
        totalForms: mockCourses.reduce((acc, course) => acc + course.forms.length, 0),
        completedCertifications: 143, // Example static number
      });
    };
    
    loadData();
  }, []);

  const quickActions = [
    { 
      title: 'Import/Export Data', 
      icon: <FileUp size={24} />, 
      description: 'Import or export student and course data',
      buttonText: 'Access Tools',
      onClick: () => navigate('/admin/import-export'),
      color: 'bg-primary-50 text-primary-700' 
    },
    { 
      title: 'Create New Entity', 
      icon: <FilePlus size={24} />, 
      description: 'Add new students, courses, or classes',
      buttonText: 'Create New',
      onClick: () => navigate('/admin/create'),
      color: 'bg-accent-50 text-accent-700' 
    },
    { 
      title: 'View Progress Reports', 
      icon: <BarChart size={24} />, 
      description: 'Check student certifications and progress',
      buttonText: 'View Reports',
      onClick: () => navigate('/admin/progress'),
      color: 'bg-success-50 text-success-700' 
    },
    { 
      title: 'Manage Forms', 
      icon: <Forms size={24} />, 
      description: 'Create and edit certification forms',
      buttonText: 'Manage Forms',
      onClick: () => navigate('/admin/forms'),
      color: 'bg-warning-50 text-warning-700' 
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage your school's courses, students, and certifications</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="bg-primary-50 border-l-4 border-primary-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-primary-600">Total Students</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalStudents}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-accent-50 border-l-4 border-accent-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-accent-100 text-accent-600 mr-4">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-accent-600">Active Courses</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalCourses}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-warning-50 border-l-4 border-warning-500">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
              <Forms size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-warning-600">Total Forms</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalForms}</p>
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
              <p className="text-2xl font-semibold text-gray-900">{stats.completedCertifications}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick actions */}
      <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:-translate-y-1 transition-transform duration-300 h-full">
            <div className={`p-3 rounded-full ${action.color} w-12 h-12 flex items-center justify-center mb-4`}>
              {action.icon}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">{action.title}</h3>
            <p className="text-gray-600 mb-6">{action.description}</p>
            <div className="mt-auto">
              <Button 
                onClick={action.onClick}
                variant={index === 0 ? 'primary' : index === 1 ? 'secondary' : index === 2 ? 'outline' : 'ghost'}
                fullWidth
              >
                {action.buttonText}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent activity */}
      <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
      <Card className="mb-8">
        <div className="flow-root">
          <ul className="-mb-8">
            {[1, 2, 3].map((item, index) => (
              <li key={index}>
                <div className="relative pb-8">
                  {index !== 2 ? (
                    <span
                      className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start space-x-3">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center ring-8 ring-white">
                        {index === 0 ? (
                          <Users size={16} className="text-gray-600" />
                        ) : index === 1 ? (
                          <BookOpen size={16} className="text-gray-600" />
                        ) : (
                          <Forms size={16} className="text-gray-600" />
                        )}
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {index === 0
                            ? 'New student registered'
                            : index === 1
                            ? 'New course created'
                            : 'Form template updated'}
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          {index === 0
                            ? 'Jane Doe (student@designden.space)'
                            : index === 1
                            ? 'Advanced Design Principles (2025 Spring)'
                            : 'Laser Cutter Safety Certification'}
                        </p>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>
                          {index === 0
                            ? 'A new student account was created and assigned to Visual Design course.'
                            : index === 1
                            ? 'New course added with 3 certification forms and 1 instructor.'
                            : 'Updated safety protocols and added new signature requirement.'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      <time dateTime="2025-09-20">
                        {index === 0 ? '2h ago' : index === 1 ? '1d ago' : '3d ago'}
                      </time>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;