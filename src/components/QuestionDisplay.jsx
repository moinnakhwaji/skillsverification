import { useState, useEffect } from "react";
import { getQuestions, getRating } from "../api/geminiService";

export const QuestionDisplay = ({ skills }) => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [ratings, setRatings] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [summaryIndex, setSummaryIndex] = useState(0); // Controls which question is shown in summary

  useEffect(() => {
    if (skills.length > 0) {
      getQuestions(skills).then(setQuestions);
    }
  }, [skills]);

  const handleAnswerChange = (e) => {
    setAnswers((prev) => ({ ...prev, [currentIndex]: e.target.value }));
  };

  const handleSubmit = async () => {
    const answer = answers[currentIndex];
    if (!answer) return;

    try {
      const rating = await getRating(questions[currentIndex], answer);
      setRatings((prev) => ({ ...prev, [currentIndex]: rating }));
    } catch (error) {
      console.error("Error getting rating:", error);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowSummary(true);
    }
  };

  const handleNextSummary = () => {
    if (summaryIndex + 1 < questions.length) {
      setSummaryIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="p-5 bg-gray-900 text-white rounded-lg shadow-md mt-5">
      {!showSummary ? (
        <>
          <h2 className="text-xl font-semibold">Question {currentIndex + 1}</h2>
          <p className="mt-3 font-medium">{questions[currentIndex]}</p>
          <input
            type="text"
            placeholder="Type your answer..."
            value={answers[currentIndex] || ""}
            onChange={handleAnswerChange}
            className="mt-3 p-2 w-full bg-gray-700 rounded text-white"
          />
          <button
            onClick={handleSubmit}
            className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
          >
            Submit
          </button>
        </>
      ) : (
        <div>
          <h2 className="text-xl font-semibold">Summary</h2>
          <div className="mt-3 p-4 bg-gray-800 rounded">
            <p className="font-medium">Question: {questions[summaryIndex]}</p>
            <p className="text-green-400">Your Answer: {answers[summaryIndex]}</p>
            <p className="text-blue-400">Rating: {ratings[summaryIndex]?.rating}</p>
            <p className="text-yellow-400">Suggestion: {ratings[summaryIndex]?.suggestion}</p>
          </div>

          {summaryIndex + 1 < questions.length && (
            <button
              onClick={handleNextSummary}
              className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};
