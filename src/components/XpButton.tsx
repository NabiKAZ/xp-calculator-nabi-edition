
import React from 'react';
import { cn } from '@/lib/utils';

interface XpButtonProps {
  value: string;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

const XpButton: React.FC<XpButtonProps> = ({ value, onClick, className, children }) => {
  return (
    <button
      className={cn(
        'xp-button font-["Tahoma"] text-sm min-w-[40px] min-h-[30px] rounded',
        className
      )}
      onClick={onClick}
    >
      {children || value}
    </button>
  );
};

export default XpButton;
