import { useReducer } from "react";
import { TheoryOfChangeContext } from "./theoryOfChangeContext";
import { ACTIONS } from "@/constants/actionTypes";

const emptyState = {
  reasonValue: "",
  peopleTags: [],
  assumptions: [],
  directOutcomes: [],
  indirectOutcomes: [],
  ultimateImpact: [],
};

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
        { id: "direct-sub-3", title: "Students master data analysis and visualization techniques" },
        { id: "direct-sub-4", title: "Students develop coding and programming competencies" },
      ],
    },
    {
      id: "direct-2",
      title: "Students incorporate resilience and wellbeing practices",
      subOutcomes: [],
    },
    {
      id: "direct-3",
      title: "Students develop a sense of community and belonging",
      subOutcomes: [
        { id: "direct-sub-14", title: "Students form meaningful peer relationships and networks" },
        { id: "direct-sub-15", title: "Students participate in collaborative group projects" },
      ],
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
    case ACTIONS.RESET_ALL:
      return emptyState;
    default:
      return state;
  }
};

const TheoryOfChangeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <TheoryOfChangeContext.Provider value={{ state, dispatch }}>{children}</TheoryOfChangeContext.Provider>;
};

export default TheoryOfChangeProvider;
