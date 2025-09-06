import { ReactNode } from 'react';

export interface TabItem<TabId extends string = string> {
  id: TabId;
  label: string;
  renderContent: () => ReactNode;
}

interface TabsProps<TabId extends string = string> {
  tabs: TabItem<TabId>[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
  className?: string;
}

const ACTIVE_TAB_CLASS = 'bg-gray-800 border-b-2 border-gray-800 -mb-0.5 text-blue-400';
const INACTIVE_TAB_CLASS = 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white';

export function Tabs<TabIds extends string = string>({
  tabs,
  activeTab,
  onTabChange,
  className = '',
}: TabsProps<TabIds>) {
  const activeContent = tabs.find((tab) => tab.id === activeTab)?.renderContent();

  return (
    <div className={className}>
      <div className="flex border-b-2 border-gray-600 mb-5">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`px-6 py-3 border border-gray-600 border-b-0 cursor-pointer ${
              index < tabs.length - 1 ? 'mr-1' : ''
            } rounded-t-lg font-medium transition-all duration-200 ${
              activeTab === tab.id ? ACTIVE_TAB_CLASS : INACTIVE_TAB_CLASS
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="min-h-96">{activeContent}</div>
    </div>
  );
}
