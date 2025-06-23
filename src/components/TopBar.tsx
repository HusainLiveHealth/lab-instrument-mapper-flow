import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const TopBar = () => {
  return (
    <div className="bg-header px-8 py-4 border-b border-sidebar-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-status-green rounded flex items-center justify-center text-white font-bold text-sm shadow">
              HYD
            </div>
            <span className="font-semibold text-white text-lg tracking-wide">INSTRUMENTS</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search..."
            className="w-64 bg-sidebar-active text-white border-none focus:ring-2 focus:ring-status-green placeholder-gray-400 rounded-md px-4 py-2"
          />
          <Button variant="outline" className="text-white border-status-green border-2 rounded-md font-semibold hover:bg-status-green hover:text-header transition-colors">
            Download Instrument Map
          </Button>
        </div>
      </div>
    </div>
  );
};
