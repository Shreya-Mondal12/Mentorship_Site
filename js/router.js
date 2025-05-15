
/**
 * Simple router for handling navigation in MentorMatch
 */

const Router = (() => {
  // Store routes and the current route
  const routes = {};
  let currentRoute = null;

  // Get app container
  const appContainer = Utils.qs('#app');

  return {
    /**
     * Add a route
     * @param {string} path - Route path
     * @param {Function} handler - Function to render this route
     */
    addRoute: (path, handler) => {
      routes[path] = handler;
    },

    /**
     * Navigate to a specific route
     * @param {string} path - Route path
     * @param {Object} params - Optional parameters
     */
    navigate: (path, params = {}) => {
      // Update URL
      const url = new URL(window.location.origin);
      url.pathname = path;
      
      // Add query parameters if provided
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          url.searchParams.set(key, params[key]);
        }
      });
      
      // Update browser history
      window.history.pushState({}, '', url);
      
      // Handle the route change
      Router.handleRouteChange();
    },

    /**
     * Handle route change
     */
    handleRouteChange: () => {
      // Get current path
      const path = window.location.pathname || '/';
      
      // Find the matching route handler
      const handler = routes[path] || routes['/'] || routes['*'];
      
      // If found, render the route
      if (handler) {
        // Update current route
        currentRoute = path;
        
        // Clear the app container
        appContainer.innerHTML = '';
        
        // Render the route
        handler();
      } else {
        console.error('No handler found for path:', path);
      }
    },

    /**
     * Get a query parameter from the URL
     * @param {string} key - Parameter key
     * @returns {string|null} - Parameter value or null
     */
    getParam: (key) => {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(key);
    },

    /**
     * Get the current route
     * @returns {string} - Current route path
     */
    getCurrentRoute: () => {
      return currentRoute;
    },

    /**
     * Initialize the router
     */
    init: () => {
      // Handle initial route
      Router.handleRouteChange();
      
      // Handle navigation using browser back/forward buttons
      window.addEventListener('popstate', Router.handleRouteChange);
      
      // Intercept link clicks for SPA navigation
      document.body.addEventListener('click', (e) => {
        // Find the closest anchor element
        const link = e.target.closest('a');
        
        // If it's a link with an href that starts with a slash
        if (link && link.getAttribute('href')?.startsWith('/')) {
          e.preventDefault();
          Router.navigate(link.getAttribute('href'));
        }
      });
    }
  };
})();
