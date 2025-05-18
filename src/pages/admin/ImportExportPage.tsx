import { useState } from 'react';
import { 
  Upload, 
  Download, 
  FileText, 
  Users, 
  BookOpen, 
  AlertCircle 
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

const ImportExportPage = () => {
  const [activeTab, setActiveTab] = useState('import');
  const [importType, setImportType] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [importStatus, setImportStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setImportStatus(null);
  };

  const handleImport = () => {
    if (!selectedFile || !importType) return;

    // In a real app, you would upload the file to your backend here
    // For this demo, we'll just simulate a successful import after a short delay
    setImportStatus({ success: false, message: 'Processing...' });

    setTimeout(() => {
      if (selectedFile.type !== 'text/csv') {
        setImportStatus({ 
          success: false, 
          message: 'Please upload a CSV file.' 
        });
        return;
      }

      setImportStatus({ 
        success: true, 
        message: `Successfully imported ${importType} data from ${selectedFile.name}` 
      });

      // Reset the file input
      setSelectedFile(null);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }, 1500);
  };

  const handleExport = (dataType: string) => {
    // In a real app, this would trigger an API call to download the data
    // For this demo, we'll just simulate a download after a short delay
    
    setTimeout(() => {
      // Create a simple CSV content (this would come from your backend in a real app)
      const csvContent = "id,name,email\n1,John Doe,john@designden.space\n2,Jane Smith,jane@designden.space";
      
      // Create a Blob from the CSV content
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // Create a link element and trigger download
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${dataType.toLowerCase()}-export-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 500);
  };

  const importOptions = [
    {
      id: 'students',
      title: 'Import Students',
      icon: <Users size={32} />,
      description: 'Import student data with email, name, and ID'
    },
    {
      id: 'courses',
      title: 'Import Courses',
      icon: <BookOpen size={32} />,
      description: 'Import course data with name, year, and term'
    },
    {
      id: 'combined',
      title: 'Import Courses & Students',
      icon: <FileText size={32} />,
      description: 'Import combined course and student enrollment data'
    }
  ];

  const exportOptions = [
    {
      id: 'students',
      title: 'Export Students',
      icon: <Users size={32} />,
      description: 'Export all student data with enrollment information'
    },
    {
      id: 'courses',
      title: 'Export Courses',
      icon: <BookOpen size={32} />,
      description: 'Export all course data with enrollment and form information'
    },
    {
      id: 'certifications',
      title: 'Export Certifications',
      icon: <FileText size={32} />,
      description: 'Export all certification data with completion status'
    }
  ];

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Import/Export Data</h1>
        <p className="text-gray-600 mt-1">Manage your school data by importing and exporting CSV files</p>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('import')}
              className={`
                w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
                ${activeTab === 'import'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <Upload className="w-5 h-5 inline mr-2" />
              Import
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`
                w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm
                ${activeTab === 'export'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              <Download className="w-5 h-5 inline mr-2" />
              Export
            </button>
          </nav>
        </div>
      </div>

      {activeTab === 'import' ? (
        <>
          {!importType ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {importOptions.map((option) => (
                <Card 
                  key={option.id} 
                  className="hover:shadow-card-hover cursor-pointer transition-all duration-200 transform hover:-translate-y-1"
                  onClick={() => setImportType(option.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-primary-100 text-primary-600 mb-4">
                      {option.icon}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{option.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="animate-slide-in">
              <div className="flex items-center mb-6">
                <button 
                  onClick={() => {
                    setImportType(null);
                    setSelectedFile(null);
                    setImportStatus(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 mr-4"
                >
                  &larr; Back
                </button>
                <h3 className="text-lg font-medium text-gray-900">
                  {importOptions.find(o => o.id === importType)?.title}
                </h3>
              </div>
              
              {importStatus && (
                <div className={`mb-6 p-4 rounded-md ${
                  importStatus.success 
                    ? 'bg-success-50 border border-success-200 text-success-800' 
                    : 'bg-error-50 border border-error-200 text-error-800'
                }`}>
                  <div className="flex items-start">
                    {importStatus.success ? (
                      <CheckCircleIcon className="h-5 w-5 text-success-500 mr-2" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-error-500 mr-2" />
                    )}
                    <span>{importStatus.message}</span>
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload CSV File
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                      <Upload size={48} className="mx-auto" />
                    </div>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                      >
                        <span>Upload a file</span>
                        <Input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          accept=".csv"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">CSV files only, up to 10MB</p>
                    {selectedFile && (
                      <p className="text-sm text-primary-600 font-medium mt-2">
                        Selected: {selectedFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">CSV Format Requirements</h4>
                <div className="bg-gray-50 p-3 rounded text-sm text-gray-600">
                  {importType === 'students' && (
                    <p>Required columns: <code>name,email,student_id</code></p>
                  )}
                  {importType === 'courses' && (
                    <p>Required columns: <code>name,description,year,term</code></p>
                  )}
                  {importType === 'combined' && (
                    <p>Required columns: <code>student_email,course_id,enrollment_date</code></p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button
                  onClick={handleImport}
                  disabled={!selectedFile}
                  icon={<Upload size={18} />}
                >
                  Import Data
                </Button>
              </div>
            </Card>
          )}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {exportOptions.map((option) => (
            <Card key={option.id} className="hover:shadow-card-hover transition-all duration-200 transform hover:-translate-y-1">
              <div className="flex flex-col items-center text-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600 mb-4">
                  {option.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6">{option.description}</p>
                <Button
                  variant="outline"
                  icon={<Download size={18} />}
                  onClick={() => handleExport(option.id)}
                >
                  Export CSV
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper icon component since it's not included in lucide-react
const CheckCircleIcon = (props: any) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default ImportExportPage;