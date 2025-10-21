import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { useTheoryOfChangeContext } from "@/hooks/useTheoryOfChangeContext";
import { SaveIcon, LoaderCircleIcon, AlertCircleIcon } from "lucide-react";
import { validateTheoryOfChangeData, savedDataSchema } from "@/schemas/theoryOfChangeSchema";

const SaveButton = () => {
  const { state } = useTheoryOfChangeContext();
  const [isSaving, setIsSaving] = useState(false);

  // Validate the current state
  const validation = useMemo(() => {
    return validateTheoryOfChangeData(state);
  }, [state]);

  const handleSave = async () => {
    // Don't save if validation fails
    if (!validation.isValid) {
      console.error("❌ Cannot save: Validation failed", validation.errors || []);
      return;
    }

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

      // Validate the data structure before saving
      const validatedData = savedDataSchema.parse(dataToSave);

      localStorage.setItem("theoryOfChangeData", JSON.stringify(validatedData));

      // Log success message
      console.log("✅ Data saved successfully to localStorage!", {
        timestamp: validatedData.timestamp,
        data: validatedData,
      });
    } catch (error) {
      console.error("❌ Error saving data:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      size={"lg"}
      onClick={handleSave}
      disabled={isSaving || !validation.isValid}
      className={`cursor-pointer ${!validation.isValid ? "opacity-50" : ""}`}
      type="button"
      title={
        !validation.isValid
          ? `Validation errors: ${validation.errors?.map((e) => e.message).join(", ") || "Unknown validation error"}`
          : "Save all data"
      }
    >
      {isSaving ? (
        <>
          <LoaderCircleIcon className="size-4 animate-spin" />
          Saving...
        </>
      ) : !validation.isValid ? (
        <>
          <AlertCircleIcon className="size-4" />
          Complete Required Fields
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
