import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Settings from './pages/Settings';
import LoadGame from './pages/LoadGame';
import QuestionPage from "./pages/QuestionPage";
import RegisterPage from "./pages/Auth/Register";
import LoginPage from "./pages/Auth/Login";
import MainPage from "./pages/MainPage";
import GamePage from "./pages/GamePage";
import { GlobalStyles } from './styles';
import React from 'react';

const App: React.FC = () => {
  return (
    <Router>
      <GlobalStyles />
      <AppRoutes />
    </Router>
  );
};

const AppRoutes: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (pageType: string) => {
    console.log(`Navigating to: ${pageType}`);
    switch (pageType) {
      case 'mainMenu':
        navigate('/');
        break;
      case 'settings':
        navigate('/Settings');
        break;
      case 'loadGame':
        navigate('/LoadGame');
        break;
      case 'game':
        navigate('/Game');
        break;
      default:
        console.warn(`Unknown pageType: ${pageType}`);
    }
  };

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/Quest" element={<QuestionPage />} />
      <Route path="/Settings" element={<Settings onNavigate={handleNavigate} />} />
      <Route path="/LoadGame" element={<LoadGame onNavigate={handleNavigate} />} />
      <Route path="/StartGame" element={<GamePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/Game" element={<GamePage />} />
    </Routes>
  );
};

export default App;
