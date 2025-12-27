import { Copy, Download, RefreshCw, Check } from 'lucide-react';
import { useState } from 'react';

interface ActionButtonsProps {
  content: string;
  onRegenerate: () => void;
}

export function ActionButtons({ content, onRegenerate }: ActionButtonsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            <span>Copy</span>
          </>
        )}
      </button>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
      >
        <Download className="w-4 h-4" />
        <span>Download</span>
      </button>

      <button
        onClick={onRegenerate}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Regenerate</span>
      </button>
    </div>
  );
}
