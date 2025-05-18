import { CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export type StatusType = 'completed' | 'failed' | 'pending';

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
  const getIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className={getIconSizeClass()} />;
      case 'failed':
        return <XCircle className={getIconSizeClass()} />;
      case 'pending':
        return <HelpCircle className={getIconSizeClass()} />;
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
      case 'completed':
        return 'text-success-500';
      case 'failed':
        return 'text-error-500';
      case 'pending':
        return 'text-gray-400';
    }
  };

  const getLabelText = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      case 'pending':
        return 'Pending';
    }
  };

  return (
    <div className={twMerge('flex items-center', className)}>
      <span className={getColorClass()}>
        {getIcon()}
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