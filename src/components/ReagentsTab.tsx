import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AddEditReagentModal } from '@/components/AddEditReagentModal';
import { Instrument, Reagent } from '@/pages/Index';

interface ReagentsTabProps {
  instrument: Instrument;
}

const mockReagents: Reagent[] = [
  {
    id: '1',
    name: 'TSH Reagent Kit',
    instrumentTestCode: 'TSH_KIT',
    labTestCode: 'TSH',
    mappedParameters: ['TSH', 'T3'],
    instrumentId: '2'
  },
  {
    id: '2',
    name: 'Glucose Reagent',
    instrumentTestCode: 'GLU_KIT',
    labTestCode: 'GLU',
    mappedParameters: ['GLUCOSE'],
    instrumentId: '2'
  },
  {
    id: '3',
    name: 'Cholesterol Kit',
    instrumentTestCode: 'CHOL_KIT',
    labTestCode: 'CHOL',
    mappedParameters: ['CHOL_TOTAL'],
    instrumentId: '2'
  }
];

export const ReagentsTab = ({ instrument }: ReagentsTabProps) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingReagent, setEditingReagent] = useState<Reagent | null>(null);
  const [reagents, setReagents] = useState(mockReagents.filter(r => r.instrumentId === instrument.id));

  const handleEdit = (reagent: Reagent) => {
    setEditingReagent(reagent);
    setShowAddModal(true);
  };

  const handleDelete = (reagentId: string) => {
    setReagents(prev => prev.filter(r => r.id !== reagentId));
  };

  const handleSaveReagent = (reagent: Reagent) => {
    if (editingReagent) {
      setReagents(prev => prev.map(r => r.id === reagent.id ? reagent : r));
    } else {
      setReagents(prev => [...prev, reagent]);
    }
    setShowAddModal(false);
    setEditingReagent(null);
  };

  return (
    <div>
      <div className="px-8 py-4 border-b border-gray-200 bg-white rounded-t-lg">
        <div className="flex justify-end">
          <Button 
            className="bg-status-green hover:bg-green-700 text-white font-semibold rounded-md px-6 py-2 shadow"
            onClick={() => setShowAddModal(true)}
          >
            Add Reagent
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Reagent Name</th>
              <th className="px-8 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Instrument Test Code</th>
              <th className="px-8 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Lab Test Code</th>
              <th className="px-8 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Mapped Parameters</th>
              <th className="px-8 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reagents.map((reagent) => (
              <tr
                key={reagent.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer group"
                onClick={() => handleEdit(reagent)}
              >
                <td className="px-8 py-4 whitespace-nowrap text-base font-medium text-gray-900">{reagent.name}</td>
                <td className="px-8 py-4 whitespace-nowrap text-base text-gray-900">{reagent.instrumentTestCode}</td>
                <td className="px-8 py-4 whitespace-nowrap text-base text-gray-900">{reagent.labTestCode}</td>
                <td className="px-8 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-2">
                    {reagent.mappedParameters.map((param) => (
                      <span
                        key={param}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-status-green text-white border border-status-green shadow-sm"
                      >
                        {param}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-8 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-status-green border-status-green border-2 rounded-md font-semibold px-4 py-1 hover:bg-status-green hover:text-white transition-colors shadow-sm"
                      onClick={() => handleEdit(reagent)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-status-red border-status-red border-2 rounded-md font-semibold px-4 py-1 hover:bg-status-red hover:text-white transition-colors shadow-sm"
                      onClick={() => handleDelete(reagent.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddEditReagentModal
          instrument={instrument}
          reagent={editingReagent}
          onSave={handleSaveReagent}
          onClose={() => {
            setShowAddModal(false);
            setEditingReagent(null);
          }}
        />
      )}
    </div>
  );
};
