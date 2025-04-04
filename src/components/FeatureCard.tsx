
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay: number;
}

const FeatureCard = ({ title, description, icon: Icon, delay }: FeatureCardProps) => {
  return (
    <div 
      className="relative group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-seccode-cyan to-seccode-purple rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
      <div className="relative bg-seccode-blue border border-seccode-blue/50 p-6 rounded-lg hover:border-seccode-cyan/30 transition-colors duration-300 h-full flex flex-col">
        <div className="p-2 bg-seccode-dark/40 rounded-lg w-fit mb-4">
          <Icon className="h-6 w-6 text-seccode-cyan" />
        </div>
        <h3 className="text-xl font-medium text-white mb-2">{title}</h3>
        <p className="text-gray-300 text-sm flex-grow">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
