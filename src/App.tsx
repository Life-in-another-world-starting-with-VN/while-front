// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import QuestionPage from "./pages/QuestionPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Quest" element={<QuestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
