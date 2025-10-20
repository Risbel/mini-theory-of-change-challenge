import { TextareaCard } from "@/components/TextareaCard";
import { TagInputCard } from "@/components/TagInputCard";
import { TableCard } from "@/components/TableCard";
import React, { useState } from "react";

const MiniTheoryOfChange = () => {
  const [reasonValue, setReasonValue] = useState("");
  const [peopleTags, setPeopleTags] = useState(["Students"]);
  const [assumptions, setAssumptions] = useState([
    {
      id: "1",
      description: "Students are interested in acquiring new digital skills.",
      certainty: "very",
    },
    {
      id: "2",
      description: "Assumption 1",
      certainty: "moderate",
    },
    {
      id: "3",
      description: "Assumption 2",
      certainty: "uncertain",
    },
  ]);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Theory of change</h1>
        <p className="text-muted-foreground">
          This is a mini theory of change. It is a tool that helps you to create a theory of change for your project.
        </p>
      </div>

      <TextareaCard value={reasonValue} onChange={setReasonValue} />
      <TagInputCard tags={peopleTags} onChange={setPeopleTags} />
      <TableCard assumptions={assumptions} onChange={setAssumptions} />
    </div>
  );
};

export default MiniTheoryOfChange;
