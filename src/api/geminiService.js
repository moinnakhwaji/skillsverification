import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const getQuestions = async (skills) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Ask 5 technical questions related to these skills: ${skills.join(", ")}.`;

    const result = await model.generateContent(prompt);
    return result.response.text().split("\n").filter(q => q.trim());
  } catch (error) {
    console.error("Error fetching questions:", error);
    return ["Error fetching questions. Please try again later."];
  }
};

export const getRating = async (question, answer) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Evaluate the following answer on a scale of 1 to 5, where 5 is excellent and 1 is poor. Provide only the rating as a number.\n\nQuestion: ${question}\nAnswer: ${answer}\nRating:`;

    const result = await model.generateContent(prompt);
    const rating = parseInt(result.response.text().trim(), 10);

    return isNaN(rating) ? "N/A" : rating;
  } catch (error) {
    console.error("Error fetching rating:", error);
    return "N/A";
  }
};
