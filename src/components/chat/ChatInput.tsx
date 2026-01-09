import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput = ({ onSend, disabled, placeholder }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 p-4 border-t border-border bg-card/80 backdrop-blur-sm"
    >
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Type your message..."}
        disabled={disabled}
        className="min-h-[44px] max-h-[120px] resize-none bg-background border-border focus-visible:ring-primary"
        rows={1}
      />
      <Button
        type="submit"
        size="icon"
        disabled={!input.trim() || disabled}
        className="h-11 w-11 shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl transition-all duration-200 disabled:opacity-50"
      >
        <Send className="w-5 h-5" />
      </Button>
    </form>
  );
};
