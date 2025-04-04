
import { useState, useEffect } from 'react';
import { Menu, X, Shield } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'FAQ', href: '#faq' },
    // { name: 'Secure Coding', href: '/securecoding' },
    { name: 'Contact', href: '#footer' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-seccode-darker/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-seccode-cyan" />
              <span className="text-xl font-bold tracking-tight text-white">Seccode</span>
            </a>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-300 hover:text-seccode-cyan transition-colors duration-300 text-sm"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="/securecoding"
                className="px-4 py-2 rounded bg-gradient-to-r from-seccode-cyan to-seccode-purple text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Get Started
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-seccode-cyan focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-seccode-blue/95 backdrop-blur-lg">
          <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-gray-300 hover:text-seccode-cyan"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="block py-2 mt-4 px-4 rounded bg-gradient-to-r from-seccode-cyan to-seccode-purple text-white text-center hover:opacity-90 transition-opacity"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
