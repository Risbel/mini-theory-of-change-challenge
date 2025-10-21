import { useContext } from "react";
import { TheoryOfChangeContext } from "@/contexts/theoryOfChangeContext";

export const useTheoryOfChangeContext = () => {
  const context = useContext(TheoryOfChangeContext);
  if (!context) {
    throw new Error("useTheoryOfChange must be used within TheoryOfChangeProvider");
  }
  return context;
};
