import { useState, useEffect } from 'react';

interface CountingNumberProps {
  target: number;
  duration: number;
}

const CountingNumber = ({ target, duration }: CountingNumberProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const incrementTime = Math.ceil(duration / target);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) { 
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
      {count}+
    </p>
  );
};

export default CountingNumber;
