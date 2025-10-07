import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, RefreshCw, Check } from 'lucide-react';
import { KeyGenerator, useKeyGenerator, GeneratorOptions } from '../hooks/useKeyGenerator';

interface GeneratorPageProps {
  generator: KeyGenerator;
}

export function GeneratorPage({ generator }: GeneratorPageProps) {
  const { generatedKey, isGenerating, generateKey, copyToClipboard, copiedKey } = useKeyGenerator();
  const [options, setOptions] = useState<GeneratorOptions>(generator.defaultOptions);

  useEffect(() => {
    // Generate initial key on page load
    generateKey(generator, options);
  }, [generator, generateKey, options]);

  const handleGenerate = () => {
    generateKey(generator, options);
  };

  const handleCopy = () => {
    copyToClipboard(generatedKey);
  };

  const renderOptions = () => {
    const { id } = generator;
    
    switch (id) {
      case 'secret-key':
      case 'api-key':
      case 'random-string':
      case 'base64':
      case 'alphanumeric':
      case 'numeric':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Length: {options.length || generator.defaultOptions.length}
              </label>
              <input
                type="range"
                min="8"
                max="128"
                value={options.length || generator.defaultOptions.length || 32}
                onChange={(e) => setOptions({...options, length: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>8</span>
                <span>128</span>
              </div>
            </div>
            
            {id === 'api-key' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Prefix (optional)
                </label>
                <input
                  type="text"
                  value={options.prefix || ''}
                  onChange={(e) => setOptions({...options, prefix: e.target.value})}
                  placeholder="e.g., api, sk, pk"
                  className="input-field"
                />
              </div>
            )}
            
            {id === 'random-string' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Character Set
                </label>
                <select
                  value={options.format || 'alphanumeric'}
                  onChange={(e) => setOptions({...options, format: e.target.value})}
                  className="input-field"
                >
                  <option value="alphanumeric">Alphanumeric</option>
                  <option value="letters">Letters Only</option>
                  <option value="numbers">Numbers Only</option>
                  <option value="hex">Hexadecimal</option>
                </select>
              </div>
            )}
          </div>
        );
        
      case 'password':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Length: {options.length || 16}
              </label>
              <input
                type="range"
                min="8"
                max="64"
                value={options.length || 16}
                onChange={(e) => setOptions({...options, length: parseInt(e.target.value)})}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>8</span>
                <span>64</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeUppercase !== false}
                  onChange={(e) => setOptions({...options, includeUppercase: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Uppercase</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeLowercase !== false}
                  onChange={(e) => setOptions({...options, includeLowercase: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Lowercase</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeNumbers !== false}
                  onChange={(e) => setOptions({...options, includeNumbers: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Numbers</span>
              </label>
              
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={options.includeSymbols !== false}
                  onChange={(e) => setOptions({...options, includeSymbols: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Symbols</span>
              </label>
            </div>
          </div>
        );
        
      case 'uuid':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              UUID Version
            </label>
            <select
              value={options.format || 'v4'}
              onChange={(e) => setOptions({...options, format: e.target.value})}
              className="input-field"
            >
              <option value="v4">Version 4 (Random)</option>
              <option value="v1">Version 1 (Time-based)</option>
            </select>
          </div>
        );
        
      case 'mac-address':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Format
            </label>
            <select
              value={options.format || 'colon'}
              onChange={(e) => setOptions({...options, format: e.target.value})}
              className="input-field"
            >
              <option value="colon">Colon (00:11:22:33:44:55)</option>
              <option value="hyphen">Hyphen (00-11-22-33-44-55)</option>
              <option value="dot">Dot (0011.2233.4455)</option>
            </select>
          </div>
        );
        
      case 'jwt-secret':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Length: {options.length || 64}
            </label>
            <input
              type="range"
              min="32"
              max="128"
              value={options.length || 64}
              onChange={(e) => setOptions({...options, length: parseInt(e.target.value)})}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>32</span>
              <span>128</span>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8"
      >
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {generator.name} Generator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {generator.description}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Generator Options */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Options
            </h2>
            {renderOptions()}
          </div>
        </motion.div>

        {/* Generated Key */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Generated {generator.name}
            </h2>
            
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={generatedKey}
                  readOnly
                  className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={isGenerating ? 'Generating...' : 'Your generated key will appear here'}
                />
                
                {generator.id === 'hex-color' && generatedKey && (
                  <div className="absolute top-4 right-4 w-8 h-8 rounded border border-gray-300 dark:border-gray-600" 
                       style={{ backgroundColor: generatedKey }} />
                )}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="btn-primary flex items-center space-x-2 flex-1"
                >
                  <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>{isGenerating ? 'Generating...' : 'Generate New'}</span>
                </button>
                
                <button
                  onClick={handleCopy}
                  disabled={!generatedKey || isGenerating}
                  className="btn-secondary flex items-center space-x-2"
                >
                  {copiedKey === generatedKey ? (
                    <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span>{copiedKey === generatedKey ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
      >
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            <div className="p-1 bg-blue-100 dark:bg-blue-800 rounded-full">
              <div className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full" />
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">Security Notice</h3>
            <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
              This {generator.name.toLowerCase()} is generated using cryptographically secure methods in your browser. 
              No data is transmitted to our servers, ensuring complete privacy and security.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}