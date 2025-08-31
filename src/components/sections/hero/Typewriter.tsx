import { useEffect, useState } from 'react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  waitBeforeDelete?: number;
  loop?: boolean;
}

export function Typewriter({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  waitBeforeDelete = 1000,
  loop = true,
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex] ?? '';
    if (!deleting && display === current) {
      const t = setTimeout(() => setDeleting(true), waitBeforeDelete);
      return () => clearTimeout(t);
    }
    if (deleting && display === '') {
      const next = (wordIndex + 1) % words.length;
      if (!loop && next === 0) return;
      setDeleting(false);
      setWordIndex(next);
      return;
    }
    const step = () => {
      const nextText = deleting
        ? current.slice(0, display.length - 1)
        : current.slice(0, display.length + 1);
      setDisplay(nextText);
    };
    const id = setTimeout(step, deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(id);
  }, [display, deleting, wordIndex, words, typingSpeed, deletingSpeed, waitBeforeDelete, loop]);

  return (
    <span
      style={{
        backgroundImage:
          'linear-gradient(90deg, var(--color-primary-600), var(--color-secondary-600))',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        whiteSpace: 'nowrap',
        position: 'relative',
      }}
    >
      {display}
      <span
        aria-hidden
        style={{
          display: 'inline-block',
          width: 2,
          height: '1em',
          marginLeft: 2,
          background: 'currentColor',
          color: 'var(--color-secondary-700)',
          transform: 'translateY(2px)',
          animation: 'blink 1s steps(2, start) infinite',
        }}
      />
      <style>{`@keyframes blink { to { visibility: hidden; } }`}</style>
    </span>
  );
}
