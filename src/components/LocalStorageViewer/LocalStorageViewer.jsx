import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileTextIcon,
  TargetIcon,
  TrashIcon,
  RefreshCwIcon,
  SaveIcon,
  ClipboardListIcon,
  FileCheck2,
} from "lucide-react";
import { toast } from "sonner";

const LocalStorageViewer = () => {
  const [savedData, setSavedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadSavedData = () => {
    setIsLoading(true);
    try {
      const data = localStorage.getItem("theoryOfChangeData");
      if (data) {
        const parsedData = JSON.parse(data);
        setSavedData(parsedData);
      } else {
        setSavedData(null);
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
      toast.error("Error loading saved data");
      setSavedData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const clearSavedData = () => {
    try {
      localStorage.removeItem("theoryOfChangeData");
      setSavedData(null);
      toast.success("Saved data cleared successfully");
    } catch (error) {
      console.error("Error clearing saved data:", error);
      toast.error("Error clearing saved data");
    }
  };

  useEffect(() => {
    loadSavedData();

    // Listen for data saved events
    const handleDataSaved = () => {
      loadSavedData();
    };

    window.addEventListener("dataSaved", handleDataSaved);

    return () => {
      window.removeEventListener("dataSaved", handleDataSaved);
    };
  }, []);

  const getCertaintyColor = (certainty) => {
    switch (certainty) {
      case "very":
        return "bg-green-100 text-green-800 border-green-200";
      case "moderate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "uncertain":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getCertaintyLabel = (certainty) => {
    switch (certainty) {
      case "very":
        return "Very Certain";
      case "moderate":
        return "Moderately Certain";
      case "uncertain":
        return "Uncertain";
      default:
        return "Unknown";
    }
  };

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-8">
          <RefreshCwIcon className="h-6 w-6 animate-spin mr-2" />
          <span>Loading saved data...</span>
        </CardContent>
      </Card>
    );
  }

  if (!savedData) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileTextIcon className="h-5 w-5" />
            Saved Theory of Change Data
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <FileTextIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-4">No saved data found in local storage.</p>
          <p className="text-sm text-muted-foreground">
            Save your theory of change data using the save button above to see it here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <SaveIcon className="h-5 w-5 text-primary" />
            Saved Data
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={loadSavedData} disabled={isLoading}>
              <RefreshCwIcon className="h-4 w-4" />
              <span className="hidden md:block">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearSavedData}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <TrashIcon className="h-4 w-4" />
              <span className="hidden md:block">Clear</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Reason for Existence */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg flex items-center gap-2">Reason for Existence</h3>
          <p className="text-primary bg-primary/5 p-4 rounded-lg border border-primary">{savedData.reasonValue}</p>
        </div>

        {/* People Tags */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg flex items-center gap-2">Target People/Groups</h3>
          <div className="flex flex-wrap gap-2">
            {savedData.peopleTags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/5 text-primary">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Assumptions */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg flex items-center gap-2">Assumptions</h3>
          <div className="space-y-3">
            {savedData.assumptions.map((assumption) => (
              <div key={assumption.id} className="bg-primary/5 p-4 rounded-lg border border-primary">
                <div className="flex items-start justify-between gap-4">
                  <p className="text-primary flex-1">{assumption.description}</p>
                  <Badge className={getCertaintyColor(assumption.certainty)}>
                    {getCertaintyLabel(assumption.certainty)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Direct Outcomes */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <ClipboardListIcon className="h-5 w-5 text-primary" />
            Direct Outcomes
          </h3>
          <div className="space-y-3">
            {savedData.directOutcomes.map((outcome) => (
              <div key={outcome.id} className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">{outcome.title}</h4>
                {outcome.subOutcomes && outcome.subOutcomes.length > 0 && (
                  <div className="ml-4 space-y-1">
                    {outcome.subOutcomes.map((subOutcome) => (
                      <div key={subOutcome.id} className="text-sm text-purple-700 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                        {subOutcome.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Indirect Outcomes */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <FileCheck2 className="h-5 w-5 text-primary" />
            Indirect Outcomes
          </h3>
          <div className="space-y-3">
            {savedData.indirectOutcomes.map((outcome) => (
              <div key={outcome.id} className="bg-primary/5 p-4 rounded-lg border border-primary">
                <h4 className="font-medium text-primary">{outcome.title}</h4>
                {outcome.subOutcomes && outcome.subOutcomes.length > 0 && (
                  <div className="ml-4 space-y-1 mt-2">
                    {outcome.subOutcomes.map((subOutcome) => (
                      <div key={subOutcome.id} className="text-sm text-primary flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {subOutcome.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Ultimate Impact */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <TargetIcon className="h-5 w-5 text-primary" />
            Ultimate Impact
          </h3>
          <div className="space-y-3">
            {savedData.ultimateImpact.map((impact) => (
              <div key={impact.id} className="bg-primary/5 p-4 rounded-lg border border-primary">
                <h4 className="font-medium text-primary">{impact.title}</h4>
                {impact.subOutcomes && impact.subOutcomes.length > 0 && (
                  <div className="ml-4 space-y-1 mt-2">
                    {impact.subOutcomes.map((subOutcome) => (
                      <div key={subOutcome.id} className="text-sm text-primary flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {subOutcome.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalStorageViewer;
