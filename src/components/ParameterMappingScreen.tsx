
import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/StatusPill';
import { Test, Parameter } from '@/pages/Index';

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
    status: 'connected'
  },
  {
    id: '2',
    name: 'Triiodothyronine',
    code: 'T3',
    serverName: 'COBAS_6000',
    status: 'connected'
  },
  {
    id: '3',
    name: 'Thyroxine',
    code: 'T4',
    serverName: 'COBAS_6000',
    status: 'partial'
  },
  {
    id: '4',
    name: 'Free T4',
    code: 'FT4',
    serverName: 'COBAS_6000',
    status: 'connected'
  }
];

export const ParameterMappingScreen = ({ test, onBack }: ParameterMappingScreenProps) => {
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
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockParameters.map((parameter) => (
              <tr key={parameter.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {parameter.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parameter.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {parameter.serverName}
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
