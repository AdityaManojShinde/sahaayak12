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
    <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
          <GraduationCap className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-foreground">Sahaayak</h1>
          <p className="text-xs text-muted-foreground">सहायक • Your Scholarship Guide</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Globe className="w-4 h-4 text-muted-foreground" />
        <Select value={language} onValueChange={(val) => onLanguageChange(val as Language)}>
          <SelectTrigger className="w-[100px] h-8 text-sm border-border">
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
