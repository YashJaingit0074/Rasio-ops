
import React, { useState } from 'react';
import Layout from './components/Layout';
import InventoryDashboard from './components/InventoryDashboard';
import VisionModule from './components/VisionModule';
import RecipeModule from './components/RecipeModule';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { MOCK_INVENTORY } from './constants';
import { InventoryItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [inventory, setInventory] = useState<InventoryItem[]>(MOCK_INVENTORY);

  const handleItemsDetected = (newItems: InventoryItem[]) => {
    setInventory(prev => [...newItems, ...prev]);
    setActiveTab('dashboard'); // Switch to dashboard to show added items
  };

  const handleDeleteItem = (id: string) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <InventoryDashboard items={inventory} onDeleteItem={handleDeleteItem} />;
      case 'vision':
        return <VisionModule onItemsDetected={handleItemsDetected} />;
      case 'rag':
        return <RecipeModule inventory={inventory} />;
      case 'analytics':
        return <AnalyticsDashboard />;
      default:
        return <InventoryDashboard items={inventory} onDeleteItem={handleDeleteItem} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
