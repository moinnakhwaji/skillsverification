import { useState } from "react";

export const SkillForm = ({ onSubmit }) => {
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState([]);

  const addSkill = () => {
    if (skill.trim() && !skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
    setSkill("");
  };

  return (
    <div className="p-5 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Enter Your Skills</h2>
      <div className="flex gap-2 my-3">
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="e.g., React, Python"
          className="p-2 rounded bg-gray-800 text-white border border-gray-700"
        />
        <button
          onClick={addSkill}
          className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          Add
        </button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {skills.map((s, index) => (
          <span key={index} className="px-3 py-1 bg-purple-800 text-sm rounded">
            {s}
          </span>
        ))}
      </div>

      <button
        onClick={() => onSubmit(skills)}
        className="mt-4 px-5 py-2 bg-green-600 rounded hover:bg-green-700"
      >
        Generate Questions
      </button>
    </div>
  );
};
