import { useState } from "react";
import { SkillForm } from "./components/SkillForm";
import { QuestionDisplay } from "./components/QuestionDisplay";


 const App = () => {
  const [skills, setSkills] = useState([]);
console.log(import.meta.env.API_key)
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-10">
      <SkillForm onSubmit={setSkills} />
      {skills.length > 0 && <QuestionDisplay skills={skills} />}
    </div>
  );
};

export default App