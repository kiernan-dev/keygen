import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Key, Shield, Hash, Lock, Palette, Code, Type, Hash as HashIcon, Wifi } from 'lucide-react';
import { KeyGenerator } from '../hooks/useKeyGenerator';

interface GeneratorCardProps {
  generator: KeyGenerator;
}

const getGeneratorIcon = (id: string) => {
  switch (id) {
    case 'secret-key':
      return Key;
    case 'api-key':
      return Code;
    case 'password':
      return Lock;
    case 'jwt-secret':
      return Shield;
    case 'uuid':
      return Hash;
    case 'random-string':
      return Type;
    case 'hex-color':
      return Palette;
    case 'base64':
      return Code;
    case 'alphanumeric':
      return Type;
    case 'numeric':
      return HashIcon;
    case 'mac-address':
      return Wifi;
    default:
      return Key;
  }
};

export function GeneratorCard({ generator }: GeneratorCardProps) {
  const Icon = getGeneratorIcon(generator.id);
  
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <Link
        to={`/${generator.id}`}
        className="block card p-6 hover:shadow-lg transition-all duration-200 h-full"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/30 transition-colors duration-200">
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {generator.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          {generator.description}
        </p>
      </Link>
    </motion.div>
  );
}