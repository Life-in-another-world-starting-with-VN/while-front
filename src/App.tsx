import React, { useState } from 'react';
import { GlobalStyles } from './styles';
import Settings from './pages/Settings';
import LoadGame from './pages/LoadGame';
import type { PageType } from './types/navigation';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('settings');

  const handleNavigate = (pageType: PageType) => {
    setCurrentPage(pageType);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'settings':
        return <Settings onNavigate={handleNavigate} />;
      case 'loadGame':
        return <LoadGame onNavigate={handleNavigate} />;
      default:
        return <Settings onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <GlobalStyles />
      {renderCurrentPage()}
    </>
  );
}

export default App;
