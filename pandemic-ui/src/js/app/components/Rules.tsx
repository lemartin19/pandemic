import { useState } from 'react';
import { Diseases } from '../../rules/components/Diseases';
import { GameOverview } from '../../rules/components/GameOverview';
import { Players } from '../../rules/components/Players';
import { Tabs, TabItem } from '../../components/Tabs';

type RulesTabs = 'overview' | 'players' | 'diseases';

const TABS: TabItem<RulesTabs>[] = [
  {
    id: 'overview',
    label: 'Game Overview',
    renderContent: () => <GameOverview />,
  },
  {
    id: 'players',
    label: 'Players',
    renderContent: () => <Players />,
  },
  {
    id: 'diseases',
    label: 'Diseases',
    renderContent: () => <Diseases />,
  },
];

export function Rules() {
  const [activeTab, setActiveTab] = useState<RulesTabs>('overview');

  return (
    <div className="max-h-[calc(100vh-120px)] overflow-y-auto p-5">
      <h1 className="text-center text-3xl font-bold mb-6">Pandemic Rules</h1>
      <Tabs<RulesTabs> tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
