import { cn } from '@/lib/utils';

interface StatusPillProps {
  status: 'connected' | 'disconnected' | 'partial' | 'error';
  children: React.ReactNode;
}

export const StatusPill = ({ status, children }: StatusPillProps) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'connected':
        return 'bg-status-green text-white border-status-green';
      case 'disconnected':
      case 'error':
        return 'bg-status-red text-white border-status-red';
      case 'partial':
        return 'bg-status-yellow text-gray-900 border-status-yellow';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border shadow-sm',
      getStatusStyles()
    )}>
      {children}
    </span>
  );
};
