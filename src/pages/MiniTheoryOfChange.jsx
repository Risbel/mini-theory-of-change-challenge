import { TextareaCard } from "@/components/TextareaCard";
import { TagInputCard } from "@/components/TagInputCard";
import { TableCard } from "@/components/TableCard";
import React, { useState } from "react";
import ToCBoardCard from "@/components/ToCBoardCard";

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

  // Four Cards Data
  const [directOutcomes, setDirectOutcomes] = useState([
    {
      id: "direct-1",
      title: "Students enhance their digital skills",
      subOutcomes: [
        { id: "direct-sub-1", title: "Students learn to use productivity tools effectively" },
        { id: "direct-sub-2", title: "Students improve technical collaboration skills" },
      ],
    },
    {
      id: "direct-2",
      title: "Students incorporate resilience and wellbeing practices",
      subOutcomes: [],
    },
  ]);

  const [indirectOutcomes, setIndirectOutcomes] = useState([
    { id: "indirect-1", title: "internships to youth." },
    { id: "indirect-2", title: "Indirect outcome as an example" },
  ]);

  const [ultimateImpact, setUltimateImpact] = useState([
    { id: "ultimate-1", title: "higher youth engagement." },
    { id: "ultimate-2", title: "Employability rates increase across the region." },
  ]);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-primary">Theory of change</h1>
        <p className="text-muted-foreground">
          This is a mini theory of change. It is a tool that helps you to create a theory of change for your project.
        </p>
      </div>

      <TextareaCard value={reasonValue} onChange={setReasonValue} />
      <TagInputCard tags={peopleTags} onChange={setPeopleTags} />
      <TableCard assumptions={assumptions} onChange={setAssumptions} />
      <ToCBoardCard
        directOutcomes={directOutcomes}
        indirectOutcomes={indirectOutcomes}
        ultimateImpact={ultimateImpact}
        onDirectOutcomesChange={setDirectOutcomes}
        onIndirectOutcomesChange={setIndirectOutcomes}
        onUltimateImpactChange={setUltimateImpact}
      />
    </div>
  );
};

export default MiniTheoryOfChange;
