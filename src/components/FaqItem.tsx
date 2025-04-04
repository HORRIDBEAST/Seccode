
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
}

const FaqItem = ({ question, answer, isOpen = false }: FaqItemProps) => {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  return (
    <div className="border-b border-seccode-blue/50 last:border-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-seccode-cyan" />
        ) : (
          <ChevronDown className="w-5 h-5 text-seccode-cyan" />
        )}
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-300">{answer}</p>
      </div>
    </div>
  );
};

export default FaqItem;
