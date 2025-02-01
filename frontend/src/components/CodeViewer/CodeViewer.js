import React, { useState } from 'react';

const CodeViewer = ({ functionName, isDarkMode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('python');
  

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
      
      java: `public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
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
      
      java: `public class Factorial {
    public static int factorial(int n) {
        if (n == 0) {
            return 1;
        }
        return n * factorial(n - 1);
    }
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
      
      java: `public class GCD {
    public static int gcd(int a, int b) {
        if (b == 0) {
            return a;
        }
        return gcd(b, a % b);
    }
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
      
      java: `public class TowerOfHanoi {
    public static void towerOfHanoi(int n, char source, char auxiliary, char target) {
        if (n == 1) {
            System.out.println("Move disk 1 from " + source + " to " + target);
            return;
        }
        towerOfHanoi(n - 1, source, target, auxiliary);
        System.out.println("Move disk " + n + " from " + source + " to " + target);
        towerOfHanoi(n - 1, auxiliary, source, target);
    }
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
    },

    Power: {
      python: `def power(base, exponent):
    if exponent == 0:
        return 1
    return base * power(base, exponent - 1)`,
      
      javascript: `function power(base, exponent) {
    if (exponent === 0) {
        return 1;
    }
    return base * power(base, exponent - 1);
}`,
      
      java: `public class Power {
    public static int power(int base, int exponent) {
        if (exponent == 0) {
            return 1;
        }
        return base * power(base, exponent - 1);
    }
}`,
      
      cpp: `int power(int base, int exponent) {
    if (exponent == 0) {
        return 1;
    }
    return base * power(base, exponent - 1);
}`
    },

    BinarySearch: {
      python: `def binary_search(arr, target, left, right):
    if left > right:
        return -1
    
    mid = (left + right) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        return binary_search(arr, target, left, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, right)`,
      
      javascript: `function binarySearch(arr, target, left, right) {
    if (left > right) {
        return -1;
    }
    
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
        return mid;
    } else if (arr[mid] > target) {
        return binarySearch(arr, target, left, mid - 1);
    } else {
        return binarySearch(arr, target, mid + 1, right);
    }
}`,
      
      java: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target, int left, int right) {
        if (left > right) {
            return -1;
        }
        
        int mid = (left + right) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] > target) {
            return binarySearch(arr, target, left, mid - 1);
        } else {
            return binarySearch(arr, target, mid + 1, right);
        }
    }
}`,
      
      cpp: `int binarySearch(int arr[], int target, int left, int right) {
    if (left > right) {
        return -1;
    }
    
    int mid = (left + right) / 2;
    if (arr[mid] == target) {
        return mid;
    } else if (arr[mid] > target) {
        return binarySearch(arr, target, left, mid - 1);
    } else {
        return binarySearch(arr, target, mid + 1, right);
    }
}`
    },

    ArraySum: {
      python: `def array_sum(arr, n):
    if n <= 0:
        return 0
    return arr[n-1] + array_sum(arr, n-1)`,
      
      javascript: `function arraySum(arr, n) {
    if (n <= 0) {
        return 0;
    }
    return arr[n-1] + arraySum(arr, n-1);
}`,
      
      java: `public class ArraySum {
    public static int arraySum(int[] arr, int n) {
        if (n <= 0) {
            return 0;
        }
        return arr[n-1] + arraySum(arr, n-1);
    }
}`,
      
      cpp: `int arraySum(int arr[], int n) {
    if (n <= 0) {
        return 0;
    }
    return arr[n-1] + arraySum(arr, n-1);
}`
    }
  };

  const languageOptions = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' }
  ];



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
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={`flex-1 overflow-auto p-4 font-mono text-sm whitespace-pre
        ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
        {codeExamples[functionName]?.[selectedLanguage] || 
         'Select a function to view its implementation'}
      </div>
    </div>
  );
};

export default CodeViewer;