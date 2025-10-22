import { MoreVerticalIcon, Trash2Icon, Edit2Icon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { XIcon } from "lucide-react";

const SubOutcomeItem = ({
  subOutcome,
  subIndex,
  parentIndex,
  isEditing,
  editingValue,
  onEdit,
  onDelete,
  onCancelEdit,
  onKeyDown,
  onValueChange,
}) => {
  return (
    <div>
      {isEditing ? (
        <div className="p-2 bg-background border" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start gap-1">
            <Textarea
              value={editingValue}
              onChange={(e) => {
                e.stopPropagation();
                onValueChange(e.target.value);
              }}
              onKeyDown={(e) => {
                e.stopPropagation();
                onKeyDown?.(e);
              }}
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
                onCancelEdit();
              }}
            >
              <XIcon className="size-3" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-2 bg-background border rounded-lg text-xs hover:border-primary/50 transition-colors">
          <div className="flex items-start gap-2">
            <div className="flex-1 min-w-0">
              <span className="text-xs leading-relaxed">{subOutcome.title}</span>
            </div>
            <div className="shrink-0">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="md:opacity-0 md:group-hover:opacity-100 transition-opacity size-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVerticalIcon className="size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit?.(subOutcome, subIndex, parentIndex);
                    }}
                    className="cursor-pointer"
                  >
                    <Edit2Icon className="size-3" />
                    <span className="text-xs">Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(subOutcome, subIndex, parentIndex);
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
        </div>
      )}
    </div>
  );
};

export default SubOutcomeItem;
