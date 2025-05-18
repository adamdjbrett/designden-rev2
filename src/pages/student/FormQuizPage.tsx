import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas';
import { CheckCircle, AlertTriangle, ArrowLeft, Check, X } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { mockStudentCourses, mockFormTemplate } from '../../utils/mockData';

const FormQuizPage = () => {
  const { courseId, formId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<any>(null);
  const [form, setForm] = useState<any>(null);
  const [formTemplate, setFormTemplate] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const sigCanvas = useRef<SignatureCanvas>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // In a real app, these would be fetched from an API
      const courseData = mockStudentCourses.find(c => c.id === courseId);
      const formData = courseData?.forms.find(f => f.id === formId);
      
      // For this demo, we're using the same form template for all forms
      // In a real app, you would fetch the specific form template based on the formId
      
      setCourse(courseData || null);
      setForm(formData || null);
      setFormTemplate(mockFormTemplate || null);
      
      // Initialize answers object
      if (mockFormTemplate) {
        const initialAnswers: Record<string, any> = {};
        mockFormTemplate.sections.forEach((section: any) => {
          section.questions.forEach((question: any) => {
            initialAnswers[question.id] = 
              question.type === 'multiple_choice' ? '' :
              question.type === 'true_false' ? null :
              question.type === 'text' ? '' :
              question.type === 'file_upload' ? null :
              question.type === 'signature' ? null : '';
          });
        });
        setAnswers(initialAnswers);
      }
      
      setIsLoading(false);
    };

    fetchData();
  }, [courseId, formId]);

  const handleInputChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Clear error for this question if it exists
    if (errors[questionId]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const validateCurrentSection = () => {
    const currentSectionData = formTemplate.sections[currentSection];
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    currentSectionData.questions.forEach((question: any) => {
      const answer = answers[question.id];
      
      if (question.type === 'multiple_choice' && !answer) {
        newErrors[question.id] = 'Please select an answer';
        isValid = false;
      } else if (question.type === 'true_false' && answer === null) {
        newErrors[question.id] = 'Please select true or false';
        isValid = false;
      } else if (question.type === 'text' && (!answer || (question.minWords && answer.split(/\s+/).filter(Boolean).length < question.minWords))) {
        newErrors[question.id] = `Please enter at least ${question.minWords} words`;
        isValid = false;
      } else if (question.type === 'file_upload' && !answer) {
        newErrors[question.id] = 'Please upload a file';
        isValid = false;
      } else if (question.type === 'signature' && !answer) {
        newErrors[question.id] = 'Please provide your signature';
        isValid = false;
      }
    });
    
    setErrors(newErrors);
    return isValid;
  };

  const handleNextSection = () => {
    if (validateCurrentSection()) {
      if (currentSection < formTemplate.sections.length - 1) {
        setCurrentSection(prev => prev + 1);
        window.scrollTo(0, 0);
      }
    }
  };

  const handlePrevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmitForm = async () => {
    if (validateCurrentSection()) {
      setIsSubmitting(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would submit the answers to your backend here
      console.log('Form submitted with answers:', answers);
      
      setIsSubmitting(false);
      setIsCompleted(true);
    }
  };

  const handleClearSignature = () => {
    if (sigCanvas.current) {
      sigCanvas.current.clear();
      handleInputChange('q7', null);
    }
  };

  const handleSaveSignature = () => {
    if (sigCanvas.current) {
      const signatureData = sigCanvas.current.toDataURL();
      handleInputChange('q7', signatureData);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!course || !form || !formTemplate) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Form not found</h2>
        <p className="text-gray-600 mt-2">The certification form you're looking for doesn't exist or you don't have access to it.</p>
        <Button 
          variant="outline"
          className="mt-4"
          onClick={() => navigate(`/student/courses/${courseId}`)}
        >
          Return to Course
        </Button>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="max-w-3xl mx-auto animate-fade-in">
        <Card className="text-center py-12">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-success-100">
            <CheckCircle className="h-8 w-8 text-success-600" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-gray-900">Certification Completed!</h3>
          <p className="mt-2 text-lg text-gray-500">
            You have successfully completed the {form.name} certification.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              onClick={() => navigate(`/student/courses/${courseId}`)}
            >
              Return to Course
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const currentSectionData = formTemplate.sections[currentSection];
  const isLastSection = currentSection === formTemplate.sections.length - 1;

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(`/student/courses/${courseId}`)}
          className="text-gray-500 hover:text-gray-700 flex items-center"
        >
          <ArrowLeft size={16} className="mr-1" /> Back to Course
        </button>
      </div>

      <Card className="mb-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{formTemplate.title}</h1>
          <p className="text-gray-600 mt-1">{formTemplate.description}</p>
          
          <div className="mt-4 mb-2">
            <p className="text-sm font-medium text-gray-700">Course: {course.name}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium text-gray-900">
              Section {currentSection + 1} of {formTemplate.sections.length}: {currentSectionData.title}
            </h2>
            <span className="text-sm text-gray-500">
              {currentSection + 1}/{formTemplate.sections.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${((currentSection + 1) / formTemplate.sections.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-8">
          {currentSectionData.questions.map((question: any, index: number) => (
            <div key={question.id} className="pb-6 border-b border-gray-200 last:border-0 last:pb-0">
              <h3 className="text-base font-medium text-gray-900 mb-3">
                {index + 1}. {question.question}
              </h3>
              
              {question.type === 'multiple_choice' && (
                <div className="space-y-3">
                  {question.options.map((option: string, optionIndex: number) => (
                    <label 
                      key={optionIndex} 
                      className="block relative pl-8 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <input
                        type="radio"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-600 border-gray-300"
                        name={question.id}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={() => handleInputChange(question.id, option)}
                      />
                      <span className="text-gray-800">{option}</span>
                    </label>
                  ))}
                  {errors[question.id] && (
                    <p className="text-sm text-error-600 mt-2">
                      {errors[question.id]}
                    </p>
                  )}
                </div>
              )}
              
              {question.type === 'true_false' && (
                <div className="space-y-3">
                  <label className="block relative pl-8 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors">
                    <input
                      type="radio"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-600 border-gray-300"
                      name={question.id}
                      value="true"
                      checked={answers[question.id] === true}
                      onChange={() => handleInputChange(question.id, true)}
                    />
                    <span className="text-gray-800">True</span>
                  </label>
                  <label className="block relative pl-8 py-2 cursor-pointer hover:bg-gray-50 rounded-md transition-colors">
                    <input
                      type="radio"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary-600 border-gray-300"
                      name={question.id}
                      value="false"
                      checked={answers[question.id] === false}
                      onChange={() => handleInputChange(question.id, false)}
                    />
                    <span className="text-gray-800">False</span>
                  </label>
                  {errors[question.id] && (
                    <p className="text-sm text-error-600 mt-2">
                      {errors[question.id]}
                    </p>
                  )}
                </div>
              )}
              
              {question.type === 'text' && (
                <div>
                  <textarea
                    className="w-full rounded-md shadow-sm border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                    rows={5}
                    value={answers[question.id] || ''}
                    onChange={(e) => handleInputChange(question.id, e.target.value)}
                    placeholder={`Write your answer here (minimum ${question.minWords} words)...`}
                  ></textarea>
                  {question.minWords && (
                    <p className="text-xs text-gray-500 mt-1">
                      Word count: {answers[question.id] ? answers[question.id].split(/\s+/).filter(Boolean).length : 0}
                      {` / ${question.minWords} minimum`}
                    </p>
                  )}
                  {errors[question.id] && (
                    <p className="text-sm text-error-600 mt-2">
                      {errors[question.id]}
                    </p>
                  )}
                </div>
              )}
              
              {question.type === 'file_upload' && (
                <div>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor={`file-upload-${question.id}`}
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id={`file-upload-${question.id}`}
                            name={`file-upload-${question.id}`}
                            type="file"
                            className="sr-only"
                            accept={question.allowedFileTypes.join(',')}
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              handleInputChange(question.id, file);
                            }}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        {question.allowedFileTypes.map(t => t.split('/')[1]).join(', ')} up to {question.maxFileSize}MB
                      </p>
                      {answers[question.id] && (
                        <p className="text-sm text-primary-600 font-medium mt-2">
                          Selected: {answers[question.id].name}
                        </p>
                      )}
                    </div>
                  </div>
                  {errors[question.id] && (
                    <p className="text-sm text-error-600 mt-2">
                      {errors[question.id]}
                    </p>
                  )}
                </div>
              )}
              
              {question.type === 'signature' && (
                <div>
                  <div className="border-2 border-gray-300 rounded-md overflow-hidden">
                    <SignatureCanvas
                      ref={sigCanvas}
                      penColor="black"
                      canvasProps={{
                        className: 'signature-canvas w-full h-40 bg-white'
                      }}
                      onEnd={() => handleSaveSignature()}
                    />
                  </div>
                  <div className="flex justify-end space-x-2 mt-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      icon={<X size={16} />}
                      onClick={handleClearSignature}
                    >
                      Clear
                    </Button>
                  </div>
                  {errors[question.id] && (
                    <p className="text-sm text-error-600 mt-2">
                      {errors[question.id]}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    Sign using your mouse, touchpad, or finger on touch-enabled devices
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevSection}
            disabled={currentSection === 0}
          >
            Previous
          </Button>
          
          {!isLastSection ? (
            <Button onClick={handleNextSection}>
              Next
            </Button>
          ) : (
            <Button 
              icon={<Check size={18} />}
              isLoading={isSubmitting}
              onClick={handleSubmitForm}
            >
              Complete Certification
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FormQuizPage;