import { useState, useRef, useEffect } from "react";
import { Send, Mic, Square, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}
export const ChatInput = ({
  onSend,
  disabled,
  placeholder
}: ChatInputProps) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  // Recording timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setRecordingTime(0);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording]);
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true
      });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = e => {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        // For now, just simulate transcription
        // In production, send to a speech-to-text API
        stream.getTracks().forEach(track => track.stop());
        setIsRecording(false);
        // Simulate voice input
        setInput(prev => prev + " [Voice message transcribed]");
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };
  const hasContent = input.trim().length > 0;
  return (
    <div className="p-2 sm:p-4 bg-background safe-area-bottom">
      <div className="max-w-3xl mx-auto">
        <div className={cn(
          "relative flex items-end gap-1.5 sm:gap-2 rounded-xl sm:rounded-2xl border bg-card p-1.5 sm:p-2 transition-all duration-200",
          isRecording ? "border-destructive/50 bg-destructive/5" : "border-border focus-within:border-primary/50 focus-within:shadow-sm"
        )}>
          {isRecording ? (
            // Recording state
            <div className="flex-1 flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-destructive animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-destructive">
                Recording... {formatTime(recordingTime)}
              </span>
            </div>
          ) : (
            // Text input
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder || "Message Sahaayak..."}
              disabled={disabled}
              rows={1}
              className={cn(
                "flex-1 resize-none bg-transparent px-2 sm:px-3 py-2 sm:py-2.5 text-[13px] sm:text-sm",
                "placeholder:text-muted-foreground focus:outline-none",
                "min-h-[40px] sm:min-h-[44px] max-h-[120px] sm:max-h-[150px]",
                "scrollbar-thin"
              )}
            />
          )}

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Voice button */}
            {!hasContent && (
              <Button
                type="button"
                size="icon"
                variant={isRecording ? "destructive" : "ghost"}
                onClick={isRecording ? stopRecording : startRecording}
                disabled={disabled}
                className={cn(
                  "h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl transition-all duration-200",
                  isRecording && "animate-pulse"
                )}
              >
                {isRecording ? (
                  <Square className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                ) : (
                  <Mic className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </Button>
            )}

            {/* Send button */}
            <Button
              type="button"
              size="icon"
              onClick={() => handleSubmit()}
              disabled={!hasContent || disabled}
              className={cn(
                "h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl transition-all duration-200",
                hasContent
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {disabled ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Button>
          </div>
        </div>

        <p className="text-[9px] sm:text-[10px] text-center text-muted-foreground mt-1.5 sm:mt-2 px-2">
          Sahaayak helps Maharashtra students find scholarships. Always verify information with official sources.
        </p>
      </div>
    </div>
  );
};