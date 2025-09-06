import { useState } from 'react';
import { Diseases } from '../../rules/components/Diseases';
import { GameOverview } from '../../rules/components/GameOverview';
import { Players } from '../../rules/components/Players';

type TabType = 'overview' | 'players' | 'diseases';

export function Rules() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <GameOverview />;
      case 'players':
        return <Players />;
      case 'diseases':
        return <Diseases />;
      default:
        return <GameOverview />;
    }
  };

  return (
    <div className="max-h-[calc(100vh-120px)] overflow-y-auto p-5 bg-gray-800 rounded-lg m-5 text-white">
      <h1 className="text-white mb-5 text-center text-3xl font-bold">Pandemic Rules</h1>

      <div className="flex border-b-2 border-gray-600 mb-5">
        <button
          className={`px-6 py-3 border border-gray-600 border-b-0 cursor-pointer mr-1 rounded-t-lg font-medium transition-all duration-200 ${
            activeTab === 'overview' 
              ? 'bg-gray-800 border-b-2 border-gray-800 -mb-0.5 text-blue-400' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Game Overview
        </button>
        <button
          className={`px-6 py-3 border border-gray-600 border-b-0 cursor-pointer mr-1 rounded-t-lg font-medium transition-all duration-200 ${
            activeTab === 'players' 
              ? 'bg-gray-800 border-b-2 border-gray-800 -mb-0.5 text-blue-400' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
          }`}
          onClick={() => setActiveTab('players')}
        >
          Players
        </button>
        <button
          className={`px-6 py-3 border border-gray-600 border-b-0 cursor-pointer mr-1 rounded-t-lg font-medium transition-all duration-200 ${
            activeTab === 'diseases' 
              ? 'bg-gray-800 border-b-2 border-gray-800 -mb-0.5 text-blue-400' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
          }`}
          onClick={() => setActiveTab('diseases')}
        >
          Diseases
        </button>
      </div>

      <div className="min-h-96">{renderContent()}</div>
    </div>
  );
}
