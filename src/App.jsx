import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import QuizPage from "./pages/QuizPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/:id" element={<QuizPage />} />
    </Routes>
  );
};

export default App;