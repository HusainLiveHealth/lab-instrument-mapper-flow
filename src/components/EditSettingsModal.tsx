import { Button } from '@/components/ui/button';
import { Instrument } from '@/pages/Index';

interface EditSettingsModalProps {
  instrument: Instrument;
  onClose: () => void;
}

const jsonConfig = {
  reportFormatId: "COBAS_6000",
  serverName: "192.168.1.100",
  machineName: "COBAS_6000_MAIN",
  department: "Biochemistry",
  location: "Lab_B_Floor_2",
  connectionType: "TCP_IP",
  port: 3001,
  enableAutoSync: true,
  syncInterval: 300,
  testMapping: {
    enabled: true,
    mappingFile: "cobas_6000_mapping.xml"
  }
};

export const EditSettingsModal = ({ instrument, onClose }: EditSettingsModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl mx-4 border-2 border-gray-200">
        <div className="px-8 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Edit settings</h2>
        </div>
        <div className="p-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Configuration</h3>
              <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-auto border border-gray-700">
                <pre className="text-green-400 text-sm font-mono leading-relaxed">
                  {JSON.stringify(jsonConfig, null, 2)}
                </pre>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Test Mapping</h3>
              <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-auto border border-gray-700">
                <pre className="text-green-400 text-sm font-mono leading-relaxed">
{`{
  "testMappings": [
    {
      "instrumentTestCode": "GLU",
      "testName": "Glucose",
      "labTestCode": "GLUCOSE_SERUM",
      "units": "mg/dL",
      "normalRange": "70-100"
    },
    {
      "instrumentTestCode": "CHOL",
      "testName": "Cholesterol",
      "labTestCode": "CHOLESTEROL_TOTAL",
      "units": "mg/dL",
      "normalRange": "<200"
    },
    {
      "instrumentTestCode": "TG",
      "testName": "Triglycerides",
      "labTestCode": "TRIGLYCERIDES",
      "units": "mg/dL",
      "normalRange": "<150"
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
        <div className="px-8 py-4 bg-gray-50 rounded-b-2xl flex justify-end space-x-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} className="text-gray-700 border-gray-400 rounded-md font-semibold px-6 py-2 hover:bg-gray-100">Cancel</Button>
          <Button onClick={onClose} className="bg-status-green hover:bg-green-700 text-white rounded-md font-semibold px-6 py-2 shadow">Update</Button>
        </div>
      </div>
    </div>
  );
};
