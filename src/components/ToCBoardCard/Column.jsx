import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import DropIndicator from "./DropIndicator";
import DraggableItem from "./DraggableItem";
import AddItemInput from "./AddItemInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";

const Column = ({ items = [], onItemsChange = () => {}, className = "", allowSubOutcomes = false, children }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropPosition, setDropPosition] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [editingSubOutcome, setEditingSubOutcome] = useState(null);
  const [editingSubValue, setEditingSubValue] = useState("");
  const columnRef = useRef(null);

  const handleDragStart = (e, index) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    if (draggedItem === null) return;

    const column = columnRef.current;
    if (!column) return;

    const mouseY = e.clientY;

    // Get all item elements
    const itemElements = column.querySelectorAll("[data-item-index]");

    let newDropPosition = items.length; // Default to end

    for (let i = 0; i < itemElements.length; i++) {
      const itemRect = itemElements[i].getBoundingClientRect();
      const itemMiddle = itemRect.top + itemRect.height / 2;

      if (mouseY < itemMiddle) {
        newDropPosition = i;
        break;
      }
    }

    setDropPosition(newDropPosition);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (draggedItem === null || dropPosition === null) {
      resetDragState();
      return;
    }

    // Reorder items
    const newItems = [...items];
    const [movedItem] = newItems.splice(draggedItem, 1);

    // Adjust drop position if dragging downwards
    const adjustedPosition = draggedItem < dropPosition ? dropPosition - 1 : dropPosition;
    newItems.splice(adjustedPosition, 0, movedItem);

    onItemsChange(newItems);
    resetDragState();
  };

  const handleDragLeave = (e) => {
    if (!columnRef.current?.contains(e.relatedTarget)) {
      setDropPosition(null);
    }
  };

  const resetDragState = () => {
    setDraggedItem(null);
    setDropPosition(null);
  };

  const handleAddItem = (title) => {
    const newItem = {
      id: `item-${Date.now()}`,
      title,
    };
    onItemsChange([...items, newItem]);
  };

  const handleEditItem = (item, index) => {
    setEditingItem(index);
    setEditingValue(item.title);
  };

  const handleSaveEdit = () => {
    if (editingValue.trim() && editingItem !== null) {
      const updatedItems = items.map((item, index) =>
        index === editingItem ? { ...item, title: editingValue.trim() } : item
      );
      onItemsChange(updatedItems);
      setEditingItem(null);
      setEditingValue("");
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setEditingValue("");
  };

  const handleDeleteItem = (item, index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    onItemsChange(updatedItems);
  };

  const handleEditSubOutcome = (subOutcome, subIndex, parentIndex) => {
    setEditingSubOutcome({ subIndex, parentIndex });
    setEditingSubValue(subOutcome.title);
  };

  const handleSaveSubEdit = () => {
    if (editingSubValue.trim() && editingSubOutcome) {
      const { subIndex, parentIndex } = editingSubOutcome;
      const updatedItems = items.map((item, index) => {
        if (index === parentIndex) {
          const updatedSubOutcomes = item.subOutcomes.map((sub, i) =>
            i === subIndex ? { ...sub, title: editingSubValue.trim() } : sub
          );
          return { ...item, subOutcomes: updatedSubOutcomes };
        }
        return item;
      });
      onItemsChange(updatedItems);
      setEditingSubOutcome(null);
      setEditingSubValue("");
    }
  };

  const handleCancelSubEdit = () => {
    setEditingSubOutcome(null);
    setEditingSubValue("");
  };

  const handleDeleteSubOutcome = (subOutcome, subIndex, parentIndex) => {
    const updatedItems = items.map((item, index) => {
      if (index === parentIndex) {
        const updatedSubOutcomes = item.subOutcomes.filter((_, i) => i !== subIndex);
        return { ...item, subOutcomes: updatedSubOutcomes };
      }
      return item;
    });
    onItemsChange(updatedItems);
  };

  const handleAddSubOutcome = (title, parentIndex) => {
    const newSubOutcome = {
      id: `sub-${Date.now()}`,
      title,
    };

    const updatedItems = items.map((item, index) => {
      if (index === parentIndex) {
        const updatedSubOutcomes = [...(item.subOutcomes || []), newSubOutcome];
        return { ...item, subOutcomes: updatedSubOutcomes };
      }
      return item;
    });
    onItemsChange(updatedItems);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleSubKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveSubEdit();
    } else if (e.key === "Escape") {
      handleCancelSubEdit();
    }
  };

  return (
    <div
      ref={columnRef}
      className={cn("space-y-1", className)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragLeave={handleDragLeave}
      onDragEnd={resetDragState}
    >
      {items.map((item, index) => (
        <div key={item.id || index}>
          {dropPosition === index && draggedItem !== index && <DropIndicator />}

          {editingItem === index ? (
            <div className="p-2 border rounded-lg shadow-sm bg-background" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start gap-1">
                <Textarea
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                  style={{ lineHeight: "1.2", fontSize: "12px" }}
                />

                <Button
                  size="icon"
                  className="size-5"
                  variant="outline"
                  title="Cancel editing"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelEdit();
                  }}
                >
                  <XIcon className="size-3" />
                </Button>
              </div>
            </div>
          ) : (
            <DraggableItem
              item={item}
              index={index}
              isDragging={draggedItem === index}
              onDragStart={handleDragStart}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              onEditSubOutcome={handleEditSubOutcome}
              onDeleteSubOutcome={handleDeleteSubOutcome}
              onAddSubOutcome={handleAddSubOutcome}
              editingSubOutcome={editingSubOutcome}
              editingSubValue={editingSubValue}
              setEditingSubValue={setEditingSubValue}
              handleSaveSubEdit={handleSaveSubEdit}
              handleCancelSubEdit={handleCancelSubEdit}
              handleSubKeyDown={handleSubKeyDown}
              allowSubOutcomes={allowSubOutcomes}
              children={children}
            />
          )}
        </div>
      ))}

      {dropPosition === items.length && <DropIndicator />}

      <AddItemInput onAddItem={handleAddItem} />
    </div>
  );
};

export default Column;
