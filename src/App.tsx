import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { GeneratorPage } from './pages/GeneratorPage';
import { keyGenerators } from './hooks/useKeyGenerator';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {keyGenerators.map(generator => (
            <Route 
              key={generator.id}
              path={`/${generator.id.replace('-', '-')}`}
              element={<GeneratorPage generator={generator} />}
            />
          ))}
          {/* Legacy URLs for compatibility */}
          <Route path="/random-jwt-secret-key-generator" element={<GeneratorPage generator={keyGenerators.find(g => g.id === 'jwt-secret')!} />} />
          <Route path="/random-password-generator" element={<GeneratorPage generator={keyGenerators.find(g => g.id === 'password')!} />} />
          <Route path="/random-api-key-generator" element={<GeneratorPage generator={keyGenerators.find(g => g.id === 'api-key')!} />} />
          <Route path="/random-secret-key-generator" element={<GeneratorPage generator={keyGenerators.find(g => g.id === 'secret-key')!} />} />
          <Route path="/uuid-generator" element={<GeneratorPage generator={keyGenerators.find(g => g.id === 'uuid')!} />} />
          <Route path="/random-string-generator" element={<GeneratorPage generator={keyGenerators.find(g => g.id === 'random-string')!} />} />
          <Route path="/hex-color-generator" element={<GeneratorPage generator={keyGenerators.find(g => g.id === 'hex-color')!} />} />
          <Route path="/base64-generator" element={<GeneratorPage generator={keyGenerators.find(g => g.id === 'base64')!} />} />
          <Route path="/alphanumeric-generator" element={<GeneratorPage generator={keyGenerators.find(g => g.id === 'alphanumeric')!} />} />
          <Route path="/numeric-generator" element={<GeneratorPage generator={keyGenerators.find(g => g.id === 'numeric')!} />} />
          <Route path="/mac-address-generator" element={<GeneratorPage generator={keyGenerators.find(g => g.id === 'mac-address')!} />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}

export default App;