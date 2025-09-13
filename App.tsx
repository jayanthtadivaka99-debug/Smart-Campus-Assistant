import React from 'react';
import ChatWindow from './components/ChatWindow';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <div className="flex flex-col h-screen">
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex items-center space-x-4 sticky top-0 z-10">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3.5a1 1 0 00.02 1.84L10 10.4l7.374-2.98a1 1 0 00.02-1.84l-7-3.5zM10 11.582L2.626 8.602 10 11.582l7.374-2.98L10 11.582zM10 12.828L2.626 9.848 10 12.828l7.374-2.98L10 12.828zM10 14.074L2.626 11.094 10 14.074l7.374-2.98L10 14.074zM10 15.32L2.626 12.34 10 15.32l7.374-2.98L10 15.32zM10 16.566L2.626 13.586 10 16.566l7.374-2.98L10 16.566z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">Stanford University AI Assistant</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Your guide to all things on campus</p>
          </div>
        </header>
        <main className="flex-1 overflow-hidden">
          <ChatWindow />
        </main>
      </div>
    </div>
  );
};

export default App;