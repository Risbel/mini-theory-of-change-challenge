import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import DropIndicator from "./DropIndicator";
import DraggableItem from "./DraggableItem";
import AddItemInput from "./AddItemInput";

const Column = ({ items = [], onItemsChange = () => {}, className = "", children }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dropPosition, setDropPosition] = useState(null);
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
          {/* Drop indicator */}
          {dropPosition === index && draggedItem !== index && <DropIndicator />}

          {/* Draggable item */}
          <DraggableItem
            item={item}
            index={index}
            isDragging={draggedItem === index}
            onDragStart={handleDragStart}
            children={children}
          />
        </div>
      ))}

      {/* Drop indicator at the end */}
      {dropPosition === items.length && <DropIndicator />}

      {/* Add item input - Jira style */}
      <AddItemInput onAddItem={handleAddItem} />
    </div>
  );
};

export default Column;
