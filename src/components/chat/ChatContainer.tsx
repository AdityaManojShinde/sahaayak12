import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage, Message, ActionButton } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { QuickActions } from "./QuickActions";
import { TypingIndicator } from "./TypingIndicator";
import { WelcomeMessage } from "./WelcomeMessage";

type Language = "en" | "hi" | "mr";

const placeholders = {
  en: "Ask about scholarships, eligibility, documents...",
  hi: "छात्रवृत्ति, पात्रता, दस्तावेज़ों के बारे में पूछें...",
  mr: "शिष्यवृत्ती, पात्रता, कागदपत्रांबद्दल विचारा...",
};

interface MockResponse {
  content: string;
  actions?: ActionButton[];
}

const mockResponses: Record<Language, MockResponse[]> = {
  en: [
    {
      content: "I can help you find scholarships! To give you the best recommendations, could you tell me your education level?",
      actions: [
        { id: "1", label: "10th Standard", value: "I am in 10th standard" },
        { id: "2", label: "12th Standard", value: "I am in 12th standard" },
        { id: "3", label: "Undergraduate", value: "I am an undergraduate student" },
        { id: "4", label: "Postgraduate", value: "I am a postgraduate student" },
      ],
    },
    {
      content: "Great! Now let me know your category to find the best scholarships for you.",
      actions: [
        { id: "1", label: "General", value: "My category is General" },
        { id: "2", label: "SC/ST", value: "My category is SC/ST" },
        { id: "3", label: "OBC", value: "My category is OBC" },
        { id: "4", label: "EWS", value: "My category is EWS" },
      ],
    },
    {
      content: "The Mahatma Jyotiba Phule Scholarship is one of the most popular schemes!\n\n✅ For SC/ST/OBC students\n✅ Family income below ₹8 lakh/year\n✅ Covers tuition fees + maintenance\n\nWould you like to proceed?",
      actions: [
        { id: "1", label: "✅ Yes, apply now", value: "Yes, I want to apply for this scholarship" },
        { id: "2", label: "📋 Check eligibility", value: "What are the eligibility requirements?" },
        { id: "3", label: "📄 Documents needed", value: "What documents do I need?" },
        { id: "4", label: "🔍 Show other options", value: "Show me other scholarship options" },
      ],
    },
  ],
  hi: [
    {
      content: "मैं आपको छात्रवृत्ति खोजने में मदद कर सकता हूं! कृपया अपना शिक्षा स्तर बताएं।",
      actions: [
        { id: "1", label: "10वीं कक्षा", value: "मैं 10वीं कक्षा में हूं" },
        { id: "2", label: "12वीं कक्षा", value: "मैं 12वीं कक्षा में हूं" },
        { id: "3", label: "स्नातक", value: "मैं स्नातक छात्र हूं" },
        { id: "4", label: "स्नातकोत्तर", value: "मैं स्नातकोत्तर छात्र हूं" },
      ],
    },
    {
      content: "बढ़िया! अब मुझे अपनी श्रेणी बताएं ताकि मैं आपके लिए सर्वोत्तम छात्रवृत्ति खोज सकूं।",
      actions: [
        { id: "1", label: "सामान्य", value: "मेरी श्रेणी सामान्य है" },
        { id: "2", label: "SC/ST", value: "मेरी श्रेणी SC/ST है" },
        { id: "3", label: "OBC", value: "मेरी श्रेणी OBC है" },
        { id: "4", label: "EWS", value: "मेरी श्रेणी EWS है" },
      ],
    },
  ],
  mr: [
    {
      content: "मी तुम्हाला शिष्यवृत्ती शोधण्यात मदत करू शकतो! कृपया तुमची शिक्षण पातळी सांगा।",
      actions: [
        { id: "1", label: "10वी", value: "मी 10वी मध्ये आहे" },
        { id: "2", label: "12वी", value: "मी 12वी मध्ये आहे" },
        { id: "3", label: "पदवी", value: "मी पदवी विद्यार्थी आहे" },
        { id: "4", label: "पदव्युत्तर", value: "मी पदव्युत्तर विद्यार्थी आहे" },
      ],
    },
    {
      content: "छान! आता तुमची श्रेणी सांगा जेणेकरून मी तुमच्यासाठी सर्वोत्तम शिष्यवृत्ती शोधू शकेन.",
      actions: [
        { id: "1", label: "सामान्य", value: "माझी श्रेणी सामान्य आहे" },
        { id: "2", label: "SC/ST", value: "माझी श्रेणी SC/ST आहे" },
        { id: "3", label: "OBC", value: "माझी श्रेणी OBC आहे" },
        { id: "4", label: "EWS", value: "माझी श्रेणी EWS आहे" },
      ],
    },
  ],
};

export const ChatContainer = () => {
  const [language, setLanguage] = useState<Language>("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const simulateResponse = (userMessage: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const responses = mockResponses[language];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: randomResponse.content,
          timestamp: new Date(),
          actions: randomResponse.actions,
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
    simulateResponse(content);
  };

  const handleQuickAction = (action: string) => {
    handleSend(action);
  };

  const handleActionClick = (action: ActionButton) => {
    handleSend(action.value);
  };

  return (
    <div className="flex flex-col h-[100dvh] max-h-[100dvh] bg-background">
      <ChatHeader language={language} onLanguageChange={setLanguage} />
      
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {messages.length === 0 ? (
          <WelcomeMessage language={language} />
        ) : (
          <div className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4 md:p-6 max-w-4xl mx-auto w-full">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} onActionClick={handleActionClick} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {messages.length === 0 && (
        <QuickActions language={language} onSelect={handleQuickAction} />
      )}

      <ChatInput
        onSend={handleSend}
        disabled={isTyping}
        placeholder={placeholders[language]}
      />
    </div>
  );
};
