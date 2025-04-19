let initialized = false;

/**
 * Initialize analytics
 * @param {Object} options - Configuration options
 */
export function initAnalytics(options = {}) {
  if (initialized) return;
  
  // Example implementation - replace with your analytics provider
  console.log('Analytics initialized with options:', options);
  
  // Add tracking script to document
  if (typeof window !== 'undefined' && options.trackingId) {
    // Example Google Analytics setup (replace with your analytics provider)
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${options.trackingId}`;
    document.head.appendChild(script);
    
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', options.trackingId);
  }
  
  initialized = true;
}

/**
 * Track page view
 * @param {string} path - Page path
 */
export function trackPageView(path) {
  if (!initialized) {
    console.warn('Analytics not initialized. Call initAnalytics first.');
    return;
  }
  
  // Example implementation
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
    });
  }
}

/**
 * Track event
 * @param {string} category - Event category
 * @param {string} action - Event action
 * @param {Object} params - Additional parameters
 */
export function trackEvent(category, action, params = {}) {
  if (!initialized) {
    console.warn('Analytics not initialized. Call initAnalytics first.');
    return;
  }
  
  // Example implementation
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      ...params,
    });
  }
}

export default {
  init: initAnalytics,
  pageView: trackPageView,
  event: trackEvent,
};