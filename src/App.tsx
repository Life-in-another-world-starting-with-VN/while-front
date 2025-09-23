import React, { useState } from 'react';
import { GlobalStyles } from './styles';
import Settings from './pages/Settings';
import LoadGame from './pages/LoadGame';
import type { PageType } from './types/navigation';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import QuestionPage from "./pages/QuestionPage";
import MainPage from "./pages/MainPage";


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
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Quest" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
