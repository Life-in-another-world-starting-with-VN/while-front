import Settings from './pages/Settings';
import LoadGame from './pages/LoadGame';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionPage from "./pages/QuestionPage";
import RegisterPage from "./pages/Auth/Register";
import LoginPage from "./pages/Auth/Login";
import MainPage from "./pages/MainPage";
import GamePage from "./pages/GamePage";
import { GlobalStyles } from './styles';

function App() {


  return (
    
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Quest" element={<QuestionPage />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/LoadGame" element={<LoadGame/>} />
        <Route path="/StartGame" element={<GamePage  />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Game" element={<GamePage />} />
        <Route path="/Settings" element={<Settings onNavigate={handleNavigate} />} />
        <Route path="/LoadGame" element={<LoadGame onNavigate={handleNavigate} />} />
      </Routes>
    </Router>
  );
}

export default App;
