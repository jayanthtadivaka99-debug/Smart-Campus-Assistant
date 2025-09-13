import React from 'react';

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const prompts = [
  "What are the library hours?",
  "Tell me about the CS101 course schedule.",
  "Where can I find the Byte Cafe?",
  "When is the deadline to register for Fall 2024?",
];

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptClick }) => {
  return (
    <div className="px-4 py-8 md:py-12 flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl font-bold mb-2 text-gray-700 dark:text-gray-200">Welcome to the Stanford AI Assistant!</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">How can I help you today? Here are some suggestions:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt)}
            className="p-4 bg-white dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
          >
            <p className="font-semibold text-gray-700 dark:text-gray-200">{prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;