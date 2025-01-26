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

// Binary Search implementation
const binarySearch = (target, left, right, animationStep = [], id = '0') => {
  if (left > right) {
    const node = {
      id,
      name: `binarySearch(${target}, ${left}, ${right}) = "Not Found"`,
      value: "Not Found",
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const mid = Math.floor((left + right) / 2);
  
  if (mid === target) {
    const node = {
      id,
      name: `binarySearch(${target}, ${left}, ${right}) = ${mid}`,
      value: mid,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const child = target < mid 
    ? binarySearch(target, left, mid - 1, animationStep, `${id}-0`)
    : binarySearch(target, mid + 1, right, animationStep, `${id}-1`);

  const node = {
    id,
    name: `binarySearch(${target}, ${left}, ${right})`,
    value: child.value,
    children: [child],
    isBaseCase: false
  };
  
  animationStep.push(node);
  return node;
};

// ArraySum implementation
const arraySum = (arr, index = 0, animationStep = [], id = '0') => {
  // Base case: reached end of array
  if (index === arr.length) {
    const node = {
      id,
      name: `arraySum([${arr.join(',')}], ${index}) = 0`,
      value: 0,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  // Recursive case
  const child = arraySum(arr, index + 1, animationStep, `${id}-0`);
  const value = arr[index] + child.value;
  
  const node = {
    id,
    name: `arraySum([${arr.join(',')}], ${index}) = ${value}`,
    value: value,
    children: [child],
    isBaseCase: false
  };
  
  animationStep.push(node);
  return node;
};

// Tower of Hanoi implementation
const towerOfHanoi = (n, source = 'A', auxiliary = 'B', target = 'C', animationStep = [], id = '0') => {
  if (n === 1) {
    const node = {
      id,
      name: `hanoi(${n}, ${source}, ${auxiliary}, ${target})`,
      value: `Move disk 1 from ${source} to ${target}`,
      children: [],
      isBaseCase: true
    };
    animationStep.push(node);
    return node;
  }

  const child1 = towerOfHanoi(n - 1, source, target, auxiliary, animationStep, `${id}-0`);
  const child2 = towerOfHanoi(n - 1, auxiliary, source, target, animationStep, `${id}-1`);

  const node = {
    id,
    name: `hanoi(${n}, ${source}, ${auxiliary}, ${target})`,
    value: `Move disk ${n} from ${source} to ${target}`,
    children: [child1, child2],
    isBaseCase: false
  };

  animationStep.push(node);
  return node;
};

// Add input validation helper
const validateNumericInput = (value) => {
  if (typeof value !== 'number' || isNaN(value)) {
    throw new Error('Invalid numeric input');
  }
};

router.post('/', (req, res) => {
  try {
    const { functionName, input } = req.body;
    
    console.log('Received request:', { functionName, input }); // Debug log
    
    if (!functionName || input === undefined) {
      throw new Error('Missing required parameters');
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
      
      case 'ArraySum': {
        console.log('Processing ArraySum with input:', input); // Debug log
        let arr;
        try {
          arr = Array.isArray(input) ? input : input.split(',').map(num => {
            const parsed = Number(num.trim());
            if (isNaN(parsed)) throw new Error('Invalid array input');
            return parsed;
          });
        } catch (e) {
          throw new Error('Invalid array input format. Please provide comma-separated numbers.');
        }

        if (arr.length === 0) {
          throw new Error('Array cannot be empty');
        }
        if (arr.length > 10) {
          throw new Error('For visualization purposes, please use arrays of length ≤ 10');
        }
        
        arr.forEach(num => {
          if (typeof num !== 'number' || isNaN(num)) {
            throw new Error('Array must contain valid numbers only');
          }
        });

        const animationStep = [];
        result = arraySum(arr, 0, animationStep);
        console.log('ArraySum result:', result); // Debug log
        break;
      }
      
      case 'TowerOfHanoi': {
        validateNumericInput(input);
        if (input > 5) throw new Error('For visualization purposes, please use n ≤ 5');
        result = towerOfHanoi(parseInt(input));
        break;
      }
      
      default:
        throw new Error(`Unsupported function: ${functionName}`);
    }
    
    res.json(result);
  } catch (error) {
    console.error('Backend Error:', error); // Debug log
    res.status(400).json({ error: error.message });
  }
});

export default router;
