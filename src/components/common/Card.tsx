import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: ReactNode;
  hover?: boolean;
}

const Card = ({ 
  children, 
  className, 
  title, 
  subtitle, 
  footer,
  hover = false 
}: CardProps) => {
  return (
    <div className={twMerge(
      'bg-white rounded-lg shadow-card overflow-hidden', 
      hover && 'transition-shadow duration-200 hover:shadow-card-hover',
      className
    )}>
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-gray-200">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      
      <div className="px-6 py-5">
        {children}
      </div>
      
      {footer && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;