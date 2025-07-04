import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/StatusPill';
import { ReagentMappingModal } from '@/components/ReagentMappingModal';
import { Test, Parameter } from '@/pages/Index';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

interface ParameterMappingScreenProps {
  test: Test;
  onBack: () => void;
}

const mockParameters: Parameter[] = [
  {
    id: '1',
    name: 'Thyroid Stimulating Hormone',
    code: 'TSH',
    serverName: 'COBAS_6000',
    status: 'connected',
    mappedReagents: ['TSH Reagent Kit']
  },
  {
    id: '2',
    name: 'Triiodothyronine',
    code: 'T3',
    serverName: 'COBAS_6000',
    status: 'connected',
    mappedReagents: ['TSH Reagent Kit']
  },
  {
    id: '3',
    name: 'Thyroxine',
    code: 'T4',
    serverName: 'COBAS_6000',
    status: 'partial',
    mappedReagents: []
  },
  {
    id: '4',
    name: 'Free T4',
    code: 'FT4',
    serverName: 'COBAS_6000',
    status: 'connected',
    mappedReagents: []
  }
];

// Mock reagents for lookup (should match ReagentsTab)
const mockReagents = [
  {
    id: '1',
    name: 'TSH Reagent Kit',
    instrumentTestCode: 'TSH_KIT',
    labTestCode: 'TSH',
    mappedParameters: ['TSH', 'T3'],
    instrumentId: '2',
  },
  {
    id: '2',
    name: 'Glucose Reagent',
    instrumentTestCode: 'GLU_KIT',
    labTestCode: 'GLU',
    mappedParameters: ['GLUCOSE'],
    instrumentId: '2',
  },
  {
    id: '3',
    name: 'Cholesterol Kit',
    instrumentTestCode: 'CHOL_KIT',
    labTestCode: 'CHOL',
    mappedParameters: ['CHOL_TOTAL'],
    instrumentId: '2',
  },
];

export const ParameterMappingScreen = ({ test, onBack }: ParameterMappingScreenProps) => {
  const [selectedParameter, setSelectedParameter] = useState<Parameter | null>(null);
  const [showReagentModal, setShowReagentModal] = useState(false);
  const [parameters, setParameters] = useState(mockParameters);

  const handleReagentMapping = (parameter: Parameter) => {
    setSelectedParameter(parameter);
    setShowReagentModal(true);
  };

  const handleSaveReagentMapping = (paramId: string, reagents: string[]) => {
    setParameters(prev => prev.map(p => 
      p.id === paramId ? { ...p, mappedReagents: reagents } : p
    ));
    setShowReagentModal(false);
    setSelectedParameter(null);
  };

  const handleRemoveReagent = (paramId: string, reagentName: string) => {
    setParameters(prev => prev.map(p =>
      p.id === paramId
        ? { ...p, mappedReagents: (p.mappedReagents || []).filter(r => r !== reagentName) }
        : p
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{test.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Test Code: {test.code} • Parameter Management
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onBack}>
              Back to Test List
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Add Parameter
            </Button>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parameter Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Parameter Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Server Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mapped Reagent(s)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {parameters.map((parameter) => {
              const mappedReagent = parameter.mappedReagents && parameter.mappedReagents.length > 0
                ? mockReagents.find(r => r.name === parameter.mappedReagents[0])
                : null;
              const isAutoFilled = !!mappedReagent;
              return (
                <tr key={parameter.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {parameter.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isAutoFilled ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={mappedReagent.labTestCode}
                          readOnly
                          className="bg-gray-100 border border-gray-200 rounded px-2 py-1 w-28 cursor-not-allowed text-gray-700"
                          tabIndex={-1}
                        />
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="ml-1 cursor-help">ℹ️</span>
                          </TooltipTrigger>
                          <TooltipContent>Auto-filled from mapped reagent</TooltipContent>
                        </Tooltip>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={parameter.code}
                        onChange={e => setParameters(prev => prev.map(p => p.id === parameter.id ? { ...p, code: e.target.value } : p))}
                        className="border border-gray-200 rounded px-2 py-1 w-28"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {isAutoFilled ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={mappedReagent.instrumentTestCode}
                          readOnly
                          className="bg-gray-100 border border-gray-200 rounded px-2 py-1 w-32 cursor-not-allowed text-gray-700"
                          tabIndex={-1}
                        />
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="ml-1 cursor-help">ℹ️</span>
                          </TooltipTrigger>
                          <TooltipContent>Auto-filled from mapped reagent</TooltipContent>
                        </Tooltip>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={parameter.serverName}
                        onChange={e => setParameters(prev => prev.map(p => p.id === parameter.id ? { ...p, serverName: e.target.value } : p))}
                        className="border border-gray-200 rounded px-2 py-1 w-32"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {parameter.mappedReagents && parameter.mappedReagents.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {parameter.mappedReagents.map((reagent) => (
                          <span
                            key={reagent}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800 border border-green-200 gap-1"
                          >
                            {reagent}
                            <button
                              type="button"
                              className="ml-1 text-gray-400 hover:text-red-500"
                              onClick={() => handleRemoveReagent(parameter.id, reagent)}
                            >
                              <span className="ml-1">×</span>
                            </button>
                          </span>
                        ))}
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReagentMapping(parameter)}
                        className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      >
                        + Map
                      </Button>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusPill status={parameter.status}>
                      {parameter.status === 'connected' ? 'Active' : 'Partial'}
                    </StatusPill>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">
                      Remove
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showReagentModal && selectedParameter && (
        <ReagentMappingModal
          parameter={selectedParameter}
          onSave={(reagents) => handleSaveReagentMapping(selectedParameter.id, reagents)}
          onClose={() => {
            setShowReagentModal(false);
            setSelectedParameter(null);
          }}
        />
      )}
    </div>
  );
};
