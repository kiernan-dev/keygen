import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw, Copy, Check, ExternalLink } from 'lucide-react';
import { KeyGenerator, useKeyGenerator } from '../hooks/useKeyGenerator';

interface QuickGeneratorProps {
  generator: KeyGenerator;
}

export function QuickGenerator({ generator }: QuickGeneratorProps) {
  const { generateKey, copyToClipboard, copiedKey } = useKeyGenerator();
  const [generatedKey, setGeneratedKey] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      try {
        const key = generator.generate(generator.defaultOptions);
        setGeneratedKey(key);
      } catch (error) {
        console.error('Key generation failed:', error);
        setGeneratedKey('Error generating key');
      }
      setIsGenerating(false);
    }, 100);
  };

  const handleCopy = () => {
    copyToClipboard(generatedKey);
  };

  // Generate initial key
  React.useEffect(() => {
    handleGenerate();
  }, [generator]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="card p-6 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
            {generator.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {generator.description}
          </p>
        </div>
        
        <Link
          to={`/${generator.id}`}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 opacity-0 group-hover:opacity-100"
          title="View full generator"
        >
          <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </Link>
      </div>
      
      <div className="space-y-3">
        <div className="relative">
          <div className="min-h-[60px] p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm overflow-hidden">
            {isGenerating ? (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <RefreshCw className="w-4 h-4 animate-spin mr-2" />
                Generating...
              </div>
            ) : (
              <div className="break-all">
                {generatedKey || 'Click generate to create a key'}
              </div>
            )}
          </div>
          
          {generator.id === 'hex-color' && generatedKey && !isGenerating && (
            <div 
              className="absolute top-3 right-3 w-6 h-6 rounded border border-gray-300 dark:border-gray-500"
              style={{ backgroundColor: generatedKey }}
            />
          )}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary flex items-center space-x-2 flex-1 text-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
          </button>
          
          <button
            onClick={handleCopy}
            disabled={!generatedKey || isGenerating}
            className="btn-secondary flex items-center space-x-2 text-sm"
          >
            {copiedKey === generatedKey ? (
              <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">
              {copiedKey === generatedKey ? 'Copied!' : 'Copy'}
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}