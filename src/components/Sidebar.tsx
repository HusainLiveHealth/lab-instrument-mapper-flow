
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
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
            HYD
          </div>
          <span className="font-medium">Hyderabad Lab</span>
        </div>
      </div>
      
      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href="#"
            className={cn(
              'flex items-center px-4 py-3 text-sm hover:bg-gray-700 transition-colors',
              item.active && 'bg-gray-700 border-r-3 border-blue-500'
            )}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
};
