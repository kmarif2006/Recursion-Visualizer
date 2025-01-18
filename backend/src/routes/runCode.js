import express from 'express';
const router = express.Router();

// Fibonacci implementation
const fibonacci = (n, animationStep = [], id = '0') => {
  if (n <= 1) {
    const node = {
      id,
      name: `fibonacci(${n}) = ${n}`,
      value: n,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const left = fibonacci(n - 1, animationStep, `${id}-0`);
  const right = fibonacci(n - 2, animationStep, `${id}-1`);
  const value = left.value + right.value;
  
  const node = {
    id,
    name: `fibonacci(${n}) = ${value}`,
    value,
    children: [left, right],
    isBaseCase: false
  };
  
  animationStep.push(node);
  return node;
};

// Factorial implementation
const factorial = (n, animationStep = [], id = '0') => {
  if (n === 0 || n === 1) {
    const node = {
      id,
      name: `factorial(${n}) = 1`,
      value: 1,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const child = factorial(n - 1, animationStep, `${id}-0`);
  const value = n * child.value;
  
  const node = {
    id,
    name: `factorial(${n}) = ${value}`,
    value,
    children: [child],
    isBaseCase: false
  };
  
  animationStep.push(node);
  return node;
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
