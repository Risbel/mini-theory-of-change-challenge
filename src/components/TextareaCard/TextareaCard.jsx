import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTheoryOfChangeContext } from "@/hooks/useTheoryOfChangeContext";
import { ACTIONS } from "@/constants/actionTypes";
import { useDebouncedCallback } from "use-debounce";

const TextareaCard = ({ maxLength = 250, className = "" }) => {
  const { state, dispatch } = useTheoryOfChangeContext();
  const { reasonValue: globalValue } = state;
  const [localValue, setLocalValue] = useState(globalValue);

  const debouncedDispatch = useDebouncedCallback((value) => {
    dispatch({ type: ACTIONS.SET_REASON, payload: value });
  }, 1000);

  // Sync local state when global state changes externally (e.g., form reset)
  useEffect(() => {
    setLocalValue(globalValue);
  }, [globalValue]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    debouncedDispatch(newValue);
  };

  const currentLength = localValue.length;
  const isNearLimit = currentLength > maxLength * 0.8;
  const isAtLimit = currentLength >= maxLength;

  return (
    <Card className={className}>
      <CardContent className="space-y-3">
        <label htmlFor="reason-textarea" className="block text-sm font-medium text-foreground">
          The reason we exist
        </label>

        <div className="relative">
          <Textarea
            id="reason-textarea"
            value={localValue}
            onChange={handleChange}
            placeholder="e.g. Strengthening local neighbourhoods through the power of food"
            maxLength={maxLength}
            resize="true"
            className={cn(isAtLimit && "border-destructive")}
            style={{
              lineHeight: "1.2",
              fontSize: "14px",
            }}
          />

          <div className="absolute bottom-2 right-2">
            <span
              className={cn(
                "text-xs px-2 py-1 rounded-md",
                isAtLimit
                  ? "text-destructive bg-destructive/10"
                  : isNearLimit
                  ? "text-warning-foreground bg-warning"
                  : "text-muted-foreground bg-muted/50"
              )}
            >
              {currentLength}/{maxLength}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextareaCard;
