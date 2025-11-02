import { useState } from "react";
import { cn } from "@/lib/utils";
import { MoreVerticalIcon, Trash2Icon, Edit2Icon, ChevronRightIcon, PlusIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import SubOutcomeItem from "./SubOutcomeItem";
import AddSubOutcomeInput from "./AddSubOutcomeInput";

const DraggableItem = ({
  item,
  index,
  isDragging,
  onDragStart,
  onEdit,
  onDelete,
  onEditSubOutcome,
  onDeleteSubOutcome,
  onAddSubOutcome,
  editingSubOutcome,
  editingSubValue,
  setEditingSubValue,
  handleSaveSubEdit,
  handleCancelSubEdit,
  handleSubKeyDown,
  allowSubOutcomes = false,
  children,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAddSubInput, setShowAddSubInput] = useState(false);
  const hasSubOutcomes = allowSubOutcomes && item.subOutcomes && item.subOutcomes.length > 0;

  return (
    <div
      data-item-index={index}
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onClick={() => allowSubOutcomes && setIsExpanded(!isExpanded)}
      className={cn(
        "group border rounded-lg overflow-hidden shadow-sm transition-all duration-200 cursor-move",
        "hover:shadow-md hover:border-primary/50 cursor-pointer group select-none",
        isDragging && "opacity-40 select-none"
      )}
    >
      {/* Main Item */}
      <div className="p-2 py-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {allowSubOutcomes && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                <ChevronRightIcon
                  className={cn(
                    "size-4 transition-transform duration-200 text-muted-foreground",
                    isExpanded ? "rotate-90" : ""
                  )}
                />
              </button>
            )}
            <div className="flex-1 min-w-0 leading-3">
              {children ? children(item, index) : <span className="text-xs">{item.title}</span>}
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                className={cn("lg:opacity-0 lg:group-hover:opacity-100", "size-6")}
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

      {/* SubOutcomes */}
      {allowSubOutcomes && isExpanded && (
        <div className="border-t bg-muted/20">
          <div className="p-2 space-y-1 hover:bg-muted/50 transition-colors">
            {/* Existing SubOutcomes */}
            {hasSubOutcomes &&
              item.subOutcomes.map((subOutcome, subIndex) => {
                const isEditing = editingSubOutcome?.subIndex === subIndex && editingSubOutcome?.parentIndex === index;

                return (
                  <SubOutcomeItem
                    key={subOutcome.id}
                    subOutcome={subOutcome}
                    subIndex={subIndex}
                    parentIndex={index}
                    isEditing={isEditing}
                    editingValue={editingSubValue}
                    onEdit={onEditSubOutcome}
                    onDelete={onDeleteSubOutcome}
                    onSaveEdit={handleSaveSubEdit}
                    onCancelEdit={handleCancelSubEdit}
                    onKeyDown={handleSubKeyDown}
                    onValueChange={setEditingSubValue}
                  />
                );
              })}

            {/* Add SubOutcome Input */}
            {showAddSubInput ? (
              <AddSubOutcomeInput
                onAddSubOutcome={(title) => {
                  onAddSubOutcome?.(title, index);
                  setShowAddSubInput(false);
                }}
                onCancel={() => setShowAddSubInput(false)}
              />
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAddSubInput(true);
                }}
                className={cn(
                  "w-full text-left p-2 rounded-lg cursor-pointer text-xs text-muted-foreground",
                  "hover:bg-primary/10 hover:text-primary transition-colors flex items-center gap-2"
                )}
              >
                <PlusIcon className="size-3" />
                Create
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DraggableItem;
