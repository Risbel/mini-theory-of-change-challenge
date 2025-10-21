import { TextareaCard } from "@/components/TextareaCard";
import { TagInputCard } from "@/components/TagInputCard";
import { TableCard } from "@/components/TableCard";
import ToCBoardCard from "@/components/ToCBoardCard";
import SaveButton from "@/components/SaveButton";
import TheoryOfChangeProvider from "@/contexts/TheoryOfChangeProvider";

const MiniTheoryOfChange = () => {
  return (
    <TheoryOfChangeProvider>
      <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Theory of change</h1>
          <p className="text-muted-foreground">
            This is a mini theory of change. It is a tool that helps you to create a theory of change for your project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextareaCard />
          <TagInputCard />
        </div>

        <TableCard />
        <ToCBoardCard />

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <SaveButton />
        </div>
      </div>
    </TheoryOfChangeProvider>
  );
};

export default MiniTheoryOfChange;
