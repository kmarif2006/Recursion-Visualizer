import React from 'react';

const CodeViewer = ({ functionName }) => {
  const codeExamples = {
    Fibonacci: `def fibonacci(n):
    
    if n <= 1:
        return n
    
    return fibonacci(n - 1) + fibonacci(n - 2)`,

    Factorial: `def factorial(n):
    
    if n == 0:
        return 1
    
    return n * factorial(n - 1)`,

    SumNatural: `def sum_natural(n):
    
    if n == 0:
        return 0
   
    return n + sum_natural(n - 1)`,

    Power: `def power(base, exponent):
    
    if exponent == 0:
        return 1
    
    return base * power(base, exponent - 1)`,

    ReverseString: `def reverse(s):
    
    if len(s) == 0:
        return s
    
    return s[-1] + reverse(s[:-1])`,

    Palindrome: `def is_palindrome(s):
    
    if len(s) <= 1:
        return True
    
    if s[0] == s[-1]:
        return is_palindrome(s[1:-1])
    return False`,

    GCD: `def gcd(a, b):
    
    if b == 0:
        return a
    
    return gcd(b, a % b)`,

    SumDigits: `def sum_digits(n):
    
    if n == 0:
        return 0
    
    return n % 10 + sum_digits(n // 10)`,

    BinarySearch: `def binary_search(target, left, right):
    
    if left > right:
        return "Not Found"
    
    mid = (left + right) // 2
    
    if mid == target:
        return mid
    
    elif mid > target:
        return binary_search(target, left, mid - 1)
    else:
        return binary_search(target, mid + 1, right)`,

    TowerOfHanoi: `def tower_of_hanoi(n, source='A', auxiliary='B', target='C'):
    
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    
    
    tower_of_hanoi(n - 1, source, target, auxiliary)
    
    
    print(f"Move disk {n} from {source} to {target}")
    
    
    tower_of_hanoi(n - 1, auxiliary, source, target)`,

    ArraySum: `def array_sum(arr, index):
    
    if index >= len(arr):
        return 0
    
    return arr[index] + array_sum(arr, index + 1)`
  };

  return (
    <div className="h-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="h-full p-4 overflow-y-auto">
        <pre className="text-gray-100 font-mono text-sm whitespace-pre-wrap">
          <code>{codeExamples[functionName] || 'Select an algorithm to view its code'}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeViewer; 