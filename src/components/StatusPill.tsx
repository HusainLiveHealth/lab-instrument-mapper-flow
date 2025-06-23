
import { cn } from '@/lib/utils';

interface StatusPillProps {
  status: 'connected' | 'disconnected' | 'partial' | 'error';
  children: React.ReactNode;
}

export const StatusPill = ({ status, children }: StatusPillProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'disconnected':
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      getStatusStyles()
    )}>
      {children}
    </span>
  );
};
