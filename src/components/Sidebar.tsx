import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card"; // Use Shadcn Card
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Lock,
  Key,
  Shield,
  Binary,
  BarChart,
  AlertTriangle,
  KeyRound,
  UserX,
  Users,
  Network,
  Bug,
  ShieldCheck
} from "lucide-react";

interface SidebarProps {
  onSelect: (demo: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState('Caesar Cipher');

  const demos = [
    { name: 'Caesar Cipher', icon: <Lock className="w-4 h-4 text-seccode-cyan" /> },
    { name: 'Vigenère Cipher', icon: <Key className="w-4 h-4 text-seccode-purple" /> },
    { name: 'Entropy Calculation', icon: <Binary className="w-4 h-4 text-seccode-cyan" /> },
    { name: 'Break Caesar Cipher', icon: <Shield className="w-4 h-4 text-seccode-purple" /> },
    { name: 'Entropy Comparison', icon: <BarChart className="w-4 h-4 text-seccode-cyan" /> },
    { name: 'Information Leakage', icon: <AlertTriangle className="w-4 h-4 text-seccode-purple" /> },
    { name: 'Password Storage', icon: <KeyRound className="w-4 h-4 text-seccode-cyan" /> },
    { name: 'Data Anonymization', icon: <UserX className="w-4 h-4 text-seccode-purple" /> },
    { name: 'Differential Privacy', icon: <Users className="w-4 h-4 text-seccode-cyan" /> },
    { name: 'TLS Handshake', icon: <Network className="w-4 h-4 text-seccode-purple" /> },
    { name: 'Vulnerability Examples', icon: <Bug className="w-4 h-4 text-seccode-cyan" /> },
    { name: 'AES Encryption', icon: <ShieldCheck className="w-4 h-4 text-seccode-purple" /> },
  ];

  const handleSelect = (demo: string) => {
    setSelected(demo);
    onSelect(demo);
  };

  return (
    <Card className="w-80 border-r border-seccode-cyan/20 bg-seccode-blue/40 backdrop-blur-md shadow-lg">
      <CardHeader className="p-6 border-b border-seccode-cyan/20">
        <h1 className="text-2xl font-bold text-gradient">Security Lab</h1>
        <p className="text-sm text-gray-400 mt-2">
          Interactive security demonstrations and simulations
        </p>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-4">
            {demos.map((demo) => (
              <Button
                key={demo.name}
                variant={selected === demo.name ? "secondary" : "ghost"}
                className={`w-full justify-start mb-2 text-seccode-light ${
                  selected === demo.name 
                    ? 'bg-seccode-cyan/20 text-seccode-cyan hover:bg-seccode-cyan/30' 
                    : 'hover:bg-seccode-purple/10'
                }`}
                onClick={() => handleSelect(demo.name)}
              >
                <span className="mr-2">{demo.icon}</span>
                {demo.name}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default Sidebar;