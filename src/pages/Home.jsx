import React from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://6aef51beb5e45cff.mokky.dev/quiz";

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = async () => {
    const response = await fetch(API_URL);
    const quizzes = await response.json();
    if (quizzes.length > 0) {
      navigate(`/quiz/${quizzes[0].id}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Quiz App</h1>
      <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={startQuiz}>
        Start Quiz
      </button>
    </div>
  );
};

export default Home;