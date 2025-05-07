
import React from 'react';
import { cn } from '@/lib/utils';

interface XpDisplayProps {
  value: string;
  className?: string;
}

const XpDisplay: React.FC<XpDisplayProps> = ({ value, className }) => {
  return (
    <div className={cn('xp-display text-right h-10 flex items-center justify-end text-xl overflow-hidden rounded', className)}>
      {value}
    </div>
  );
};

export default XpDisplay;
