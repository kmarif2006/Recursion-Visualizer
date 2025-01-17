const API_BASE_URL = 'http://localhost:3001/api';

export const generateRecursionTree = async (functionName, inputValue) => {
  try {
    const response = await fetch(`${API_BASE_URL}/run-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        functionName: functionName,
        input: inputValue
      })
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
