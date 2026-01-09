import { GraduationCap, Search, FileText, CheckCircle } from "lucide-react";

interface WelcomeMessageProps {
  language: "en" | "hi" | "mr";
}

const content = {
  en: {
    greeting: "Namaste! 🙏",
    title: "Welcome to Sahaayak",
    subtitle: "Your personal guide to scholarships and opportunities in Maharashtra",
    features: [
      { icon: Search, text: "Find scholarships matching your profile" },
      { icon: FileText, text: "Get help with application process" },
      { icon: CheckCircle, text: "Track deadlines and requirements" },
    ],
    prompt: "How can I help you today?",
  },
  hi: {
    greeting: "नमस्ते! 🙏",
    title: "सहायक में आपका स्वागत है",
    subtitle: "महाराष्ट्र में छात्रवृत्ति और अवसरों के लिए आपका व्यक्तिगत मार्गदर्शक",
    features: [
      { icon: Search, text: "अपनी प्रोफ़ाइल से मेल खाती छात्रवृत्ति खोजें" },
      { icon: FileText, text: "आवेदन प्रक्रिया में मदद पाएं" },
      { icon: CheckCircle, text: "समय सीमा और आवश्यकताओं को ट्रैक करें" },
    ],
    prompt: "आज मैं आपकी कैसे मदद कर सकता हूं?",
  },
  mr: {
    greeting: "नमस्कार! 🙏",
    title: "सहायक मध्ये आपले स्वागत आहे",
    subtitle: "महाराष्ट्रातील शिष्यवृत्ती आणि संधींसाठी तुमचा वैयक्तिक मार्गदर्शक",
    features: [
      { icon: Search, text: "तुमच्या प्रोफाइलशी जुळणाऱ्या शिष्यवृत्ती शोधा" },
      { icon: FileText, text: "अर्ज प्रक्रियेत मदत मिळवा" },
      { icon: CheckCircle, text: "अंतिम मुदत आणि आवश्यकता ट्रॅक करा" },
    ],
    prompt: "आज मी तुम्हाला कशी मदत करू शकतो?",
  },
};

export const WelcomeMessage = ({ language }: WelcomeMessageProps) => {
  const t = content[language];

  return (
    <div className="flex flex-col items-center text-center px-6 py-8 animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
        <GraduationCap className="w-8 h-8 text-primary" />
      </div>
      
      <p className="text-2xl mb-2">{t.greeting}</p>
      <h2 className="text-xl font-semibold text-foreground mb-1">{t.title}</h2>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">{t.subtitle}</p>

      <div className="w-full max-w-sm space-y-3 mb-6">
        {t.features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <feature.icon className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm text-foreground">{feature.text}</span>
          </div>
        ))}
      </div>

      <p className="text-sm font-medium text-muted-foreground">{t.prompt}</p>
    </div>
  );
};
