import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  magneticForce?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, 
  className = '', 
  magneticForce = 0.5,
  ...props 
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // We use quickTo for better performance during mousemove
    const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const h = rect.width / 2;
      const w = rect.height / 2;
      
      const x = e.clientX - (rect.left + h);
      const y = e.clientY - (rect.top + w);

      xTo(x * magneticForce);
      yTo(y * magneticForce);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [magneticForce]);

  return (
    <button
      ref={buttonRef}
      className={`inline-flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
