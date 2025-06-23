import { Button } from '@/components/ui/button';
import { StatusPill } from '@/components/StatusPill';
import { Instrument } from '@/pages/Index';

interface InstrumentListProps {
  onInstrumentClick: (instrument: Instrument) => void;
  onEditSettings: (instrument: Instrument) => void;
}

const mockInstruments: Instrument[] = [
  {
    id: '1',
    name: 'Axisym Automated',
    status: 'connected',
    department: 'Immunology',
    machineName: 'AXSYM_IU',
    location: 'Lab A',
    testCount: 245
  },
  {
    id: '2',
    name: 'Cobas 6000',
    status: 'connected',
    department: 'Biochemistry',
    machineName: 'COBAS_6000',
    location: 'Lab B',
    testCount: 892
  },
  {
    id: '3',
    name: 'Vitros ECI',
    status: 'disconnected',
    department: 'Biochemistry',
    machineName: 'VITROS_ECI',
    location: 'Lab C',
    testCount: 156
  },
  {
    id: '4',
    name: 'Cell-Dyn Emerald',
    status: 'connected',
    department: 'Hematology',
    machineName: 'CELLDYN_EMERALD',
    location: 'Lab D',
    testCount: 678
  },
  {
    id: '5',
    name: 'BacT Alert 3D',
    status: 'disconnected',
    department: 'Microbiology',
    machineName: 'BACTALERT_3D',
    location: 'Lab E',
    testCount: 234
  }
];

export const InstrumentList = ({ onInstrumentClick, onEditSettings }: InstrumentListProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="px-8 py-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Instrument Master</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-8 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Name of Instruments</th>
              <th className="px-8 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Connection Status</th>
              <th className="px-8 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Department Type</th>
              <th className="px-8 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Instrument AE</th>
              <th className="px-8 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Instrument AET</th>
              <th className="px-8 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Test Count</th>
              <th className="px-8 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockInstruments.map((instrument) => (
              <tr
                key={instrument.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer group"
                onClick={() => onInstrumentClick(instrument)}
              >
                <td className="px-8 py-4 whitespace-nowrap text-base font-medium text-blue-700 group-hover:underline">
                  {instrument.name}
                </td>
                <td className="px-8 py-4 whitespace-nowrap">
                  <StatusPill status={instrument.status}>{instrument.status === 'connected' ? 'Connected' : 'Disconnected'}</StatusPill>
                </td>
                <td className="px-8 py-4 whitespace-nowrap text-base text-gray-900">{instrument.department}</td>
                <td className="px-8 py-4 whitespace-nowrap text-base text-gray-900">{instrument.machineName}</td>
                <td className="px-8 py-4 whitespace-nowrap text-base text-gray-900">{instrument.location}</td>
                <td className="px-8 py-4 whitespace-nowrap text-base text-gray-900">{instrument.testCount}</td>
                <td className="px-8 py-4 whitespace-nowrap" onClick={e => e.stopPropagation()}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditSettings(instrument)}
                    className="text-status-green border-status-green border-2 rounded-md font-semibold px-4 py-1 hover:bg-status-green hover:text-white transition-colors shadow-sm"
                  >
                    Edit Settings
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
