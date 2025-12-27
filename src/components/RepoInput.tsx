import { Github, AlertCircle } from 'lucide-react';

interface RepoInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function RepoInput({ value, onChange, error }: RepoInputProps) {
  return (
    <div className="mb-6">
      <label htmlFor="repo-url" className="block text-sm mb-2 text-gray-300">
        GitHub Repository URL
      </label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Github className="w-5 h-5" />
        </div>
        <input
          id="repo-url"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://github.com/username/repository"
          className={`w-full bg-gray-700/50 border ${
            error ? 'border-red-500' : 'border-gray-600'
          } text-white rounded-lg pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-500`}
        />
      </div>
      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-400 text-sm animate-fadeIn">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
      <p className="mt-2 text-xs text-gray-400">
        Example: https://github.com/facebook/react
      </p>
    </div>
  );
}
