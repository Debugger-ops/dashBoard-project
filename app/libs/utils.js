export function formatDate(date, options = {}) {
    const defaultOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...options,
    };
    
    return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
  }
  
  /**
   * Format currency amount
   * @param {number} amount - Amount to format
   * @param {string} currency - Currency code (default: USD)
   * @returns {string} Formatted currency string
   */
  export function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  }
  
  /**
   * Truncate text with ellipsis if it exceeds maxLength
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated text
   */
  export function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  }
  
  /**
   * Convert string to URL-friendly slug
   * @param {string} str - String to convert
   * @returns {string} URL-friendly slug
   */
  export function slugify(str) {
    return str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  
  /**
   * Deep clone an object
   * @param {Object} obj - Object to clone
   * @returns {Object} Cloned object
   */
  export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  
  /**
   * Get query parameters from URL as an object
   * @returns {Object} Query parameters
   */
  export function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    
    if (queryString) {
      queryString.split('&').forEach(item => {
        const [key, value] = item.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
      });
    }
    
    return params;
  }