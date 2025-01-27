import React, { useState } from 'react';

const CodeViewer = ({ functionName, isDarkMode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  const [copied, setCopied] = useState(false);

  const codeExamples = {
    Fibonacci: {
      python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`,
      
      javascript: `function fibonacci(n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
      
      java: `public static int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}`,
      
      cpp: `int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}`
    },

    Factorial: {
      python: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)`,
      
      javascript: `function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}`,
      
      java: `public static int factorial(int n) {
    if (n == 0) {
        return 1;
    }
    return n * factorial(n - 1);
}`,
      
      cpp: `int factorial(int n) {
    if (n == 0) {
        return 1;
    }
    return n * factorial(n - 1);
}`
    },

    GCD: {
      python: `def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)`,
      
      javascript: `function gcd(a, b) {
    if (b === 0) {
        return a;
    }
    return gcd(b, a % b);
}`,
      
      java: `public static int gcd(int a, int b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}`,
      
      cpp: `int gcd(int a, int b) {
    if (b == 0) {
        return a;
    }
    return gcd(b, a % b);
}`
    },

    TowerOfHanoi: {
      python: `def tower_of_hanoi(n, source='A', auxiliary='B', target='C'):
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    tower_of_hanoi(n - 1, source, target, auxiliary)
    print(f"Move disk {n} from {source} to {target}")
    tower_of_hanoi(n - 1, auxiliary, source, target)`,
      
      javascript: `function towerOfHanoi(n, source='A', auxiliary='B', target='C') {
    if (n === 1) {
        console.log(\`Move disk 1 from \${source} to \${target}\`);
        return;
    }
    towerOfHanoi(n - 1, source, target, auxiliary);
    console.log(\`Move disk \${n} from \${source} to \${target}\`);
    towerOfHanoi(n - 1, auxiliary, source, target);
}`,
      
      java: `public static void towerOfHanoi(int n, char source, char auxiliary, char target) {
    if (n == 1) {
        System.out.println("Move disk 1 from " + source + " to " + target);
        return;
    }
    towerOfHanoi(n - 1, source, target, auxiliary);
    System.out.println("Move disk " + n + " from " + source + " to " + target);
    towerOfHanoi(n - 1, auxiliary, source, target);
}`,
      
      cpp: `void towerOfHanoi(int n, char source='A', char auxiliary='B', char target='C') {
    if (n == 1) {
        cout << "Move disk 1 from " << source << " to " << target << endl;
        return;
    }
    towerOfHanoi(n - 1, source, target, auxiliary);
    cout << "Move disk " << n << " from " << source << " to " << target << endl;
    towerOfHanoi(n - 1, auxiliary, source, target);
}`
    }
  };

  const languageOptions = [
    { value: 'python', label: 'Python', icon: '🐍' },
    { value: 'javascript', label: 'JavaScript', icon: '📜' },
    { value: 'java', label: 'Java', icon: '☕' },
    { value: 'cpp', label: 'C++', icon: '⚡' }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeExamples[functionName][selectedLanguage]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden">
      <div className={`flex justify-between items-center p-3 border-b
        ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <h2 className={`text-lg font-semibold
          ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Code Implementation
        </h2>
        <div className="flex items-center space-x-2">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors duration-200
              ${isDarkMode 
                ? 'bg-gray-700 text-white border-gray-600' 
                : 'bg-white text-gray-800 border-gray-300'}
              border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {languageOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.icon} {option.label}
              </option>
            ))}
          </select>
          <button
            onClick={copyToClipboard}
            className={`p-1.5 rounded-md transition-colors duration-200
              ${isDarkMode 
                ? 'hover:bg-gray-700 text-gray-300' 
                : 'hover:bg-gray-100 text-gray-600'}`}
            title="Copy code"
          >
            {copied ? (
              <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-auto p-4 font-mono text-sm whitespace-pre
        ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
        {codeExamples[functionName]?.[selectedLanguage] || 
         '// Select a function to view its implementation'}
      </div>
    </div>
  );
};

export default CodeViewer; 