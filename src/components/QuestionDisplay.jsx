import { useState, useEffect } from "react";
import { getQuestions, getRating } from "../api/geminiService";

export const QuestionDisplay = ({ skills }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    if (skills.length > 0) {
      getQuestions(skills).then(setQuestions);
    }
  }, [skills]);

  const handleAnswerChange = (index, value) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };

  const handleSubmit = async (index) => {
    const answer = answers[index];
    if (!answer) return;

    try {
      const rating = await getRating(questions[index], answer);
      setRatings((prev) => ({ ...prev, [index]: rating }));
    } catch (error) {
      console.error("Error getting rating:", error);
    }
  };

  return (
    <div className="p-5 bg-gray-900 text-white rounded-lg shadow-md mt-5">
      <h2 className="text-xl font-semibold">AI-Generated Questions</h2>
      <ul className="mt-3 space-y-4">
        {questions.map((q, index) => (
          <li key={index} className="p-4 bg-gray-800 rounded">
            <p className="font-medium">{q}</p>
            <input
              type="text"
              placeholder="Type your answer..."
              value={answers[index] || ""}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="mt-2 p-2 w-full bg-gray-700 rounded text-white"
            />
            <button
              onClick={() => handleSubmit(index)}
              className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
            >
              Submit
            </button>
            {ratings[index] !== undefined && (
              <p className="mt-2 text-green-400">Rating: {ratings[index]}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
