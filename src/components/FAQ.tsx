
import { useEffect, useState } from 'react';
import FaqItem from './FaqItem';

const FAQ = () => {
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
    
    const element = document.getElementById('faq');
    if (element) {
      observer.observe(element);
    }
    
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const faqItems = [
    {
      question: "What is information theory and how does it relate to cryptography?",
      answer: "Information theory is a mathematical field that quantifies information content and transmission. In cryptography, it helps measure security strength through concepts like entropy, which quantifies randomness and uncertainty in data. Higher entropy generally indicates stronger cryptographic security."
    },
    {
      question: "Why should I learn about classical ciphers like Caesar and Vigenère?",
      answer: "Classical ciphers provide an excellent foundation for understanding fundamental cryptographic concepts. While not secure by modern standards, they illustrate important principles like substitution, permutation, and key management that remain relevant in modern encryption systems."
    },
    {
      question: "What is differential privacy and why is it important?",
      answer: "Differential privacy is a mathematical framework that allows for data collection and sharing while protecting individual privacy. It works by adding carefully calibrated noise to results, making it difficult to determine if a specific individual's data was included while maintaining the overall statistical accuracy of the dataset."
    },
    {
      question: "How does hashing differ from encryption?",
      answer: "Encryption is reversible with the correct key, allowing encrypted data to be decrypted back to its original form. Hashing is a one-way function that generates a fixed-size output (hash) from input data, making it computationally infeasible to derive the original input from the hash. Hashing is ideal for password storage and data integrity verification."
    },
    {
      question: "What makes a password 'secure'?",
      answer: "A secure password combines length (at least 12 characters), complexity (uppercase, lowercase, numbers, symbols), uniqueness (not used elsewhere), and randomness (not based on personal information). However, the security also depends on proper storage methods like salted hashing and how you protect the password from phishing and other attacks."
    },
    {
      question: "Can I use these tools and demonstrations for real security applications?",
      answer: "The tools in Seccode are primarily educational and demonstrate concepts rather than providing production-ready security solutions. For real applications, you should use well-established, audited security libraries and follow current best practices. Our demonstrations help you understand why these practices matter."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-seccode-dark relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Frequently Asked </span>
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Get answers to common questions about secure coding practices, cryptography, and privacy concepts.
          </p>
        </div>
        
        <div 
          className={`max-w-3xl mx-auto bg-seccode-blue/40 backdrop-blur-sm border border-seccode-blue/70 rounded-lg p-6 md:p-8 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
        >
          {faqItems.map((item, index) => (
            <FaqItem 
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={index === 0}
            />
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">Still have questions?</p>
          <a 
            href="#footer" 
            className="inline-flex items-center justify-center px-6 py-3 border border-seccode-cyan/30 rounded-md bg-transparent text-seccode-cyan hover:bg-seccode-cyan/10 transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
