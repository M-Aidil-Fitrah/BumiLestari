import { useEffect, useRef } from 'react';
import type { ComponentType } from 'react';

interface WithScrollAnimationProps {
  className?: string;
}

export const withScrollAnimation = <P extends object>(
  WrappedComponent: ComponentType<P>,
  animationClass: string = 'animate-fade-in-up'
) => {
  const WithScrollAnimationComponent = (props: P & WithScrollAnimationProps) => {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;

      // Set initial state
      element.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove('opacity-0', 'translate-y-8');
              entry.target.classList.add('opacity-100', 'translate-y-0');
              // Optionally add custom animation class
              if (animationClass) {
                entry.target.classList.add(animationClass);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      observer.observe(element);

      return () => {
        observer.unobserve(element);
      };
    }, []);

    return (
      <div ref={elementRef} className={props.className}>
        <WrappedComponent {...props} />
      </div>
    );
  };

  WithScrollAnimationComponent.displayName = `withScrollAnimation(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithScrollAnimationComponent;
};