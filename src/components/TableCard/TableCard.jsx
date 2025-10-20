import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon, CircleIcon, Edit2Icon, PlusIcon, Trash2Icon, XIcon } from "lucide-react";

const CERTAINTY_OPTIONS = [
  {
    value: "very",
    label: "Very certain",
    color: "text-green-500 fill-green-500/20",
    borderColor: "border-green-300 border-2",
  },
  {
    value: "moderate",
    label: "Moderately certain",
    color: "text-yellow-500 fill-yellow-500/20",
    borderColor: "border-yellow-300 border-2",
  },
  {
    value: "uncertain",
    label: "Uncertain",
    color: "text-red-500 fill-red-500/20",
    borderColor: "border-red-300 border-2",
  },
];

export default function TableCard({
  title = "What we believe to be true",
  assumptions = [],
  onChange = () => {},
  className = "",
}) {
  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newCertainty, setNewCertainty] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const editingInputRef = useRef(null);
  const newInputRef = useRef(null);

  const totalPages = Math.ceil(assumptions.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentAssumptions = assumptions.slice(startIndex, endIndex);

  const getCertaintyBorderColor = (value) => {
    const option = CERTAINTY_OPTIONS.find((opt) => opt.value === value);
    return option ? option.borderColor : "border-gray-300";
  };

  const handleAddAssumption = () => {
    if (newDescription.trim() && newCertainty) {
      const newAssumption = {
        id: Date.now().toString(),
        description: newDescription.trim(),
        certainty: newCertainty,
      };
      onChange([...assumptions, newAssumption]);
      setNewDescription("");
      setNewCertainty("");
      newInputRef.current?.focus();
    }
  };

  const handleEditStart = (assumption) => {
    setEditingId(assumption.id);
    setEditingValue(assumption.description);
    setTimeout(() => editingInputRef.current?.focus(), 0);
  };

  const handleEditSave = () => {
    if (editingValue.trim() && editingId) {
      const updatedAssumptions = assumptions.map((assumption) =>
        assumption.id === editingId ? { ...assumption, description: editingValue.trim() } : assumption
      );
      onChange(updatedAssumptions);
      setEditingId(null);
      setEditingValue("");
    }
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditingValue("");
  };

  const handleDelete = (id) => {
    const updatedAssumptions = assumptions.filter((assumption) => assumption.id !== id);
    onChange(updatedAssumptions);
  };

  const handleCertaintyChange = (id, newCertainty) => {
    const updatedAssumptions = assumptions.map((assumption) =>
      assumption.id === id ? { ...assumption, certainty: newCertainty } : assumption
    );
    onChange(updatedAssumptions);
  };

  const handleKeyDown = (e, action) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (action === "add") {
        handleAddAssumption();
      } else if (action === "edit") {
        handleEditSave();
      }
    } else if (e.key === "Escape") {
      if (action === "edit") {
        handleEditCancel();
      }
    }
  };

  return (
    <Card className={className}>
      <CardContent>
        <div className="space-y-4">
          {/* Title */}
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-full">Description</TableHead>
                  <TableHead className="w-[200px]">Certainty</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* Existing rows */}
                {currentAssumptions.map((assumption) => (
                  <TableRow key={assumption.id}>
                    <TableCell className="min-w-0 w-full max-w-[500px]">
                      {editingId === assumption.id ? (
                        <Input
                          ref={editingInputRef}
                          value={editingValue}
                          onChange={(e) => setEditingValue(e.target.value)}
                          onKeyDown={(e) => handleKeyDown(e, "edit")}
                          onBlur={handleEditCancel}
                          className="w-full min-w-0"
                        />
                      ) : (
                        <div className="truncate max-w-full" title={assumption.description}>
                          {assumption.description}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="w-[200px]">
                      <Select
                        value={assumption.certainty}
                        onValueChange={(value) => handleCertaintyChange(assumption.id, value)}
                      >
                        <SelectTrigger
                          className={cn("w-[180px] cursor-pointer", getCertaintyBorderColor(assumption.certainty))}
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="cursor-pointer">
                          {CERTAINTY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                              <CircleIcon className={cn("size-2", option.color)} /> {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="w-[100px]">
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditStart(assumption)}
                          className="h-8 w-8 p-0 cursor-pointer"
                          aria-label="Edit assumption"
                        >
                          <Edit2Icon className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(assumption.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive cursor-pointer"
                          aria-label="Delete assumption"
                        >
                          <Trash2Icon className="size-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {/* Add new row */}
                <TableRow className="border-t-2">
                  <TableCell className="flex-1">
                    <Input
                      ref={newInputRef}
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "add")}
                      placeholder="Type and press Enter to add..."
                      className="w-full"
                    />
                  </TableCell>
                  <TableCell>
                    <Select value={newCertainty} onValueChange={setNewCertainty}>
                      <SelectTrigger className={cn("w-[180px] cursor-pointer", getCertaintyBorderColor(newCertainty))}>
                        <SelectValue placeholder="Select certainty" />
                      </SelectTrigger>
                      <SelectContent className="cursor-pointer">
                        {CERTAINTY_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                            <CircleIcon className={cn("size-2", option.color)} /> {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        title="Add assumption"
                        onClick={handleAddAssumption}
                        disabled={!newDescription.trim() || !newCertainty}
                        size="sm"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </Button>
                      <Button
                        className={cn(!newDescription.trim() && "opacity-0")}
                        variant="outline"
                        size="sm"
                        title="Cancel"
                        onClick={() => setNewDescription("")}
                      >
                        <XIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-start justify-between">
            <div className="md:text-sm text-xs text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(endIndex, assumptions.length)} of {assumptions.length}
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="md:text-sm text-xs text-muted-foreground">Rows per page</span>
                <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </Button>
                <span className="md:text-sm text-xs text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
