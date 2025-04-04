
import { useEffect, useState } from 'react';
import { 
  KeySquare, Lock, BarChart2, Search, FileText, 
  AlertCircle, Database, FileX, Shield, Laptop, Code, Key
} from 'lucide-react';
import FeatureCard from './FeatureCard';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById('features');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const features = [
    {
      title: "Caesar Cipher",
      description: "Learn secure input validation through the classic Caesar Cipher, which shifts letters by a fixed amount.",
      icon: KeySquare
    },
    {
      title: "Vigenère Cipher",
      description: "Explore improved security with the Vigenère Cipher's polyalphabetic substitution technique.",
      icon: Lock
    },
    {
      title: "Information Entropy",
      description: "Calculate and understand information entropy to measure data randomness and information content.",
      icon: BarChart2
    },
    {
      title: "Frequency Analysis",
      description: "Break the Caesar Cipher using frequency analysis to understand cryptographic vulnerabilities.",
      icon: Search
    },
    {
      title: "Entropy Comparison",
      description: "Compare entropy across different text types to understand information density variations.",
      icon: FileText
    },
    {
      title: "Information Leakage",
      description: "Visualize how information can be unintentionally leaked through interactive demonstrations.",
      icon: AlertCircle
    },
    {
      title: "Secure Password Storage",
      description: "Learn proper password storage techniques using hashing and salting to prevent breaches.",
      icon: Database
    },
    {
      title: "Data Anonymization",
      description: "Apply redaction techniques to understand how to protect sensitive information within datasets.",
      icon: FileX
    },
    {
      title: "Differential Privacy",
      description: "Explore simplified differential privacy concepts to balance data utility and privacy protection.",
      icon: Shield
    },
    {
      title: "TLS Handshake Simulation",
      description: "Experience a simplified simulation of the TLS handshake protocol for secure communications.",
      icon: Laptop
    },
    {
      title: "Vulnerability Examples",
      description: "Identify common security vulnerabilities across different programming languages and frameworks.",
      icon: Code
    },
    {
      title: "AES Implementation",
      description: "Understand Advanced Encryption Standard (AES) principles through simplified shift-based implementation.",
      icon: Key
    }
  ];

  return (
    <section id="features" className="py-20 bg-seccode-darker relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-96 bg-glow-cyan opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-full h-96 bg-glow-cyan opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Comprehensive </span>
            <span className="text-gradient">Security Features</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Explore our range of cryptographic and security tools designed to help you understand and implement secure coding practices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={index * 100}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
