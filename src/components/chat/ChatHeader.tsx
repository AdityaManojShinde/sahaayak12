import { Globe, GraduationCap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Language = "en" | "hi" | "mr";

interface ChatHeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const languages = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
};

export const ChatHeader = ({ language, onLanguageChange }: ChatHeaderProps) => {
  return (
    <header className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-3 border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary text-primary-foreground">
          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-semibold text-foreground">Sahaayak</h1>
          <p className="text-[10px] sm:text-xs text-muted-foreground hidden xs:block">सहायक • Your Scholarship Guide</p>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground hidden sm:block" />
        <Select value={language} onValueChange={(val) => onLanguageChange(val as Language)}>
          <SelectTrigger className="w-[80px] sm:w-[100px] h-7 sm:h-8 text-xs sm:text-sm border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(languages).map(([code, name]) => (
              <SelectItem key={code} value={code}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};
