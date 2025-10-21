import { cn } from "@/lib/utils";
import { MoreVerticalIcon, Trash2Icon, Edit2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

const DraggableItem = ({ item, index, isDragging, onDragStart, onEdit, onDelete, children }) => {
  return (
    <div
      data-item-index={index}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      className={cn(
        "group p-2 py-2 border rounded-lg shadow-sm transition-all duration-200 cursor-move",
        "hover:shadow-md hover:border-primary/50 cursor-pointer group",
        isDragging && "opacity-40"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0 leading-3">
          {children ? children(item, index) : <span className="text-xs">{item.title}</span>}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className={cn("opacity-0 group-hover:opacity-100", "size-6")}
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVerticalIcon className="size-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(item, index);
              }}
              className="cursor-pointer"
            >
              <Edit2Icon className="size-3" />
              <span className="text-xs">Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(item, index);
              }}
              className="cursor-pointer"
            >
              <Trash2Icon className="size-3" />
              <span className="text-xs">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DraggableItem;
