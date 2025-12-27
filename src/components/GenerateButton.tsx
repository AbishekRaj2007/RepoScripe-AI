import { Sparkles } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function GenerateButton({ onClick, isLoading }: GenerateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group shadow-lg hover:shadow-blue-500/50"
    >
      <Sparkles className={`w-5 h-5 ${isLoading ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'}`} />
      <span>{isLoading ? 'Generating...' : 'Generate README'}</span>
    </button>
  );
}
