
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const TopBar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center text-white font-bold text-sm">
              HYD
            </div>
            <span className="font-medium text-gray-900">INSTRUMENTS</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search..."
            className="w-64"
          />
          <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
            Download Instrument Map
          </Button>
        </div>
      </div>
    </div>
  );
};
