import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;

    // Use quickTo for high performance mouse tracking
    const xToCursor = gsap.quickTo(cursorRef.current, 'x', { duration: 0.1, ease: 'power3' });
    const yToCursor = gsap.quickTo(cursorRef.current, 'y', { duration: 0.1, ease: 'power3' });
    
    const xToFollower = gsap.quickTo(followerRef.current, 'x', { duration: 0.5, ease: 'power3' });
    const yToFollower = gsap.quickTo(followerRef.current, 'y', { duration: 0.5, ease: 'power3' });

    const moveCursor = (e: MouseEvent) => {
      xToCursor(e.clientX);
      yToCursor(e.clientY);
      xToFollower(e.clientX);
      yToFollower(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('magnetic') ||
        target.closest('.magnetic')
      ) {
        gsap.to(cursorRef.current, { scale: 0, duration: 0.3 });
        gsap.to(followerRef.current, { scale: 1.5, backgroundColor: 'transparent', border: '1px solid #2C2C2C', duration: 0.3 });
      } else if (
        target.tagName.toLowerCase() === 'img' || 
        target.closest('.image-hover')
      ) {
        gsap.to(followerRef.current, { scale: 3, mixBlendMode: 'difference', backgroundColor: '#fff', border: 'none', duration: 0.3 });
      } else {
        // Reset
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
        gsap.to(followerRef.current, { scale: 1, mixBlendMode: 'normal', backgroundColor: 'rgba(44, 44, 44, 0.1)', border: 'none', duration: 0.3 });
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide cursor entirely on body to prevent double cursors
    document.body.style.cursor = 'none';
    const interactables = document.querySelectorAll('button, a, input, select, textarea');
    interactables.forEach(el => (el as HTMLElement).style.cursor = 'none');

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.body.style.cursor = '';
      interactables.forEach(el => (el as HTMLElement).style.cursor = '');
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-[#2C2C2C] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 bg-[#2C2C2C]/10 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-200"
      />
    </>
  );
};
