import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

const AddItemInput = ({ onAddItem }) => {
  const [newItemValue, setNewItemValue] = useState("");
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  const handleAddItem = () => {
    if (newItemValue.trim()) {
      onAddItem(newItemValue.trim());
      setNewItemValue("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddItem();
    } else if (e.key === "Escape") {
      setNewItemValue("");
      setShowInput(false);
    }
  };

  return (
    <>
      {showInput ? (
        <div className="space-y-2 p-2 border rounded-lg bg-card">
          <textarea
            ref={inputRef}
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="What needs to be done?"
            rows={3}
            className="w-full text-xs p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
          />
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleAddItem}
              disabled={!newItemValue.trim()}
              className="text-xs h-7"
              title="Press Enter to add"
            >
              Add
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setShowInput(false);
                setNewItemValue("");
              }}
              className="text-xs h-7"
              title="Press Esc to close"
            >
              ✕
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className={cn(
            "w-full text-left p-2 rounded-lg text-xs text-muted-foreground",
            "hover:bg-muted/50 transition-colors flex items-center gap-2"
          )}
        >
          <PlusIcon className="size-3" />
          Create
        </button>
      )}
    </>
  );
};

export default AddItemInput;
