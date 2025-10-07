import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock, Smartphone, Eye, Github } from 'lucide-react';
import { GeneratorCard } from '../components/GeneratorCard';
import { QuickGenerator } from '../components/QuickGenerator';
import { keyGenerators } from '../hooks/useKeyGenerator';

export function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      icon: Lock,
      title: 'Cryptographically Secure',
      description: 'All keys are generated using cryptographically secure random number generators, ensuring maximum security for your applications.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Generate keys instantly in your browser. No server requests, no waiting time, no dependencies - just pure speed.'
    },
    {
      icon: Eye,
      title: 'Privacy First',
      description: 'Your keys are generated locally in your browser. We never store, transmit, or have access to any generated keys.'
    },
    {
      icon: Shield,
      title: 'Multiple Formats',
      description: 'Support for various key formats including API keys, JWT secrets, UUIDs, passwords, and more specialized formats.'
    },
    {
      icon: Github,
      title: 'Customizable',
      description: 'Adjust key length, character sets, and other parameters to match your specific requirements and security policies.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Works perfectly on all devices. Generate keys on your phone, tablet, or desktop with the same great experience.'
    }
  ];

  const faqs = [
    {
      question: 'Are the generated keys cryptographically secure?',
      answer: 'Yes! All keys are generated using the Web Crypto API\'s cryptographically secure random number generator (CSPRNG) when available, ensuring maximum security for production use.'
    },
    {
      question: 'Do you store or transmit any generated keys?',
      answer: 'No, absolutely not. All key generation happens locally in your browser. We never store, log, or transmit any generated keys or data.'
    },
    {
      question: 'What happens if my browser doesn\'t support Web Crypto API?',
      answer: 'The tool will fall back to Math.random() with a security warning. However, all modern browsers support the Web Crypto API for secure generation.'
    },
    {
      question: 'Can I use these keys in production applications?',
      answer: 'Yes! The keys generated using Web Crypto API are suitable for production use, including API keys, JWT secrets, and other security-critical applications.'
    },
    {
      question: 'What formats are supported?',
      answer: 'We support secret keys, API keys, passwords, JWT secrets, UUIDs (v1 & v4), random strings, hex colors, Base64, alphanumeric, numeric, and MAC addresses.'
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Hero Section */}
      <motion.div variants={itemVariants} className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Key Generator
          </span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
          Create cryptographically secure keys, passwords, and tokens for your applications. 
          Fast, secure, and completely free.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
            <Lock className="w-4 h-4" />
            <span>Cryptographically Secure</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium">
            <Eye className="w-4 h-4" />
            <span>No Data Stored</span>
          </div>
          <div className="flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 rounded-full text-sm font-medium">
            <Github className="w-4 h-4" />
            <span>Open Source</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Access */}
      <motion.section variants={itemVariants} className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Quick Access</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Generate keys instantly without leaving this page
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyGenerators.slice(0, 6).map((generator) => (
            <QuickGenerator key={generator.id} generator={generator} />
          ))}
        </div>
      </motion.section>

      {/* Specialized Generators */}
      <motion.section variants={itemVariants} className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Specialized Key Generators</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Choose from our collection of specialized generators for different use cases and requirements.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {keyGenerators.map((generator) => (
            <GeneratorCard key={generator.id} generator={generator} />
          ))}
        </div>
      </motion.section>

      {/* Features */}
      <motion.section variants={itemVariants} className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why Use Our Key Generator?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Secure, fast, and reliable key generation for all your development needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="card p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg mr-4">
                  <feature.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section variants={itemVariants}>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Everything you need to know about our key generation tool.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              className="card p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}