import { Brain, Code, FileText, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const loadingSteps = [
  { icon: Code, text: 'Analyzing repository structure...' },
  { icon: Brain, text: 'Processing with AI...' },
  { icon: FileText, text: 'Generating README content...' },
  { icon: Sparkles, text: 'Adding final touches...' },
];

export function Loader() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 750);

    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <div className="mb-12 animate-fadeIn">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-12 shadow-2xl">
        <div className="flex flex-col items-center justify-center">
          {/* Animated Icon */}
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
              <CurrentIcon className="w-10 h-10 text-white" />
            </div>
            <div className="absolute inset-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
          </div>

          {/* Loading Text */}
          <p className="text-xl text-white mb-6 animate-fadeIn">
            {loadingSteps[currentStep].text}
          </p>

          {/* Progress Dots */}
          <div className="flex gap-2">
            {loadingSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? 'w-8 bg-blue-500'
                    : 'w-2 bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full max-w-md mt-8">
            <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 animate-progress"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
