import { ArrowRight, ShieldCheck, Lock, Key } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import framer-motion for animations

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-seccode-dark">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-seccode-cyan/5 animate-pulse-glow blur-3xl"></div>
        <div className="absolute top-3/4 right-1/3 w-96 h-96 rounded-full bg-seccode-purple/5 animate-pulse-glow blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-seccode-cyan/5 animate-pulse-glow blur-3xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-20"></div>
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-white">Secure Your Code. </span>
              <span className="text-gradient">Protect Your Data.</span>
            </h1>
            
            <p className="text-gray-300 text-lg max-w-xl">
              Explore cryptographic principles, information theory, and secure coding practices with interactive demonstrations and educational resources.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#features" className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md bg-seccode-cyan text-black font-medium hover:bg-seccode-cyan/90 transition-colors duration-300">
                Explore Features <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a href="#faq" className="inline-flex items-center justify-center px-6 py-3 border border-seccode-cyan/30 rounded-md bg-transparent text-seccode-cyan hover:bg-seccode-cyan/10 transition-colors duration-300">
                Learn More
              </a>
              <a href="/securecoding" className="inline-flex items-center justify-center px-6 py-3 border border-seccode-cyan/30 bg-violet-500 rounded-md bg-transparent text-white hover:bg-seccode-cyan/10 transition-colors duration-300">
                Checkout the Action
              </a>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="h-5 w-5 text-seccode-cyan" />
                <span>Cybersecurity Education</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Lock className="h-5 w-5 text-seccode-purple" />
                <span>Privacy Protection</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Key className="h-5 w-5 text-seccode-cyan" />
                <span>Cryptographic Learning</span>
              </div>
            </div>
          </div>
          
          <div className={`flex-1 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{animationDelay: '0.4s'}}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-slate-800 rounded-lg shadow-xl overflow-hidden border  hover:border-seccode-cyan border-slate-700">
                <div className="flex items-center px-4 py-2 bg-slate-700 border-b border-slate-600">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="mx-auto text-sm text-slate-300">Secure Coding Terminal</div>
                </div>
                <div className="p-4 font-mono text-sm text-emerald-400">
                  <div className="flex">
                    <span className="text-slate-500 mr-4">1</span>
                    <span className="text-cyan-400">function</span>
                    <span className="text-slate-200 ml-2">encryptMessage</span>
                    <span className="text-slate-200">(message, key) {`{`}</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">2</span>
                    <span className="ml-8 text-cyan-400">const</span>
                    <span className="text-slate-200 ml-2">result = [];</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">3</span>
                    <span className="ml-8 text-cyan-400">for</span>
                    <span className="text-slate-200 ml-2">
                      (let i = 0; i {"<"} message.length; i++) {`{`}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">4</span>
                    <span className="ml-12 text-cyan-400">const</span>
                    <span className="text-slate-200 ml-2">char = message[i];</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">5</span>
                    <span className="ml-12 text-cyan-400">const</span>
                    <span className="text-slate-200 ml-2">shift = key.charCodeAt(i % key.length);</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">6</span>
                    <span className="ml-12 text-cyan-400">const</span>
                    <span className="text-slate-200 ml-2">
                      encrypted = String.fromCharCode(char.charCodeAt(0) + shift);
                    </span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">7</span>
                    <span className="ml-12 text-slate-200">result.push(encrypted);</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">8</span>
                    <span className="ml-8 text-slate-200">{`}`}</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">9</span>
                    <span className="ml-8 text-cyan-400">return</span>
                    <span className="text-slate-200 ml-2">result.join('');</span>
                  </div>
                  <div className="flex">
                    <span className="text-slate-500 mr-4">10</span>
                    <span className="text-slate-200">{`}`}</span>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute -top-6 -right-6 bg-emerald-600 p-3 rounded-lg shadow-lg"
              >
                <Lock className="h-6 w-6 text-white" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-6 -left-6 bg-cyan-600 p-3 rounded-lg shadow-lg"
              >
                <Key className="h-6 w-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;