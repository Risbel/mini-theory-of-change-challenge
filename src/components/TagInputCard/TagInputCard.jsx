import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTheoryOfChangeContext } from "@/hooks/useTheoryOfChangeContext";
import { ACTIONS } from "@/constants/actionTypes";

const TagInputCard = ({ className = "" }) => {
  const { state, dispatch } = useTheoryOfChangeContext();
  const { peopleTags: tags } = state;
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      e.preventDefault();
      removeLastTag();
    }
  };

  const addTag = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue && !isDuplicate(trimmedValue)) {
      const newTags = [...tags, trimmedValue];
      dispatch({ type: ACTIONS.SET_PEOPLE_TAGS, payload: newTags });
      setInputValue("");
    }
  };

  const removeTag = (indexToRemove) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    dispatch({ type: ACTIONS.SET_PEOPLE_TAGS, payload: newTags });
  };

  const removeLastTag = () => {
    if (tags.length > 0) {
      const newTags = tags.slice(0, -1);
      dispatch({ type: ACTIONS.SET_PEOPLE_TAGS, payload: newTags });
    }
  };

  const isDuplicate = (value) => {
    return tags.some((tag) => tag.toLowerCase() === value.toLowerCase());
  };

  return (
    <Card className={className}>
      <CardContent className="space-y-3">
        <label htmlFor="people-tags-input" className="block text-sm font-medium text-foreground">
          The people we serve
        </label>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-1 hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${tag} tag`}
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <Input
          id="people-tags-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type and press Enter to add..."
          className="w-full"
        />
      </CardContent>
    </Card>
  );
};

export default TagInputCard;
