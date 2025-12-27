import { Github, Sparkles } from 'lucide-react';

interface HeaderProps {
  onNavigate: () => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-white">RepoScribe AI</span>
          </div>
          
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-gray-300 hover:text-white transition-colors hidden md:block"
            >
              Home
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-300 hover:text-white transition-colors hidden md:block"
            >
              How it Works
            </a>
            <button
              onClick={onNavigate}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              Generate
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
