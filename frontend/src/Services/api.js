const API_BASE_URL = 'http://localhost:3000/api';

export const generateRecursionTree = async (functionName, inputValue, powerBase, powerExp) => {
  try {
    let payload = {
      functionName: functionName,
      input: inputValue
    };

    // Special handling for Power function
    if (functionName === 'Power') {
      payload.input = {
        base: powerBase,
        exp: powerExp
      };
    }

    const response = await fetch(`${API_BASE_URL}/run-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
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
