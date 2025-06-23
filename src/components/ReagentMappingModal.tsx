
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Parameter } from '@/pages/Index';

interface ReagentMappingModalProps {
  parameter: Parameter;
  onSave: (reagents: string[]) => void;
  onClose: () => void;
}

const availableReagents = [
  'TSH Reagent Kit',
  'Glucose Reagent',
  'Cholesterol Kit',
  'T3 Reagent',
  'T4 Reagent',
  'FT4 Reagent'
];

export const ReagentMappingModal = ({ parameter, onSave, onClose }: ReagentMappingModalProps) => {
  const [selectedReagents, setSelectedReagents] = useState<string[]>(parameter.mappedReagents || []);

  const handleReagentToggle = (reagent: string) => {
    setSelectedReagents(prev =>
      prev.includes(reagent)
        ? prev.filter(r => r !== reagent)
        : [...prev, reagent]
    );
  };

  const handleSave = () => {
    onSave(selectedReagents);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Map Reagents to {parameter.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Select reagents to map to this parameter:
          </p>

          <div className="space-y-2 max-h-60 overflow-auto">
            {availableReagents.map((reagent) => (
              <div
                key={reagent}
                className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  id={reagent}
                  checked={selectedReagents.includes(reagent)}
                  onChange={() => handleReagentToggle(reagent)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={reagent}
                  className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                >
                  {reagent}
                </label>
              </div>
            ))}
          </div>

          {selectedReagents.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Selected Reagents:</p>
              <div className="flex flex-wrap gap-1">
                {selectedReagents.map((reagent) => (
                  <span
                    key={reagent}
                    className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {reagent}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
