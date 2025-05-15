
/**
 * Toast notification component for MentorMatch
 */

const Toast = (() => {
  // Create toast container if it doesn't exist
  let toastContainer = Utils.qs('.toast-container');
  if (!toastContainer) {
    toastContainer = Utils.createElement('div', { class: 'toast-container' });
    document.body.appendChild(toastContainer);
  }
  
  /**
   * Create a toast notification
   * @param {string} message - Toast message
   * @param {string} title - Toast title
   * @param {string} type - Toast type (success, error)
   * @param {number} duration - Duration in milliseconds
   */
  const createToast = (message, title = '', type = 'success', duration = 3000) => {
    const toast = Utils.createElement('div', { class: `toast ${type}` });
    
    // Create toast header
    const toastHeader = Utils.createElement('div', { class: 'toast-header' });
    
    // Add title
    toastHeader.appendChild(Utils.createElement('span', { class: 'toast-title' }, title || (type === 'success' ? 'Success' : 'Error')));
    
    // Add close button
    const closeBtn = Utils.createElement('button', { 
      class: 'toast-close',
      onclick: () => {
        removeToast(toast);
      }
    }, '×');
    toastHeader.appendChild(closeBtn);
    
    toast.appendChild(toastHeader);
    
    // Add message
    toast.appendChild(Utils.createElement('div', { class: 'toast-body' }, message));
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Remove after duration
    setTimeout(() => {
      removeToast(toast);
    }, duration);
  };
  
  /**
   * Remove a toast from the DOM
   * @param {Element} toast - Toast element to remove
   */
  const removeToast = (toast) => {
    toast.style.opacity = '0';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  };
  
  return {
    /**
     * Show a success toast
     * @param {string} message - Toast message
     * @param {string} title - Toast title
     * @param {number} duration - Duration in milliseconds
     */
    success: (message, title = 'Success', duration = 3000) => {
      createToast(message, title, 'success', duration);
    },
    
    /**
     * Show an error toast
     * @param {string} message - Toast message
     * @param {string} title - Toast title
     * @param {number} duration - Duration in milliseconds
     */
    error: (message, title = 'Error', duration = 3000) => {
      createToast(message, title, 'error', duration);
    }
  };
})();
