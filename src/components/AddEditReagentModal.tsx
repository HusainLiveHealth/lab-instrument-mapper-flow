
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MultiSelect } from '@/components/ui/multi-select';
import { Instrument, Reagent } from '@/pages/Index';

interface AddEditReagentModalProps {
  instrument: Instrument;
  reagent?: Reagent | null;
  onSave: (reagent: Reagent) => void;
  onClose: () => void;
}

const allParameters = [
  'TSH', 'T3', 'T4', 'FT4', 'GLUCOSE', 'CHOL_TOTAL', 'TRIGLY', 
  'ALT', 'AST', 'ALP', 'BILIRUBIN'
];

export const AddEditReagentModal = ({ instrument, reagent, onSave, onClose }: AddEditReagentModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    instrumentTestCode: '',
    labTestCode: '',
    mappedParameters: [] as string[]
  });

  useEffect(() => {
    if (reagent) {
      setFormData({
        name: reagent.name,
        instrumentTestCode: reagent.instrumentTestCode,
        labTestCode: reagent.labTestCode,
        mappedParameters: reagent.mappedParameters
      });
    }
  }, [reagent]);

  const handleSave = () => {
    const newReagent: Reagent = {
      id: reagent?.id || Date.now().toString(),
      name: formData.name,
      instrumentTestCode: formData.instrumentTestCode,
      labTestCode: formData.labTestCode,
      mappedParameters: formData.mappedParameters,
      instrumentId: instrument.id
    };
    onSave(newReagent);
  };

  const isValid = formData.name && formData.instrumentTestCode && formData.labTestCode;

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {reagent ? 'Edit Reagent' : 'Add Reagent'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reagent Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter reagent name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Instrument Test Code
            </label>
            <Input
              value={formData.instrumentTestCode}
              onChange={(e) => setFormData(prev => ({ ...prev, instrumentTestCode: e.target.value }))}
              placeholder="Enter instrument test code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lab Test Code
            </label>
            <Input
              value={formData.labTestCode}
              onChange={(e) => setFormData(prev => ({ ...prev, labTestCode: e.target.value }))}
              placeholder="Enter lab test code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mapped Parameters
            </label>
            <MultiSelect
              options={allParameters.map(param => ({ label: param, value: param }))}
              selected={formData.mappedParameters}
              onChange={(selected) => setFormData(prev => ({ ...prev, mappedParameters: selected }))}
              placeholder="Select parameters"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!isValid}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
