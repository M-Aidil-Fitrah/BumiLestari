import { useEffect } from 'react';
import type { ComponentType } from 'react';

interface WithAnalyticsProps {
  trackingId?: string;
  eventName?: string;
}

interface AnalyticsEvent {
  event: string;
  component: string;
  timestamp: number;
  props?: Record<string, any>;
}

export const withAnalytics = <P extends object>(
  WrappedComponent: ComponentType<P>,
  defaultEventName?: string
) => {
  const WithAnalyticsComponent = (props: P & WithAnalyticsProps) => {
    const { trackingId, eventName = defaultEventName, ...restProps } = props;

    useEffect(() => {
      // Track component mount
      if (eventName) {
        trackEvent({
          event: eventName,
          component: WrappedComponent.displayName || WrappedComponent.name || 'Unknown',
          timestamp: Date.now(),
          props: { trackingId, ...restProps }
        });
      }
    }, [eventName, trackingId, restProps]);

    return <WrappedComponent {...(restProps as P)} />;
  };

  WithAnalyticsComponent.displayName = `withAnalytics(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithAnalyticsComponent;
};

// Simple analytics tracking function
const trackEvent = (event: AnalyticsEvent) => {
  // In production, this would send to analytics service
  console.log('📊 Analytics Event:', event);
  
  // Store in localStorage for demo purposes
  try {
    const events = JSON.parse(localStorage.getItem('bumilestari_analytics') || '[]');
    events.push(event);
    // Keep only last 100 events
    const recentEvents = events.slice(-100);
    localStorage.setItem('bumilestari_analytics', JSON.stringify(recentEvents));
  } catch (error) {
    console.error('Failed to store analytics event:', error);
  }
};