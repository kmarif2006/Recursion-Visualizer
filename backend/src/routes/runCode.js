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
  const left = fibonacci(n - 1);
  const right = fibonacci(n - 2);
  const value = left.value + right.value;
  return {
    name: `Fibonacci(${n}) = ${value}`,
    value: value,
    children: [left, right],
    isBaseCase: false
  };
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
  const child = factorial(n - 1);
  const value = n * child.value;
  return {
    name: `Factorial(${n}) = ${value}`,
    value: value,
    children: [child],
    isBaseCase: false
  };
};

// Sum of N implementation
const sumOfN = (n,animationStep=[]  ) => {
  if (n === 0) {
    animationStep.push({
      name: `Sum(${n}) = 0`,
      value: 0,
      children: [],
      isBaseCase: true
    });
    return {
      name: `Sum(${n}) = 0`,
      value: 0,
      children: [],
      isBaseCase: true
    };
  }
  const child = sumOfN(n - 1);
  const value = n + child.value;
  return {
    name: `Sum(${n}) = ${value}`,
    value: value,
    children: [child],
    isBaseCase: false
  };
};

// Power function implementation
const power = (base, exp,animationStep=[] ) => {
  if (exp === 0) {
    animationStep.push({
      name: `Power(${base},${exp}) = 1`,
      value: 1,
      children: [],
      isBaseCase: true
    });
    return {
      name: `Power(${base},${exp}) = 1`,
      value: 1,
      children: [],
      isBaseCase: true
    };
  }
  const child = power(base, exp - 1);
  const value = base * child.value;
  return {
    name: `Power(${base},${exp}) = ${value}`,
    value: value,
    children: [child],
    isBaseCase: false
  };
};

router.post('/', (req, res) => {
  try {
    const { functionName, input } = req.body;
    console.log('Received request:', { functionName, input }); // Debug log

    let result;
    switch (functionName) {
      case 'Fibonacci':
        result = fibonacci(parseInt(input));
        break;
      case 'Factorial':
        result = factorial(parseInt(input));
        break;
      case 'Sum':
        result = sumOfN(parseInt(input));
        break;
      case 'Power':
        if (!input || typeof input !== 'object') {
          throw new Error('Power function requires an object with base and exp properties');
        }
        const { base, exp } = input;
        if (base === undefined || exp === undefined) {
          throw new Error('Power function requires both base and exp values');
        }
        result = power(parseInt(base), parseInt(exp));
        break;
      default:
        throw new Error(`Unsupported function: ${functionName}`);
    }
    
    console.log('Sending response:', result); // Debug log
    res.json(result);
  } catch (error) {
    console.error('Error:', error); // Debug log
    res.status(400).json({ error: error.message });
  }
});

export default router;
