import { TextareaCard } from "@/components/TextareaCard";
import { TagInputCard } from "@/components/TagInputCard";
import React, { useState } from "react";

const MiniTheoryOfChange = () => {
  const [reasonValue, setReasonValue] = useState("");
  const [peopleTags, setPeopleTags] = useState(["Students"]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Theory of change</h1>
        <p className="text-muted-foreground">
          This is a mini theory of change. It is a tool that helps you to create a theory of change for your project.
        </p>
      </div>

      <TextareaCard value={reasonValue} onChange={setReasonValue} />
      <TagInputCard tags={peopleTags} onChange={setPeopleTags} />
    </div>
  );
};

export default MiniTheoryOfChange;
