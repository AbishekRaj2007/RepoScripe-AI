import { useState } from 'react';
import { Header } from './components/Header';
import { RepoInput } from './components/RepoInput';
import { GenerateButton } from './components/GenerateButton';
import { Loader } from './components/Loader';
import { MarkdownPreview } from './components/MarkdownPreview';
import { ActionButtons } from './components/ActionButtons';

type ReadmeStyle = 'professional' | 'minimal' | 'startup';

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedReadme, setGeneratedReadme] = useState('');
  const [error, setError] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<ReadmeStyle>('professional');

  const validateGitHubUrl = (url: string): boolean => {
    const githubUrlPattern = /^https?:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?$/;
    return githubUrlPattern.test(url.trim());
  };

  const handleGenerate = async () => {
    setError('');
    
    if (!repoUrl.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    if (!validateGitHubUrl(repoUrl)) {
      setError('Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo)');
      return;
    }

    setIsLoading(true);
    setGeneratedReadme('');

    try {
      // Mock API call - replace with actual backend endpoint
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repoUrl: repoUrl.trim(),
          style: selectedStyle,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate README');
      }

      const data = await response.json();
      
      // Simulated delay and mock response for demo purposes
      setTimeout(() => {
        setGeneratedReadme(getMockReadme(repoUrl, selectedStyle));
        setIsLoading(false);
      }, 3000);
      
    } catch (err) {
      // For demo purposes, generate mock README even on "error"
      setTimeout(() => {
        setGeneratedReadme(getMockReadme(repoUrl, selectedStyle));
        setIsLoading(false);
      }, 3000);
    }
  };

  const getMockReadme = (url: string, style: ReadmeStyle): string => {
    const repoName = url.split('/').pop()?.replace('.git', '') || 'Repository';
    
    const professionalReadme = `# ${repoName}

![GitHub stars](https://img.shields.io/github/stars/username/${repoName})
![GitHub forks](https://img.shields.io/github/forks/username/${repoName})
![GitHub issues](https://img.shields.io/github/issues/username/${repoName})
![License](https://img.shields.io/github/license/username/${repoName})

## 📋 Overview

A comprehensive and well-documented project that showcases modern development practices and clean architecture.

## ✨ Features

- **Feature 1**: Comprehensive functionality with modern approach
- **Feature 2**: Optimized performance and scalability
- **Feature 3**: Clean and maintainable codebase
- **Feature 4**: Extensive testing coverage

## 🚀 Getting Started

### Prerequisites

\`\`\`bash
node >= 16.0.0
npm >= 8.0.0
\`\`\`

### Installation

\`\`\`bash
# Clone the repository
git clone ${url}

# Navigate to project directory
cd ${repoName}

# Install dependencies
npm install

# Start the application
npm start
\`\`\`

## 🛠️ Tech Stack

- React
- TypeScript
- Tailwind CSS
- Node.js

## 📖 Documentation

For detailed documentation, please visit our [Wiki](${url}/wiki).

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Maintainer** - [GitHub Profile](https://github.com/username)

## 🙏 Acknowledgments

Special thanks to all contributors who have helped shape this project.`;

    const minimalReadme = `# ${repoName}

> A clean and minimal project

## Install

\`\`\`bash
npm install
\`\`\`

## Usage

\`\`\`bash
npm start
\`\`\`

## Features

- Simple and effective
- Easy to use
- Well documented

## License

MIT`;

    const startupReadme = `# 🚀 ${repoName}

**The next big thing in tech** 🌟

[![GitHub stars](https://img.shields.io/github/stars/username/${repoName})](${url}/stargazers)
[![Twitter Follow](https://img.shields.io/twitter/follow/username?style=social)](https://twitter.com/username)

## 💡 What is ${repoName}?

We're revolutionizing the way developers work. ${repoName} is the ultimate solution for modern development teams.

### 🎯 Why ${repoName}?

- ⚡ **Lightning Fast**: Optimized for maximum performance
- 🎨 **Beautiful UI**: Stunning interface that developers love
- 🔒 **Secure**: Enterprise-grade security built-in
- 🌍 **Global Scale**: Built to scale from day one

## 🎬 Quick Start

Get up and running in 60 seconds:

\`\`\`bash
git clone ${url}
cd ${repoName}
npm install && npm start
\`\`\`

## 🌈 Features

✅ Modern architecture  
✅ Real-time updates  
✅ Cloud-native  
✅ API-first design  

## 🏗️ Built With

The latest and greatest technologies:

- React ⚛️
- TypeScript 💙
- Tailwind CSS 🎨

## 🤝 Join Us

We're building the future together. Star ⭐ this repo and follow our journey!

## 📬 Contact

- Website: [website.com](https://website.com)
- Twitter: [@username](https://twitter.com/username)
- Email: hello@company.com

---

Made with ❤️ by the ${repoName} team`;

    const readmeStyles = {
      professional: professionalReadme,
      minimal: minimalReadme,
      startup: startupReadme,
    };

    return readmeStyles[style];
  };

  const handleRegenerate = () => {
    if (repoUrl) {
      handleGenerate();
    }
  };

  const scrollToGenerate = () => {
    document.getElementById('generate-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header onNavigate={scrollToGenerate} />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            RepoScribe AI
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Turn any GitHub repo into a professional README
          </p>
          <div className="flex items-center justify-center gap-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              AI-Powered
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Instant Generation
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              Multiple Styles
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="mb-16">
          <h2 className="text-3xl text-center mb-8 text-white">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-blue-400">1</span>
              </div>
              <h3 className="text-lg mb-2 text-white">Paste URL</h3>
              <p className="text-gray-400 text-sm">Enter your GitHub repository URL</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-purple-400">2</span>
              </div>
              <h3 className="text-lg mb-2 text-white">AI Analysis</h3>
              <p className="text-gray-400 text-sm">Our AI analyzes your repository structure</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-green-400">3</span>
              </div>
              <h3 className="text-lg mb-2 text-white">Get README</h3>
              <p className="text-gray-400 text-sm">Download your professional README</p>
            </div>
          </div>
        </section>

        {/* Generate Section */}
        <section id="generate-section" className="mb-12">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-2xl">
            <h2 className="text-2xl mb-6 text-white">Generate Your README</h2>
            
            {/* Style Selector */}
            <div className="mb-6">
              <label className="block text-sm mb-3 text-gray-300">README Style</label>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setSelectedStyle('professional')}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedStyle === 'professional'
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  Professional
                </button>
                <button
                  onClick={() => setSelectedStyle('minimal')}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedStyle === 'minimal'
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  Minimal
                </button>
                <button
                  onClick={() => setSelectedStyle('startup')}
                  className={`px-4 py-2 rounded-lg border transition-all ${
                    selectedStyle === 'startup'
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  Startup
                </button>
              </div>
            </div>

            <RepoInput 
              value={repoUrl} 
              onChange={setRepoUrl}
              error={error}
            />
            
            <GenerateButton 
              onClick={handleGenerate}
              isLoading={isLoading}
            />
          </div>
        </section>

        {/* Loading State */}
        {isLoading && <Loader />}

        {/* Result Section */}
        {generatedReadme && !isLoading && (
          <section className="mb-12 animate-fadeIn">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl text-white">Generated README</h2>
                <ActionButtons 
                  content={generatedReadme}
                  onRegenerate={handleRegenerate}
                />
              </div>
              
              <MarkdownPreview content={generatedReadme} />
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-400 text-sm">
          <p>Built with ❤️ using React & Tailwind CSS</p>
          <p className="mt-2">RepoScribe AI © 2025</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
