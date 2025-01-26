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

// Power function implementation
const power = (base, exponent, animationStep = [], id = '0') => {
  if (exponent === 0) {
    const node = {
      id,
      name: `power(${base}, ${exponent}) = 1`,
      value: 1,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const child = power(base, exponent - 1, animationStep, `${id}-0`);
  const value = base * child.value;
  
  const node = {
    id,
    name: `power(${base}, ${exponent}) = ${value}`,
    value: value,
    children: [child],
    isBaseCase: false
  };
  
  animationStep.push(node);
  return node;
};

// GCD implementation
const gcd = (a, b, animationStep = [], id = '0') => {
  if (b === 0) {
    const node = {
      id,
      name: `gcd(${a}, ${b}) = ${a}`,
      value: a,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const child = gcd(b, a % b, animationStep, `${id}-0`);
  
  const node = {
    id,
    name: `gcd(${a}, ${b}) = ${child.value}`,
    value: child.value,
    children: [child],
    isBaseCase: false
  };
  
  animationStep.push(node);
  return node;
};

// Sum of digits implementation
const sumDigits = (n, animationStep = [], id = '0') => {
  if (n === 0) {
    const node = {
      id,
      name: `sumDigits(${n}) = 0`,
      value: 0,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const child = sumDigits(Math.floor(n / 10), animationStep, `${id}-0`);
  const value = (n % 10) + child.value;
  
  const node = {
    id,
    name: `sumDigits(${n}) = ${value}`,
    value: value,
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
      case 'Power': {
        const [base, exponent] = input.split(',').map(Number);
        validateNumericInput(base);
        validateNumericInput(exponent);
        if (exponent > 10) throw new Error('For visualization purposes, please use exponent ≤ 10');
        result = power(base, exponent);
        break;
      }

      case 'GCD': {
        const [a, b] = input.split(',').map(Number);
        validateNumericInput(a);
        validateNumericInput(b);
        if (Math.max(a, b) > 100) throw new Error('For visualization purposes, please use numbers ≤ 100');
        result = gcd(a, b);
        break;
      }

      case 'SumDigits': {
        validateNumericInput(input);
        const n = parseInt(input);
        if (n > 9999) throw new Error('For visualization purposes, please use numbers ≤ 9999');
        result = sumDigits(n);
        break;
      }
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
