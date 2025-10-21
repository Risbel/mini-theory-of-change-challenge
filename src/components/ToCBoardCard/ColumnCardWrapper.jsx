import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const ColumnCardWrapper = ({ title, description, pillText, isDotted = false, className = "", children, ...props }) => {
  return (
    <Card
      className={cn(
        "h-64 flex flex-col pb-0 pt-4 gap-0 space-y-0 overflow-hidden gap-2",
        isDotted && "border-2 border-dashed border-primary",
        className
      )}
      {...props}
    >
      <CardHeader className="px-4 gap-0 pb-2">
        <CardTitle className="text-lg font-bold text-primary">{title}</CardTitle>
        <CardDescription className="text-xs font-semibold text-muted-foreground">{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-4 flex flex-col h-full py-0 flex-1 overflow-y-auto">{children}</CardContent>

      <CardFooter className="w-full px-0 h-16 flex items-center justify-center">
        {pillText && (
          <div className="bg-primary text-primary-foreground w-full h-full font-medium text-sm flex items-center justify-center">
            {pillText}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default ColumnCardWrapper;
