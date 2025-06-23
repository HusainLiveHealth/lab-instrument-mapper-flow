import { cn } from '@/lib/utils';
import { Screen } from '@/pages/Index';

interface SidebarProps {
  currentScreen: Screen;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'orders', label: 'Orders', icon: '📋' },
  { id: 'masters', label: 'Masters', icon: '🗂️' },
  { id: 'instruments', label: 'Instrument Master', icon: '🔬', active: true },
  { id: 'reports', label: 'Reports', icon: '📈' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

export const Sidebar = ({ currentScreen }: SidebarProps) => {
  return (
    <div className="w-64 h-screen bg-sidebar text-white flex flex-col">
      <div className="p-4 border-b border-sidebar-border bg-sidebar">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-status-green rounded flex items-center justify-center text-white font-bold text-sm">
            HYD
          </div>
          <span className="font-semibold tracking-wide text-lg">Hyderabad Lab</span>
        </div>
      </div>
      
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={cn(
              'flex items-center px-6 py-3 text-base font-medium rounded-l-lg transition-colors',
              item.active
                ? 'bg-sidebar-active border-l-4 border-status-green text-white shadow-md'
                : 'hover:bg-sidebar-active text-gray-300'
            )}
          >
            <span className="mr-4 text-xl">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};
