import { useState, useRef } from "react";
import { XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const AddSubOutcomeInput = ({ onAddSubOutcome, onCancel }) => {
  const [newSubValue, setNewSubValue] = useState("");
  const inputRef = useRef(null);

  const handleAddSubOutcome = () => {
    if (newSubValue.trim()) {
      onAddSubOutcome(newSubValue.trim());
      setNewSubValue("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSubOutcome();
    } else if (e.key === "Escape") {
      setNewSubValue("");
      onCancel?.();
    }
  };

  return (
    <div className="p-2 bg-muted/10 border border-dashed rounded" onClick={(e) => e.stopPropagation()}>
      <div className="space-y-2">
        <Textarea
          rows={2}
          ref={inputRef}
          value={newSubValue}
          onChange={(e) => setNewSubValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
          autoFocus
          placeholder="Add sub-outcome..."
          style={{ lineHeight: "1.2", fontSize: "12px" }}
        />
        <div className="flex items-center gap-1 justify-end">
          <Button
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              handleAddSubOutcome();
            }}
            disabled={!newSubValue.trim()}
            className="text-xs h-6"
            title="Press Enter to add"
          >
            Add
          </Button>
          <Button
            size="icon"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setNewSubValue("");
              onCancel?.();
            }}
            className="size-6"
            title="Press Esc to close"
          >
            <XIcon className="size-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddSubOutcomeInput;
