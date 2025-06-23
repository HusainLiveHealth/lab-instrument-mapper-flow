
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
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-end">
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reagent Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Instrument Test Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lab Test Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mapped Parameters
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reagents.map((reagent) => (
              <tr key={reagent.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {reagent.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {reagent.instrumentTestCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {reagent.labTestCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-wrap gap-1">
                    {reagent.mappedParameters.map((param) => (
                      <span
                        key={param}
                        className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {param}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      onClick={() => handleEdit(reagent)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 border-red-600 hover:bg-red-50"
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
