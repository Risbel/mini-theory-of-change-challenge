import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { Users, FileCheck2, ClipboardListIcon, Target } from "lucide-react";

const ColumnCardWrapper = ({
  icon,
  title,
  description,
  pillText,
  isDotted = false,
  className = "",
  children,
  ...props
}) => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10; // 10px tolerance
      setShowScrollButton(!isAtBottom && scrollHeight > clientHeight);
    }
  };

  const scrollToBottom = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({
        top: contentRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.addEventListener("scroll", handleScroll);
      // Check initial state
      handleScroll();

      return () => {
        content.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const iconsMap = {
    users: Users,
    fileCheck2: FileCheck2,
    clipboardListIcon: ClipboardListIcon,
    target: Target,
  };
  const Icon = iconsMap[icon];

  return (
    <div>
      {icon && (
        <div className="flex justify-center items-center space-y-2 mb-4">
          <div className="bg-primary/10 rounded-full p-3">
            <Icon className="size-8 text-primary" />
          </div>
        </div>
      )}

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
        <CardContent
          ref={contentRef}
          className="px-4 flex flex-col h-full py-0 flex-1 scrollbar-hidden"
          onScroll={handleScroll}
        >
          {children}
        </CardContent>

        {/* Show More Button */}
        {showScrollButton && (
          <div className="flex justify-center pb-0">
            <button
              onClick={scrollToBottom}
              className="text-xs font-semibold cursor-pointer text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
            >
              Show more
              <ChevronDownIcon className="size-3" />
            </button>
          </div>
        )}

        <CardFooter className="w-full px-0 h-16 flex items-center justify-center">
          {pillText && (
            <div className="bg-primary text-primary-foreground w-full h-full font-medium text-sm flex items-center justify-center">
              {pillText}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ColumnCardWrapper;
