import { cn } from "@/lib/utils";

const DraggableItem = ({ item, index, isDragging, onDragStart, children }) => {
  return (
    <div
      data-item-index={index}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      className={cn(
        "p-2 py-2 border rounded-lg shadow-sm transition-all duration-200 cursor-move",
        "hover:shadow-md hover:border-primary/50",
        isDragging && "opacity-40"
      )}
    >
      {children ? (
        children(item, index)
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-xs">{item.title}</span>
        </div>
      )}
    </div>
  );
};

export default DraggableItem;
