const API_BASE_URL = 'http://localhost:3001/api';

export const generateRecursionTree = async (functionName, inputValue) => {
  try {
    let processedInput = inputValue;

    console.log('Processing request for:', functionName); // Debug log

    // Process input based on function type
    if (functionName === 'ArraySum') {
      console.log('Processing ArraySum input:', inputValue); // Debug log
      
      if (!inputValue || !inputValue.includes(',')) {
        throw new Error('Please enter numbers separated by commas');
      }
      
      processedInput = inputValue.split(',').map(num => {
        const parsed = Number(num.trim());
        if (isNaN(parsed)) {
          throw new Error('Invalid number in array');
        }
        return parsed;
      });

      if (processedInput.length === 0) {
        throw new Error('Array cannot be empty');
      }
      if (processedInput.length > 10) {
        throw new Error('For visualization purposes, please use arrays of length ≤ 10');
      }
    } else if (functionName === 'Power' || functionName === 'GCD' || functionName === 'BinarySearch') {
      if (!inputValue.includes(',')) {
        throw new Error(`${functionName} requires two numbers separated by a comma`);
      }
      processedInput = inputValue;
    } else {
      processedInput = parseInt(inputValue);
      if (isNaN(processedInput)) {
        throw new Error('Please enter a valid number');
      }
    }

    console.log('Sending request:', { functionName, input: processedInput }); // Debug log

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
