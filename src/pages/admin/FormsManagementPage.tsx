import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FilePlus, 
  FileText, 
  Edit,
  Trash2,
  Copy,
  Eye,
  Search,
  Plus
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';

const FormsManagementPage = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  // Simulate fetching forms data
  useEffect(() => {
    const fetchData = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock forms data
      const mockForms = [
        {
          id: '1',
          title: 'Laser Cutter Safety Certification',
          description: 'Safety protocols and operational guidelines for laser cutters',
          lastUpdated: '2025-03-01T12:00:00Z',
          questionsCount: 12,
          type: 'safety',
          usedInCourses: 3
        },
        {
          id: '2',
          title: '3D Printer Operation Guide',
          description: 'Proper usage of 3D printers including setup, printing, and maintenance',
          lastUpdated: '2025-02-15T09:30:00Z',
          questionsCount: 15,
          type: 'equipment',
          usedInCourses: 2
        },
        {
          id: '3',
          title: 'CNC Router Safety Assessment',
          description: 'Comprehensive assessment of CNC router safety protocols',
          lastUpdated: '2025-02-10T14:45:00Z',
          questionsCount: 18,
          type: 'safety',
          usedInCourses: 1
        },
        {
          id: '4',
          title: 'Design Software Proficiency Check',
          description: 'Assessment of proficiency in core design software tools',
          lastUpdated: '2025-01-28T11:15:00Z',
          questionsCount: 10,
          type: 'software',
          usedInCourses: 4
        },
        {
          id: '5',
          title: 'Workshop Tool Safety Quiz',
          description: 'General safety assessment for workshop tools',
          lastUpdated: '2025-01-20T16:30:00Z',
          questionsCount: 14,
          type: 'safety',
          usedInCourses: 5
        },
        {
          id: '6',
          title: 'Vinyl Cutter Certification',
          description: 'Certification for proper vinyl cutter operation and maintenance',
          lastUpdated: '2025-01-15T10:00:00Z',
          questionsCount: 8,
          type: 'equipment',
          usedInCourses: 2
        },
        {
          id: '7',
          title: 'Project Documentation Standards',
          description: 'Assessment of understanding project documentation requirements',
          lastUpdated: '2025-01-10T13:20:00Z',
          questionsCount: 6,
          type: 'documentation',
          usedInCourses: 3
        }
      ];
      
      setForms(mockForms);
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  // Filter forms based on search and type
  const filteredForms = forms.filter((form: any) => {
    const matchesSearch = form.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         form.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || form.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Form type options for filtering
  const formTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'safety', label: 'Safety' },
    { value: 'equipment', label: 'Equipment' },
    { value: 'software', label: 'Software' },
    { value: 'documentation', label: 'Documentation' }
  ];

  const handleCreateNewForm = () => {
    // In a real app, this would navigate to a form builder page
    console.log('Navigate to form builder');
    
    // For demo purposes, show dialog to inform users this is just a mockup
    window.alert('Form builder would be implemented in the full version. This is a demo mockup.');
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forms Management</h1>
          <p className="text-gray-600 mt-1">Create and manage certification forms</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button
            icon={<Plus size={16} />}
            onClick={handleCreateNewForm}
          >
            Create New Form
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Input
              placeholder="Search forms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search size={18} />}
              fullWidth
            />
          </div>
          
          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            options={formTypeOptions}
            fullWidth
          />
        </div>
      </Card>

      {/* Forms list */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      ) : (
        <>
          {filteredForms.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {filteredForms.map((form: any) => (
                <Card 
                  key={form.id}
                  className="hover:shadow-card-hover transition-all duration-200"
                >
                  <div className="flex justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">{form.title}</h3>
                      <p className="text-gray-500 mt-1">{form.description}</p>
                      
                      <div className="mt-4 flex flex-wrap gap-4">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Questions:</span> {form.questionsCount}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Type:</span> {form.type.charAt(0).toUpperCase() + form.type.slice(1)}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Used in:</span> {form.usedInCourses} {form.usedInCourses === 1 ? 'course' : 'courses'}
                        </div>
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Updated:</span> {new Date(form.lastUpdated).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      icon={<Edit size={16} />}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      icon={<Eye size={16} />}
                    >
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      icon={<Copy size={16} />}
                    >
                      Duplicate
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-error-600 hover:text-error-800 hover:bg-error-50"
                      icon={<Trash2 size={16} />}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <div className="inline-flex items-center justify-center bg-gray-100 rounded-full p-3 mb-4">
                <FileText className="h-8 w-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No forms found</h3>
              <p className="text-gray-500 mt-1">
                {searchQuery || selectedType !== 'all' 
                  ? 'Try changing your search criteria'
                  : 'Start by creating your first form'}
              </p>
              <div className="mt-6">
                <Button
                  icon={<FilePlus size={18} />}
                  onClick={handleCreateNewForm}
                >
                  Create New Form
                </Button>
              </div>
            </Card>
          )}
        </>
      )}

      {/* Form templates */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Start Templates</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Safety Certification', 'Equipment Operation', 'Software Proficiency', 'Knowledge Assessment'].map((template, index) => (
            <Card 
              key={index}
              className="hover:shadow-card-hover transition-all duration-200 cursor-pointer"
              onClick={handleCreateNewForm}
            >
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-full ${
                  index === 0 
                    ? 'bg-error-100 text-error-600' 
                    : index === 1 
                      ? 'bg-warning-100 text-warning-600' 
                      : index === 2 
                        ? 'bg-primary-100 text-primary-600' 
                        : 'bg-success-100 text-success-600'
                }`}>
                  <FileText size={20} />
                </div>
                <h3 className="text-base font-medium text-gray-900 ml-3">
                  {template} Template
                </h3>
              </div>
              
              <p className="text-sm text-gray-500 mb-4">
                {index === 0 
                  ? 'Pre-built template for safety certifications with standard safety questions and acknowledgments.'
                  : index === 1
                    ? 'Template designed for equipment operation certification with usage guidelines.'
                    : index === 2
                      ? 'Assessment template for software tool proficiency and knowledge checking.'
                      : 'General knowledge assessment template with multiple question types.'
                }
              </p>
              
              <Button
                size="sm"
                variant="ghost"
                className="text-primary-600"
                icon={<Plus size={16} />}
              >
                Use Template
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormsManagementPage;