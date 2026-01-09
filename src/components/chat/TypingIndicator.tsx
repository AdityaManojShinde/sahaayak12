import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-fade-in">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-secondary text-secondary-foreground">
        <Bot className="w-4 h-4" />
      </div>
      <div className="chat-bubble-assistant flex items-center gap-1 py-4">
        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce-gentle" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce-gentle" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce-gentle" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  );
};
