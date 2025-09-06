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
    <div className="Rules">
      <h1>Pandemic Rules</h1>

      <div className="Rules-tabs">
        <button
          className={`Rules-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Game Overview
        </button>
        <button
          className={`Rules-tab ${activeTab === 'players' ? 'active' : ''}`}
          onClick={() => setActiveTab('players')}
        >
          Players
        </button>
        <button
          className={`Rules-tab ${activeTab === 'diseases' ? 'active' : ''}`}
          onClick={() => setActiveTab('diseases')}
        >
          Diseases
        </button>
      </div>

      <div className="Rules-content">{renderContent()}</div>
    </div>
  );
}
