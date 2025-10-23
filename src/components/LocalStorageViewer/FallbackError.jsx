import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { AlertTriangleIcon, RefreshCwIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";

const FallbackError = () => {
  const handleRetry = () => {
    try {
      window.location.reload();
      toast.success("Local storage reloaded successfully");
    } catch {
      toast.error("Error reloading local storage");
    }
  };

  const handleClearData = () => {
    try {
      localStorage.removeItem("theoryOfChangeData");
      toast.success("Local storage cleared successfully");
      window.location.reload();
    } catch {
      toast.error("Error clearing local storage");
    }
  };

  const handleContactSupport = () => {
    window.open("mailto:risbel961019@gmail.com", "_blank");
  };

  return (
    <Card className="w-full border-destructive/20 bg-destructive/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangleIcon className="h-5 w-5" />
          Data Error
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          There was an issue with your saved data. This might be due to corrupted or invalid data structure. Try
          reloading the page or clearing the local storage if the problem persists. If the problem persists, please
          contact support.
        </p>

        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleRetry} className="flex items-center gap-2">
              <RefreshCwIcon className="h-4 w-4" />
              Try Again
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearData}
              className="flex items-center gap-2 text-destructive border-destructive/20 hover:bg-destructive/10"
            >
              <TrashIcon className="h-4 w-4" />
              Clear Data
            </Button>
          </div>
          <Button variant="outline" size="sm" onClick={handleContactSupport} className="flex items-center gap-2">
            <MailIcon className="h-4 w-4" />
            Support
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FallbackError;
