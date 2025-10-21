import { TextareaCard } from "@/components/TextareaCard";
import { TagInputCard } from "@/components/TagInputCard";
import { TableCard } from "@/components/TableCard";
import ToCBoardCard from "@/components/ToCBoardCard";
import TheoryOfChangeProvider from "@/contexts/TheoryOfChangeProvider";

const MiniTheoryOfChange = () => {
  return (
    <TheoryOfChangeProvider>
      <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-primary">Theory of change</h1>
          <p className="text-muted-foreground">
            This is a mini theory of change. It is a tool that helps you to create a theory of change for your project.
          </p>
        </div>

        <TextareaCard />
        <TagInputCard />
        <TableCard />
        <ToCBoardCard />
      </div>
    </TheoryOfChangeProvider>
  );
};

export default MiniTheoryOfChange;
