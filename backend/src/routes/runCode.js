import express from 'express';
const router = express.Router();

// Fibonacci implementation
const fibonacci = (n,animationStep=[]) => {
  if (n <= 1) {
    animationStep.push({
      name: `Fibonacci(${n}) = ${n}`,
      value: n,
      children: [],
      isBaseCase: true
    });
    return {
      name: `Fibonacci(${n}) = ${n}`,
      value: n,
      children: [],
      isBaseCase: true
    };
  }
  const left = fibonacci(n - 1,animationStep);
  const right = fibonacci(n - 2,animationStep);
  const value = left.value + right.value;
  const result = {
    name: `Fibonacci(${n}) = ${value}`,
    value: value,
    children: [left, right],
    isBaseCase: false
  };
  animationStep.push(result);
  return result;
};

// Factorial implementation
const factorial = (n,animationStep=[]) => {
  if (n === 0 || n === 1) {
    animationStep.push({
      name: `Factorial(${n}) = 1`,
      value: 1,
      children: [],
      isBaseCase: true
    });
    return {
      name: `Factorial(${n}) = 1`,
      value: 1,
      children: [],
      isBaseCase: true
    };
  }
  const child = factorial(n - 1,animationStep);
  const value = n * child.value;
  animationStep.push({
    name: `Factorial(${n}) = ${value}`,
    value: value,
    children: [child],
    isBaseCase: false
  });
  return {
    name: `Factorial(${n}) = ${value}`,
    value: value,
    children: [child],
    isBaseCase: false
  };
};



router.post('/', (req, res) => {
  try {
    const { functionName, input } = req.body;
    
    // Input validation
    if (!functionName || input === undefined) {
      throw new Error('Missing required parameters');
    }
    
    if (typeof input !== 'number' && !Number.isInteger(Number(input))) {
      throw new Error('Input must be a valid integer');
    }
    
    if (input < 0) {
      throw new Error('Input must be a non-negative integer');
    }

    let result;
    switch (functionName) {
      case 'Fibonacci':
        result = fibonacci(parseInt(input));
        break;
      case 'Factorial':
        result = factorial(parseInt(input));
        break;
      default:
        throw new Error(`Unsupported function: ${functionName}`);
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
});

export default router;
