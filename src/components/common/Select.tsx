import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helpText?: string;
  fullWidth?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    options, 
    error, 
    helpText, 
    fullWidth = false,
    className,
    id,
    ...props 
  }, ref) => {
    const selectId = id || Math.random().toString(36).substring(2, 9);
    
    const baseSelectClasses = 'block rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500';
    const errorSelectClasses = 'border-error-300 text-error-900 focus:ring-error-500 focus:border-error-500';
    const widthClass = fullWidth ? 'w-full' : '';

    const selectClasses = twMerge(
      baseSelectClasses,
      error ? errorSelectClasses : 'border-gray-300',
      widthClass,
      className
    );

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <select
          ref={ref}
          id={selectId}
          className={selectClasses}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${selectId}-error` : helpText ? `${selectId}-description` : undefined}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {error && (
          <p id={`${selectId}-error`} className="mt-1 text-sm text-error-600">
            {error}
          </p>
        )}
        
        {helpText && !error && (
          <p id={`${selectId}-description`} className="mt-1 text-sm text-gray-500">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;