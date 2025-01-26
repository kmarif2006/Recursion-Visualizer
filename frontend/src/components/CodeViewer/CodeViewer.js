import React from 'react';

const CodeViewer = ({ functionName }) => {
  const codeExamples = {
    Fibonacci: `def fibonacci(n):
    # Base cases: fibonacci of 0 is 0, and fibonacci of 1 is 1
    if n <= 1:
        return n
    # Recursive case
    return fibonacci(n - 1) + fibonacci(n - 2)`,

    Factorial: `def factorial(n):
    # Base case: factorial of 0 is 1
    if n == 0:
        return 1
    # Recursive case
    return n * factorial(n - 1)`,

    SumNatural: `def sum_natural(n):
    # Base case: sum of 0 is 0
    if n == 0:
        return 0
    # Recursive case
    return n + sum_natural(n - 1)`,

    Power: `def power(base, exponent):
    # Base case: exponent is 0
    if exponent == 0:
        return 1
    # Recursive case
    return base * power(base, exponent - 1)`,

    ReverseString: `def reverse(s):
    # Base case: empty string
    if len(s) == 0:
        return s
    # Recursive case
    return s[-1] + reverse(s[:-1])`,

    Palindrome: `def is_palindrome(s):
    # Base case: if string is empty or has one character
    if len(s) <= 1:
        return True
    # Recursive case: compare first and last characters
    if s[0] == s[-1]:
        return is_palindrome(s[1:-1])
    return False`,

    GCD: `def gcd(a, b):
    # Base case: when second number is 0
    if b == 0:
        return a
    # Recursive case
    return gcd(b, a % b)`,

    SumDigits: `def sum_digits(n):
    # Base case: when number is reduced to 0
    if n == 0:
        return 0
    # Recursive case: sum last digit and recurse
    return n % 10 + sum_digits(n // 10)`,

    BinarySearch: `def binary_search(target, left, right):
    # Base case: if search range is invalid
    if left > right:
        return "Not Found"
    
    mid = (left + right) // 2
    # Base case: target found
    if mid == target:
        return mid
    # Recursive cases
    elif mid > target:
        return binary_search(target, left, mid - 1)
    else:
        return binary_search(target, mid + 1, right)`,

    TowerOfHanoi: `def tower_of_hanoi(n, source='A', auxiliary='B', target='C'):
    # Base case: only one disk to move
    if n == 1:
        print(f"Move disk 1 from {source} to {target}")
        return
    
    # Move n-1 disks from source to auxiliary peg
    tower_of_hanoi(n - 1, source, target, auxiliary)
    
    # Move the nth disk from source to target peg
    print(f"Move disk {n} from {source} to {target}")
    
    # Move n-1 disks from auxiliary to target peg
    tower_of_hanoi(n - 1, auxiliary, source, target)`,

    ArraySum: `def array_sum(arr, index):
    # Base case: reached end of array
    if index >= len(arr):
        return 0
    # Recursive case
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