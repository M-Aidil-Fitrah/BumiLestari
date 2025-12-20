// src/utils/logger.ts
// Production-ready logger yang pakai Supabase Edge Function untuk bypass CORS

const isDev = import.meta.env.DEV;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// URL Edge Function (ganti sesuai project kamu)
const LOG_ENDPOINT = `${SUPABASE_URL}/functions/v1/log-to-loki`;

console.log('🔧 Logger initialized:', {
  mode: import.meta.env.MODE,
  isDev,
  endpoint: LOG_ENDPOINT,
  hasSupabaseUrl: !!SUPABASE_URL,
  hasSupabaseKey: !!SUPABASE_ANON_KEY,
});

// Send log to Loki via Supabase Edge Function
async function sendToLoki(logData: any) {
  // 🚀 FORCE SEND: Always send to Loki even in development for testing
  const forceSend = true;

  // Development mode: also log to console
  if (isDev) {
    console.log('📝 Dev Log:', logData);
    if (!forceSend) {
      return; // Skip sending to Loki if not forcing
    }
  }

  // Send to Loki via Edge Function
  try {
    const timestamp = `${Date.now() * 1000000}`; // nanoseconds
    
    const payload = {
      streams: [{
        stream: {
          application: 'bumilestari-frontend',
          environment: import.meta.env.MODE || 'production',
          level: logData.level || 'info',
          type: logData.type || 'general',
        },
        values: [[timestamp, JSON.stringify(logData)]]
      }]
    };

    // Send via Supabase Edge Function (no CORS issues!)
    const response = await fetch(LOG_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(payload),
      // Don't wait for response to avoid blocking
      keepalive: true,
    });

    if (isDev) {
      if (response.ok) {
        console.log('✅ Log sent to Loki successfully');
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('❌ Loki send failed:', errorData);
      }
    }
  } catch (error) {
    // Log errors in development
    if (isDev) {
      console.error('❌ Failed to send log to Loki:', error);
    }
  }
}

/**
 * Log authentication events
 */
export const logAuth = (
  event: 'register' | 'login' | 'logout' | 'password_reset' | 'email_verify',
  context?: Record<string, any>
) => {
  sendToLoki({
    type: 'auth',
    event,
    timestamp: new Date().toISOString(),
    user_agent: navigator.userAgent,
    url: window.location.href,
    ...context,
  });
};

/**
 * Log errors with stack trace
 */
export const logError = (
  error: Error | string,
  context?: Record<string, any>
) => {
  const errorObj = typeof error === 'string' ? new Error(error) : error;
  
  sendToLoki({
    level: 'error',
    type: 'error',
    message: errorObj.message,
    stack: errorObj.stack,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    user_agent: navigator.userAgent,
    ...context,
  });
  
  // Also log to console in all environments
  console.error('❌ Error logged:', errorObj, context);
};

/**
 * Log general information
 */
export const logInfo = (message: string, context?: Record<string, any>) => {
  sendToLoki({
    type: 'info',
    message,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    ...context,
  });
};

/**
 * Log user actions for analytics
 */
export const logUserAction = (
  action: string,
  context?: Record<string, any>
) => {
  sendToLoki({
    type: 'user_action',
    action,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    page: window.location.pathname,
    ...context,
  });
};

/**
 * Log validation errors
 */
export const logValidation = (
  field: string,
  error: string,
  context?: Record<string, any>
) => {
  sendToLoki({
    level: 'warn',
    type: 'validation_error',
    field,
    error,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    ...context,
  });
};

/**
 * Log page views
 */
export const logPageView = (
  page: string,
  context?: Record<string, any>
) => {
  sendToLoki({
    type: 'page_view',
    page,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    referrer: document.referrer,
    ...context,
  });
};

/**
 * Log performance metrics
 */
export const logPerformance = (
  metric: string,
  value: number,
  context?: Record<string, any>
) => {
  sendToLoki({
    type: 'performance',
    metric,
    value,
    timestamp: new Date().toISOString(),
    url: window.location.href,
    ...context,
  });
};

// Default export
export default {
  auth: logAuth,
  error: logError,
  info: logInfo,
  action: logUserAction,
  validation: logValidation,
  pageView: logPageView,
  performance: logPerformance,
};