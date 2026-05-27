import { useEffect, useState } from 'react';

const CHARS = '!<>-_\\/[]{}=+*^?#@$%ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function useTextScramble(text: string, delay = 0) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    let iteration = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      iteration = 0;
      interval = setInterval(() => {
        setOutput(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < Math.floor(iteration)) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );
        if (iteration >= text.length) {
          clearInterval(interval);
          setOutput(text);
        }
        iteration += 0.4;
      }, 28);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay]);

  return output;
}
