import Settings from './pages/Settings';
import LoadGame from './pages/LoadGame';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuestionPage from "./pages/QuestionPage";
import MainPage from "./pages/MainPage";
import{ GlobalStyles }from './styles/GlobalStyles';
import GamePage from './pages/GamePage';

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
      </Routes>

      {/* {renderCurrentPage()} */}
    </Router>
  );
}

export default App;
