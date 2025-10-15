// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalStyles } from "./styles/globalStyles";
import QuestionPage from "./pages/QuestionPage";
import RegisterPage from "./pages/Auth/Register";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Quest" element={<QuestionPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
