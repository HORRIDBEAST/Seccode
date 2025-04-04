
import { Shield, Github, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="footer" className="bg-seccode-darker pt-16 pb-8 border-t border-seccode-blue/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-seccode-cyan mr-2" />
              <span className="text-xl font-bold text-white">Seccode</span>
            </div>
            <p className="text-gray-400 mb-6">
              Exploring cryptography, information theory, and secure coding through interactive demonstrations.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-seccode-cyan transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-seccode-cyan transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="text-gray-400 hover:text-seccode-cyan transition-colors">Home</a></li>
              <li><a href="#features" className="text-gray-400 hover:text-seccode-cyan transition-colors">Features</a></li>
              <li><a href="#faq" className="text-gray-400 hover:text-seccode-cyan transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-seccode-cyan transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-seccode-cyan transition-colors">Tutorials</a></li>
              <li><a href="#" className="text-gray-400 hover:text-seccode-cyan transition-colors">Best Practices</a></li>
              <li><a href="#" className="text-gray-400 hover:text-seccode-cyan transition-colors">Learning Path</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Have questions or feedback?</p>
            <a 
              href="mailto:contact@seccode.example.com" 
              className="inline-block text-seccode-cyan hover:underline mb-6"
            >
              contact@seccode.example.com
            </a>
            <button 
              onClick={scrollToTop}
              className="px-4 py-2 rounded-md bg-seccode-blue text-white flex items-center hover:bg-seccode-blue/80 transition-colors"
            >
              Back to Top <ArrowUp className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="border-t border-seccode-blue/30 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Seccode. All rights reserved.
            </p>
            <div className="text-gray-500 text-sm text-center md:text-right">
              <p className="mb-1">
                For educational purposes only. Not intended for production security applications.
              </p>
              <p>
                Learn secure coding practices responsibly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
