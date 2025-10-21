import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { PlusIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

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
          <Textarea
            rows={3}
            ref={inputRef}
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="What needs to be done?"
            style={{ lineHeight: "1.2", fontSize: "12px" }}
          />
          <div className="flex items-center gap-1 justify-end">
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
              size="icon"
              variant="outline"
              onClick={() => {
                setShowInput(false);
                setNewItemValue("");
              }}
              className="size-7"
              title="Press Esc to close"
            >
              <XIcon className="size-3" />
            </Button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          className={cn(
            "w-full text-left p-2 rounded-lg cursor-pointer text-xs text-muted-foreground mb-24",
            "hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2"
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
