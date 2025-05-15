
/**
 * Utility functions for the MentorMatch application
 */

const Utils = {
  /**
   * Selects a DOM element by query selector
   * @param {string} selector - CSS selector
   * @returns {Element} - DOM element
   */
  qs: (selector) => document.querySelector(selector),

  /**
   * Selects all DOM elements matching a query selector
   * @param {string} selector - CSS selector
   * @returns {NodeList} - List of DOM elements
   */
  qsAll: (selector) => document.querySelectorAll(selector),

  /**
   * Creates a DOM element with attributes and content
   * @param {string} tag - HTML tag name
   * @param {Object} attributes - Element attributes
   * @param {string|Element|Array} content - Element content
   * @returns {Element} - Created DOM element
   */
  createElement: (tag, attributes = {}, content = null) => {
    const element = document.createElement(tag);
    
    // Add attributes
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === 'class') {
        element.className = value;
      } else if (key === 'dataset') {
        Object.entries(value).forEach(([dataKey, dataValue]) => {
          element.dataset[dataKey] = dataValue;
        });
      } else if (key.startsWith('on') && typeof value === 'function') {
        element.addEventListener(key.substring(2).toLowerCase(), value);
      } else {
        element.setAttribute(key, value);
      }
    });
    
    // Add content
    if (content) {
      if (Array.isArray(content)) {
        content.forEach(item => {
          if (item instanceof Element) {
            element.appendChild(item);
          } else {
            element.appendChild(document.createTextNode(String(item)));
          }
        });
      } else if (content instanceof Element) {
        element.appendChild(content);
      } else {
        element.textContent = String(content);
      }
    }
    
    return element;
  },

  /**
   * Formats a date string
   * @param {string} dateString - ISO date string
   * @returns {string} - Formatted date
   */
  formatDate: (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  },

  /**
   * Validates an email address
   * @param {string} email - Email to validate
   * @returns {boolean} - True if email is valid
   */
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Creates a debounced function
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} - Debounced function
   */
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Gets user initials from name
   * @param {string} name - User's name
   * @returns {string} - Initials (up to 2 characters)
   */
  getInitials: (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  },
  
  /**
   * Creates a URL friendly slug from a string
   * @param {string} str - String to convert
   * @returns {string} - URL friendly slug
   */
  createSlug: (str) => {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
};
