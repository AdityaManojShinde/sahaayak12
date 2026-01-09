import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage, Message } from "./ChatMessage";
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

const mockResponses = {
  en: [
    "I can help you find scholarships! To give you the best recommendations, could you tell me:\n\n• Your current education level (10th/12th/Graduate)\n• Your category (General/SC/ST/OBC/EWS)\n• Your family's annual income\n\nThis will help me find scholarships you're eligible for.",
    "Great question! For most Maharashtra government scholarships, you'll need:\n\n📄 Aadhaar Card\n📄 Income Certificate\n📄 Caste Certificate (if applicable)\n📄 Previous year marksheet\n📄 Bank passbook\n📄 Domicile Certificate\n\nWould you like me to explain how to get any of these documents?",
    "The Mahatma Jyotiba Phule Scholarship is one of the most popular schemes! Here's what you need to know:\n\n✅ For SC/ST/OBC students\n✅ Family income below ₹8 lakh/year\n✅ Covers tuition fees + maintenance\n\nWould you like me to guide you through the application process?",
  ],
  hi: [
    "मैं आपको छात्रवृत्ति खोजने में मदद कर सकता हूं! सर्वोत्तम सिफारिशें देने के लिए, क्या आप मुझे बता सकते हैं:\n\n• आपका वर्तमान शिक्षा स्तर (10वीं/12वीं/स्नातक)\n• आपकी श्रेणी (सामान्य/SC/ST/OBC/EWS)\n• आपके परिवार की वार्षिक आय\n\nइससे मुझे उन छात्रवृत्तियों को खोजने में मदद मिलेगी जिनके लिए आप पात्र हैं।",
    "बढ़िया सवाल! अधिकांश महाराष्ट्र सरकारी छात्रवृत्तियों के लिए, आपको चाहिए:\n\n📄 आधार कार्ड\n📄 आय प्रमाण पत्र\n📄 जाति प्रमाण पत्र (यदि लागू हो)\n📄 पिछले वर्ष की मार्कशीट\n📄 बैंक पासबुक\n📄 अधिवास प्रमाण पत्र\n\nक्या आप चाहते हैं कि मैं इनमें से कोई दस्तावेज कैसे प्राप्त करें, यह समझाऊं?",
  ],
  mr: [
    "मी तुम्हाला शिष्यवृत्ती शोधण्यात मदत करू शकतो! सर्वोत्तम शिफारसी देण्यासाठी, तुम्ही मला सांगू शकता का:\n\n• तुमची सध्याची शिक्षण पातळी (10वी/12वी/पदवी)\n• तुमची श्रेणी (सामान्य/SC/ST/OBC/EWS)\n• तुमच्या कुटुंबाचे वार्षिक उत्पन्न\n\nयामुळे मला तुम्ही पात्र असलेल्या शिष्यवृत्ती शोधण्यात मदत होईल.",
    "उत्तम प्रश्न! बहुतेक महाराष्ट्र सरकारी शिष्यवृत्तीसाठी, तुम्हाला हे लागेल:\n\n📄 आधार कार्ड\n📄 उत्पन्न प्रमाणपत्र\n📄 जात प्रमाणपत्र (लागू असल्यास)\n📄 मागील वर्षाची मार्कशीट\n📄 बँक पासबुक\n📄 अधिवास प्रमाणपत्र\n\nयापैकी कोणतेही कागदपत्र कसे मिळवायचे हे मी समजावून सांगू का?",
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
          content: randomResponse,
          timestamp: new Date(),
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

  return (
    <div className="flex flex-col h-screen max-h-screen bg-background">
      <ChatHeader language={language} onLanguageChange={setLanguage} />
      
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {messages.length === 0 ? (
          <WelcomeMessage language={language} />
        ) : (
          <div className="flex flex-col gap-4 p-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
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
