interface QuickActionsProps {
  onSelect: (action: string) => void;
  language: "en" | "hi" | "mr";
}

const actions = {
  en: [
    "Find scholarships for me",
    "SC/ST/OBC schemes",
    "How to apply?",
    "Documents needed",
    "Check eligibility",
  ],
  hi: [
    "मेरे लिए छात्रवृत्ति खोजें",
    "SC/ST/OBC योजनाएं",
    "आवेदन कैसे करें?",
    "आवश्यक दस्तावेज़",
    "पात्रता जांचें",
  ],
  mr: [
    "माझ्यासाठी शिष्यवृत्ती शोधा",
    "SC/ST/OBC योजना",
    "अर्ज कसा करावा?",
    "आवश्यक कागदपत्रे",
    "पात्रता तपासा",
  ],
};

export const QuickActions = ({ onSelect, language }: QuickActionsProps) => {
  return (
    <div className="flex flex-wrap gap-2 px-4 py-3">
      {actions[language].map((action) => (
        <button
          key={action}
          onClick={() => onSelect(action)}
          className="quick-action-chip"
        >
          {action}
        </button>
      ))}
    </div>
  );
};
