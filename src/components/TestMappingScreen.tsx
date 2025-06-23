import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/StatusPill';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReagentsTab } from '@/components/ReagentsTab';
import { Instrument, Test } from '@/pages/Index';

interface TestMappingScreenProps {
  instrument: Instrument;
  onTestClick: (test: Test) => void;
  onBack: () => void;
}

const mockTests: Test[] = [
  {
    id: '1',
    name: 'Glucose',
    code: 'GLU',
    parameterMapped: ['GLUCOSE'],
    status: 'connected'
  },
  {
    id: '2',
    name: 'Cholesterol',
    code: 'CHOL',
    parameterMapped: ['CHOL_TOTAL'],
    status: 'connected'
  },
  {
    id: '3',
    name: 'Triglycerides',
    code: 'TG',
    parameterMapped: ['TRIGLY'],
    status: 'partial'
  },
  {
    id: '4',
    name: 'Thyroid Profile - II',
    code: 'TH_PROF_2',
    parameterMapped: ['TSH', 'T3', 'T4'],
    status: 'connected'
  },
  {
    id: '5',
    name: 'Liver Function Test',
    code: 'LFT',
    parameterMapped: ['ALT', 'AST', 'ALP', 'BILIRUBIN'],
    status: 'error'
  }
];

export const TestMappingScreen = ({ instrument, onTestClick, onBack }: TestMappingScreenProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-semibold text-gray-900">{instrument.name}</h1>
              <StatusPill status={instrument.status}>
                {instrument.status === 'connected' ? 'Connected' : 'Disconnected'}
              </StatusPill>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Instrument ID: {instrument.id} • Last Sync: 2 minutes ago
            </p>
          </div>
          <Button variant="outline" onClick={onBack}>
            Back to Instruments
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tests" className="w-full">
        <TabsList className="w-full justify-start px-6 bg-transparent border-b border-gray-200 rounded-none">
          <TabsTrigger value="tests" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
            Mapped Tests
          </TabsTrigger>
          <TabsTrigger value="reagents" className="data-[state=active]:border-b-2 data-[state=active]:border-blue-600">
            Reagents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tests" className="mt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parameter Mapped
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
                {mockTests.map((test) => (
                  <tr
                    key={test.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => onTestClick(test)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-blue-700 font-medium group-hover:underline">
                      {test.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {test.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {test.parameterMapped.map((param) => (
                          <span
                            key={param}
                            className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {param}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusPill status={test.status}>
                        {test.status === 'connected' ? 'Mapped' : 
                         test.status === 'partial' ? 'Partial' : 'Error'}
                      </StatusPill>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                      <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="reagents" className="mt-0">
          <ReagentsTab instrument={instrument} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
