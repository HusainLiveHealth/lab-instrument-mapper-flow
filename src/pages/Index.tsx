
import { useState } from 'react';
import { InstrumentList } from '@/components/InstrumentList';
import { TestMappingScreen } from '@/components/TestMappingScreen';
import { ParameterMappingScreen } from '@/components/ParameterMappingScreen';
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { EditSettingsModal } from '@/components/EditSettingsModal';

export type Screen = 'instruments' | 'testMapping' | 'parameterMapping';

export interface Instrument {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
  department: string;
  machineName: string;
  location: string;
  testCount: number;
}

export interface Test {
  id: string;
  name: string;
  code: string;
  parameterMapped: string[];
  status: 'connected' | 'partial' | 'error';
}

export interface Parameter {
  id: string;
  name: string;
  code: string;
  serverName: string;
  status: 'connected' | 'partial';
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('instruments');
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument | null>(null);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingInstrument, setEditingInstrument] = useState<Instrument | null>(null);

  const handleInstrumentClick = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    setCurrentScreen('testMapping');
  };

  const handleTestClick = (test: Test) => {
    setSelectedTest(test);
    setCurrentScreen('parameterMapping');
  };

  const handleBackToInstruments = () => {
    setCurrentScreen('instruments');
    setSelectedInstrument(null);
    setSelectedTest(null);
  };

  const handleBackToTests = () => {
    setCurrentScreen('testMapping');
    setSelectedTest(null);
  };

  const handleEditSettings = (instrument: Instrument) => {
    setEditingInstrument(instrument);
    setShowEditModal(true);
  };

  const renderContent = () => {
    switch (currentScreen) {
      case 'instruments':
        return (
          <InstrumentList 
            onInstrumentClick={handleInstrumentClick}
            onEditSettings={handleEditSettings}
          />
        );
      case 'testMapping':
        return (
          <TestMappingScreen
            instrument={selectedInstrument!}
            onTestClick={handleTestClick}
            onBack={handleBackToInstruments}
          />
        );
      case 'parameterMapping':
        return (
          <ParameterMappingScreen
            test={selectedTest!}
            onBack={handleBackToTests}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-gray-50">
      <Sidebar currentScreen={currentScreen} />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
      
      {showEditModal && editingInstrument && (
        <EditSettingsModal
          instrument={editingInstrument}
          onClose={() => {
            setShowEditModal(false);
            setEditingInstrument(null);
          }}
        />
      )}
    </div>
  );
};

export default Index;
