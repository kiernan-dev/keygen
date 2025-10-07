import { useState, useCallback } from 'react';

export interface GeneratorOptions {
  length?: number;
  includeSymbols?: boolean;
  includeNumbers?: boolean;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  prefix?: string;
  format?: string;
}

export interface KeyGenerator {
  id: string;
  name: string;
  description: string;
  defaultOptions: GeneratorOptions;
  generate: (options?: GeneratorOptions) => string;
}

// Cryptographically secure random generator
const getSecureRandomBytes = (length: number): Uint8Array => {
  if (crypto && crypto.getRandomValues) {
    return crypto.getRandomValues(new Uint8Array(length));
  } else {
    // Fallback for older browsers (less secure)
    console.warn('Web Crypto API not available. Using Math.random() fallback.');
    const array = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  }
};

const generateSecureString = (charset: string, length: number): string => {
  const randomBytes = getSecureRandomBytes(length * 2); // Get more bytes than needed
  let result = '';
  let randomIndex = 0;
  
  while (result.length < length && randomIndex < randomBytes.length - 1) {
    const randomValue = (randomBytes[randomIndex] << 8) | randomBytes[randomIndex + 1];
    const charIndex = randomValue % charset.length;
    result += charset[charIndex];
    randomIndex += 2;
  }
  
  // If we need more characters, generate more bytes
  if (result.length < length) {
    const additionalBytes = getSecureRandomBytes((length - result.length) * 2);
    for (let i = 0; i < additionalBytes.length - 1 && result.length < length; i += 2) {
      const randomValue = (additionalBytes[i] << 8) | additionalBytes[i + 1];
      const charIndex = randomValue % charset.length;
      result += charset[charIndex];
    }
  }
  
  return result.substring(0, length);
};

const generateUUID = (version: 'v1' | 'v4' = 'v4'): string => {
  if (version === 'v4') {
    if (crypto && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    
    // Fallback UUID v4 generation
    const randomBytes = getSecureRandomBytes(16);
    randomBytes[6] = (randomBytes[6] & 0x0f) | 0x40; // Version 4
    randomBytes[8] = (randomBytes[8] & 0x3f) | 0x80; // Variant bits
    
    const hex = Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    return [
      hex.substring(0, 8),
      hex.substring(8, 12),
      hex.substring(12, 16),
      hex.substring(16, 20),
      hex.substring(20, 32)
    ].join('-');
  }
  
  // UUID v1 (time-based) - simplified implementation
  const timestamp = Date.now();
  const randomBytes = getSecureRandomBytes(10);
  
  const hex = timestamp.toString(16).padStart(12, '0') + 
    Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
  
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    '1' + hex.substring(13, 16), // Version 1
    '8' + hex.substring(17, 20), // Variant bits
    hex.substring(20, 32)
  ].join('-');
};

const generateMacAddress = (format: string = 'colon'): string => {
  const randomBytes = getSecureRandomBytes(6);
  const hex = Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0').toUpperCase())
    .join('');
  
  switch (format) {
    case 'hyphen':
      return hex.match(/.{2}/g)?.join('-') || '';
    case 'dot':
      return hex.match(/.{4}/g)?.join('.') || '';
    case 'colon':
    default:
      return hex.match(/.{2}/g)?.join(':') || '';
  }
};

