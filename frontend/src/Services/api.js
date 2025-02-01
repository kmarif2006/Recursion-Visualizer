const API_BASE_URL = 'http://localhost:3001/api';

export const generateRecursionTree = async (functionName, inputValue) => {
  try {
    let processedInput;

    // console.log('Processing request for:', functionName); // Debug log

    // Input validation and processing
    switch (functionName) {
      case 'ArraySum':
        if (!inputValue || !inputValue.includes(',')) {
          throw new Error('Please enter numbers separated by commas');
        }
        processedInput = inputValue.split(',').map(num => {
          const parsed = parseInt(num.trim(), 10);
          if (isNaN(parsed)) {
            throw new Error('Invalid number in array');
          }
          return parsed;
        });
        break;

      case 'Power':
      case 'GCD':
      case 'BinarySearch':
        if (!inputValue || !inputValue.includes(',')) {
          throw new Error('Please enter two numbers separated by a comma');
        }
        const [num1, num2] = inputValue.split(',').map(num => {
          const parsed = parseInt(num.trim(), 10);
          if (isNaN(parsed)) {
            throw new Error('Invalid number');
          }
          return parsed;
        });
        processedInput = [num1, num2];
        break;

      case 'TowerOfHanoi':
        const disks = parseInt(inputValue, 10);
        if (isNaN(disks)) {
          throw new Error('Please enter a valid number');
        }
        if (disks < 1 || disks > 5) {
          throw new Error('Number of disks must be between 1 and 5');
        }
        processedInput = disks;
        break;

      default: // For Fibonacci, Factorial, etc.
        const num = parseInt(inputValue, 10);
        if (isNaN(num)) {
          throw new Error('Please enter a valid number');
        }
        if (num < 0) {
          throw new Error('Please enter a non-negative number');
        }
        processedInput = num;
    }

    // console.log('Sending request:', { functionName, input: processedInput }); // Debug log

    const response = await fetch(`${API_BASE_URL}/run-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        functionName,
        input: processedInput
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Network response was not ok');
    }
    
    const data = await response.json();
    console.log('Received response:', data); // Debug log
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
