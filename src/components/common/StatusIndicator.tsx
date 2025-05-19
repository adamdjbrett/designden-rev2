import { HelpCircle, X, AlertTriangle, CheckCircle, Search } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type StatusType = 'not_started' | 'failed' | 'needs_review' | 'approved_unsupervised' | 'approved_supervised';

interface StatusIndicatorProps {
  status: StatusType;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: boolean;
}

const StatusIndicator = ({ 
  status, 
  size = 'md', 
  className,
  text = false
}: StatusIndicatorProps) => {
  const getStatusSymbol = () => {
    switch (status) {
      case 'not_started':
        return '❓';
      case 'failed':
        return '❌';
      case 'needs_review':
        return '⚠️';
      case 'approved_unsupervised':
        return '✅';
      case 'approved_supervised':
        return '🔎';
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'not_started':
        return <HelpCircle className={getIconSizeClass()} />;
      case 'failed':
        return <X className={getIconSizeClass()} />;
      case 'needs_review':
        return <AlertTriangle className={getIconSizeClass()} />;
      case 'approved_unsupervised':
        return <CheckCircle className={getIconSizeClass()} />;
      case 'approved_supervised':
        return <Search className={getIconSizeClass()} />;
    }
  };

  const getIconSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-5 h-5';
      case 'lg':
        return 'w-6 h-6';
    }
  };

  const getColorClass = () => {
    switch (status) {
      case 'not_started':
        return 'text-gray-400';
      case 'failed':
        return 'text-error-500';
      case 'needs_review':
        return 'text-warning-500';
      case 'approved_unsupervised':
        return 'text-success-500';
      case 'approved_supervised':
        return 'text-primary-500';
    }
  };

  const getLabelText = () => {
    switch (status) {
      case 'not_started':
        return 'Not Started';
      case 'failed':
        return 'Failed';
      case 'needs_review':
        return 'Needs Review';
      case 'approved_unsupervised':
        return 'Approved (Unsupervised)';
      case 'approved_supervised':
        return 'Approved (Supervised)';
    }
  };

  return (
    <div className={twMerge('flex items-center', className)}>
      <span className={getColorClass()}>
        {text ? getStatusSymbol() : getIcon()}
      </span>
      {text && (
        <span className={twMerge('ml-2', getColorClass())}>
          {getLabelText()}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;