import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    label, 
    error, 
    helpText, 
    icon, 
    iconPosition = 'left', 
    fullWidth = false,
    className,
    id,
    ...props 
  }, ref) => {
    const inputId = id || Math.random().toString(36).substring(2, 9);
    
    const baseInputClasses = 'rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500';
    const errorInputClasses = 'border-error-300 text-error-900 placeholder-error-300 focus:ring-error-500 focus:border-error-500';
    const iconPaddingLeft = iconPosition === 'left' && icon ? 'pl-10' : '';
    const iconPaddingRight = iconPosition === 'right' && icon ? 'pr-10' : '';
    const widthClass = fullWidth ? 'w-full' : '';

    const inputClasses = twMerge(
      baseInputClasses,
      error ? errorInputClasses : 'border-gray-300',
      iconPaddingLeft,
      iconPaddingRight,
      widthClass,
      className
    );

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && iconPosition === 'left' && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${inputId}-error` : helpText ? `${inputId}-description` : undefined}
            {...props}
          />
          
          {icon && iconPosition === 'right' && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-400">
              {icon}
            </div>
          )}
        </div>
        
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-sm text-error-600">
            {error}
          </p>
        )}
        
        {helpText && !error && (
          <p id={`${inputId}-description`} className="mt-1 text-sm text-gray-500">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;