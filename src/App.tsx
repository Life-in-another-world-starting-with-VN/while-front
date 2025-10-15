
import React, { useState } from 'react';
import Settings from './pages/Settings';
import LoadGame from './pages/LoadGame';
import type { PageType } from './types/navigation';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionPage from "./pages/QuestionPage";
import RegisterPage from "./pages/Auth/Register";
import LoginPage from "./pages/Auth/Login";
import MainPage from "./pages/MainPage";
import GamePage from "./pages/GamePage";
import { GlobalStyles } from './styles';


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
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Game" element={<GamePage />} />
        <Route path="/Settings" element={<Settings onNavigate={handleNavigate} />} />
        <Route path="/LoadGame" element={<LoadGame onNavigate={handleNavigate} />} />
      </Routes>
      <GlobalStyles />
      {/* {renderCurrentPage()} */}
    </Router>
  );
}

export default App;