export const keyGenerators: KeyGenerator[] = [
  {
    id: 'secret-key',
    name: 'Secret Key',
    description: 'Generate cryptographically secure secret keys',
    defaultOptions: { length: 32 },
    generate: (options = {}) => {
      const { length = 32 } = options;
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      return generateSecureString(charset, length);
    }
  },
  {
    id: 'api-key',
    name: 'API Key',
    description: 'Generate random API keys for applications',
    defaultOptions: { length: 40, prefix: '' },
    generate: (options = {}) => {
      const { length = 40, prefix = '' } = options;
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const key = generateSecureString(charset, length);
      return prefix ? `${prefix}_${key}` : key;
    }
  },
  {
    id: 'password',
    name: 'Password',
    description: 'Generate strong random passwords',
    defaultOptions: { length: 16, includeSymbols: true, includeNumbers: true, includeUppercase: true, includeLowercase: true },
    generate: (options = {}) => {
      const { 
        length = 16, 
        includeSymbols = true, 
        includeNumbers = true, 
        includeUppercase = true, 
        includeLowercase = true 
      } = options;
      
      let charset = '';
      if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
      if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (includeNumbers) charset += '0123456789';
      if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
      
      if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';
      
      return generateSecureString(charset, length);
    }
  },
  {
    id: 'jwt-secret',
    name: 'JWT Secret',
    description: 'Generate secure keys for JWT token signing',
    defaultOptions: { length: 64 },
    generate: (options = {}) => {
      const { length = 64 } = options;
      const randomBytes = getSecureRandomBytes(length);
      return btoa(String.fromCharCode(...randomBytes)).replace(/[+/]/g, c => c === '+' ? '-' : '_').replace(/=/g, '');
    }
  },
  {
    id: 'uuid',
    name: 'UUID',
    description: 'Generate RFC 4122 compliant UUIDs',
    defaultOptions: { format: 'v4' },
    generate: (options = {}) => {
      const { format = 'v4' } = options;
      return generateUUID(format as 'v1' | 'v4');
    }
  },
  {
    id: 'random-string',
    name: 'Random String',
    description: 'Generate random strings with custom character sets',
    defaultOptions: { length: 20, format: 'alphanumeric' },
    generate: (options = {}) => {
      const { length = 20, format = 'alphanumeric' } = options;
      
      let charset = '';
      switch (format) {
        case 'letters':
          charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
          break;
        case 'numbers':
          charset = '0123456789';
          break;
        case 'hex':
          charset = '0123456789ABCDEF';
          break;
        case 'alphanumeric':
        default:
          charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          break;
      }
      
      return generateSecureString(charset, length);
    }
  },
  {
    id: 'hex-color',
    name: 'Hex Color',
    description: 'Generate random hexadecimal color codes',
    defaultOptions: {},
    generate: () => {
      const randomBytes = getSecureRandomBytes(3);
      return '#' + Array.from(randomBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }
  },
  {
    id: 'base64',
    name: 'Base64',
    description: 'Generate random Base64 encoded strings',
    defaultOptions: { length: 32 },
    generate: (options = {}) => {
      const { length = 32 } = options;
      const randomBytes = getSecureRandomBytes(Math.ceil(length * 3 / 4));
      return btoa(String.fromCharCode(...randomBytes)).substring(0, length);
    }
  },
  {
    id: 'alphanumeric',
    name: 'Alphanumeric',
    description: 'Generate random alphanumeric strings',
    defaultOptions: { length: 20 },
    generate: (options = {}) => {
      const { length = 20 } = options;
      const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      return generateSecureString(charset, length);
    }
  },
  {
    id: 'numeric',
    name: 'Numeric',
    description: 'Generate random numeric strings',
    defaultOptions: { length: 10 },
    generate: (options = {}) => {
      const { length = 10 } = options;
      const charset = '0123456789';
      return generateSecureString(charset, length);
    }
  },
  {
    id: 'mac-address',
    name: 'MAC Address',
    description: 'Generate random MAC addresses',
    defaultOptions: { format: 'colon' },
    generate: (options = {}) => {
      const { format = 'colon' } = options;
      return generateMacAddress(format);
    }
  }
];

export function useKeyGenerator() {
  const [generatedKey, setGeneratedKey] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const generateKey = useCallback((generator: KeyGenerator, options?: GeneratorOptions) => {
    setIsGenerating(true);
    
    // Add small delay to show loading state
    setTimeout(() => {
      try {
        const key = generator.generate({ ...generator.defaultOptions, ...options });
        setGeneratedKey(key);
      } catch (error) {
        console.error('Key generation failed:', error);
        setGeneratedKey('Error generating key');
      }
      setIsGenerating(false);
    }, 100);
  }, []);

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(text);
      setTimeout(() => setCopiedKey(null), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }, []);

  return {
    generatedKey,
    setGeneratedKey,
    isGenerating,
    generateKey,
    copyToClipboard,
    copiedKey,
    generators: keyGenerators
  };
}