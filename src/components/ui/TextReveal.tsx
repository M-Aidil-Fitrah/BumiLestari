import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split string into words
  const words = children.split(' ');

  useGSAP(() => {
    if (!containerRef.current) return;

    const wordElements = containerRef.current.querySelectorAll('.word-inner');
    
    gsap.fromTo(
      wordElements,
      { y: '100%', opacity: 0 },
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.05,
        delay: delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <span 
          key={index} 
          className="inline-block overflow-hidden relative"
          style={{ marginRight: '0.25em' }}
        >
          <span className="word-inner inline-block relative">{word}</span>
        </span>
      ))}
    </div>
  );
};
