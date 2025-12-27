import ReactMarkdown from 'react-markdown';

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
      <div className="prose prose-invert prose-blue max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl mb-4 text-white border-b border-gray-700 pb-2">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl mt-6 mb-3 text-white border-b border-gray-700 pb-2">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl mt-4 mb-2 text-white">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="text-gray-300 mb-4 leading-relaxed">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 text-gray-300 space-y-1">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-1">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="text-gray-300">
                {children}
              </li>
            ),
            code: ({ className, children }) => {
              const isInline = !className;
              return isInline ? (
                <code className="bg-gray-800 text-blue-400 px-1.5 py-0.5 rounded text-sm">
                  {children}
                </code>
              ) : (
                <code className="block bg-gray-800 text-gray-300 p-4 rounded-lg overflow-x-auto text-sm">
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <pre className="bg-gray-800 rounded-lg overflow-hidden mb-4">
                {children}
              </pre>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline"
              >
                {children}
              </a>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
                {children}
              </blockquote>
            ),
            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt}
                className="rounded-lg my-4 max-w-full h-auto"
              />
            ),
            hr: () => (
              <hr className="border-gray-700 my-6" />
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
