import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheoryOfChangeContext } from "@/hooks/useTheoryOfChangeContext";
import { SaveIcon, LoaderCircleIcon } from "lucide-react";

const SaveButton = () => {
  const { state } = useTheoryOfChangeContext();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const dataToSave = {
        reasonValue: state.reasonValue,
        peopleTags: state.peopleTags,
        assumptions: state.assumptions,
        directOutcomes: state.directOutcomes,
        indirectOutcomes: state.indirectOutcomes,
        ultimateImpact: state.ultimateImpact,
        timestamp: new Date().toISOString(),
      };

      localStorage.setItem("theoryOfChangeData", JSON.stringify(dataToSave));

      // Log success message
      console.log("✅ Data saved successfully to localStorage!", {
        timestamp: dataToSave.timestamp,
        data: dataToSave,
      });
    } catch (error) {
      console.error("❌ Error saving data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button size={"lg"} onClick={handleSave} disabled={isSaving} className={"cursor-pointer"} type="button">
      {isSaving ? (
        <>
          <LoaderCircleIcon className="size-4 animate-spin" />
          Saving...
        </>
      ) : (
        <>
          <SaveIcon className="size-4" />
          Save All Data
        </>
      )}
    </Button>
  );
};

export default SaveButton;
