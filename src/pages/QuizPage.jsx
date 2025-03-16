import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://6aef51beb5e45cff.mokky.dev/quiz";

const QuizPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setQuizzes(data);

      const currentQuiz = data.find((q) => q.id === parseInt(id));
      setQuiz(currentQuiz);
    };
    fetchQuiz();
  }, [id]);

  const handleAnswer = (index, isCorrect) => {
    setSelected(index);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuiz = () => {
    const currentIndex = quizzes.findIndex((q) => q.id === parseInt(id));
    if (currentIndex !== -1 && currentIndex + 1 < quizzes.length) {
      navigate(`/quiz/${quizzes[currentIndex + 1].id}`);
      setSelected(null);
    } else {
      alert(`Quiz Finished! Your Score: ${score}`);
      navigate("/");
    }
  };

  if (!quiz) return <div className="text-center mt-10">Loading...</div>;

  const currentIndex = quizzes.findIndex((q) => q.id === parseInt(id)) + 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-sm font-semibold text-gray-500 mb-2"> #{id}</h1>
      <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
        {quiz.question}
      </h2>

      <div className="w-full max-w-lg">
        {quiz.answers.map((answer, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-4 my-2 rounded-lg border 
              ${
                selected === index
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-700 border-gray-300"
              } 
              hover:shadow-lg cursor-pointer transition`}
            onClick={() => handleAnswer(index, answer.isCorrect)}
          >
            <span className="text-lg font-semibold">{String.fromCharCode(65 + index)}</span>
            <span className="text-lg font-medium">{answer.text}</span>
          </div>
        ))}
      </div>

      <div className="w-full max-w-lg mt-4 flex items-center justify-between">
        <div className="w-full bg-gray-300 h-2 rounded-md overflow-hidden">
          <div
            className="bg-green-500 h-2"
            style={{ width: `${(currentIndex / quizzes.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <button
        className={`mt-6 px-6 py-3 rounded-lg font-bold w-full max-w-lg 
          ${selected !== null ? "bg-blue-600 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
        onClick={nextQuiz}
        disabled={selected === null}
      >
        Continue
      </button>
    </div>
  );
};

export default QuizPage;
