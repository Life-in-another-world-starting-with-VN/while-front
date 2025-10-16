// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import MainPage from "./pages/MainPage";
import QuestionPage from "./pages/QuestionPage";
import EmotionPage from "./pages/EmotionPage";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Quest" element={<QuestionPage />} />
        <Route path="/emotion" element={<EmotionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
