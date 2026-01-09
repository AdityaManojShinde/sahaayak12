import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

export interface ActionButton {
  id: string;
  label: string;
  value: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: ActionButton[];
}

interface ChatMessageProps {
  message: Message;
  onActionClick?: (action: ActionButton) => void;
}

export const ChatMessage = ({ message, onActionClick }: ChatMessageProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
        )}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      <div className={cn("max-w-[80%] md:max-w-[70%] flex flex-col gap-2")}>
        <div
          className={cn(
            isUser ? "chat-bubble-user" : "chat-bubble-assistant"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          <span className="block mt-1 text-[10px] opacity-60">
            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>

        {/* WhatsApp-style action buttons */}
        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {message.actions.map((action) => (
              <button
                key={action.id}
                onClick={() => onActionClick?.(action)}
                className="action-button"
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
