import { useReducer } from "react";
import { TheoryOfChangeContext } from "./theoryOfChangeContext";
import { ACTIONS } from "@/constants/actionTypes";

const initialState = {
  reasonValue: "",
  peopleTags: ["Students"],
  assumptions: [
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
  ],
  directOutcomes: [
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
  ],
  indirectOutcomes: [
    { id: "indirect-1", title: "internships to youth." },
    { id: "indirect-2", title: "Indirect outcome as an example" },
  ],
  ultimateImpact: [
    { id: "ultimate-1", title: "higher youth engagement." },
    { id: "ultimate-2", title: "Employability rates increase across the region." },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_REASON:
      return { ...state, reasonValue: action.payload };
    case ACTIONS.SET_PEOPLE_TAGS:
      return { ...state, peopleTags: action.payload };
    case ACTIONS.SET_ASSUMPTIONS:
      return { ...state, assumptions: action.payload };
    case ACTIONS.SET_DIRECT_OUTCOMES:
      return { ...state, directOutcomes: action.payload };
    case ACTIONS.SET_INDIRECT_OUTCOMES:
      return { ...state, indirectOutcomes: action.payload };
    case ACTIONS.SET_ULTIMATE_IMPACT:
      return { ...state, ultimateImpact: action.payload };
    default:
      return state;
  }
};

const TheoryOfChangeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <TheoryOfChangeContext.Provider value={{ state, dispatch }}>{children}</TheoryOfChangeContext.Provider>;
};

export default TheoryOfChangeProvider;
