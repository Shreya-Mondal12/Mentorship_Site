
/**
 * Connections page component for MentorMatch
 */

const ConnectionsPage = (() => {
  /**
   * Render the connections page
   */
  const render = () => {
    const appContainer = Utils.qs('#app');
    const currentUser = Auth.getCurrentUser();
    
    // Redirect if not logged in
    if (!currentUser) {
      Router.navigate('/', { auth: 'login' });
      return;
    }
    
    // Create page structure
    const page = Utils.createElement('div', { class: 'min-h-screen flex flex-col bg-gray-50' });
    
    // Add navbar
    page.appendChild(Navbar.render());
    
    // Main content
    const main = Utils.createElement('div', { class: 'flex-1 container py-8' });
    
    main.appendChild(Utils.createElement('h1', { class: 'text-2xl font-bold mb-6' }, 'Connection Requests'));
    
    // Load connection requests
    Auth.getConnectionRequests()
      .then(requests => {
        if (requests.length === 0) {
          main.appendChild(Utils.createElement('div', { class: 'text-center py-8' }, 'You have no pending connection requests.'));
        } else {
          const requestsList = Utils.createElement('div', { class: 'connection-list' });
          
          requests.forEach(request => {
            requestsList.appendChild(renderConnectionRequest(request));
          });
          
          main.appendChild(requestsList);
        }
        
        // Append page to app container
        appContainer.innerHTML = '';
        appContainer.appendChild(page);
      })
      .catch(error => {
        console.error('Error fetching connection requests:', error);
        
        main.appendChild(Utils.createElement('div', { class: 'text-center py-8 text-red-600' }, 'Error loading connection requests. Please try again.'));
        
        // Append page to app container
        appContainer.innerHTML = '';
        appContainer.appendChild(page);
      });
  };
  
  /**
   * Render a connection request card
   * @param {Object} request - Connection request data
   * @returns {HTMLElement} - Connection request card element
   */
  const renderConnectionRequest = (request) => {
    const card = Utils.createElement('div', { class: 'connection-card' });
    
    // Request header
    const header = Utils.createElement('div', { class: 'connection-header' });
    
    // Avatar with initials
    const avatar = Utils.createElement('div', { class: 'connection-avatar' }, Utils.getInitials(request.senderName));
    header.appendChild(avatar);
    
    // Request info
    const info = Utils.createElement('div', {});
    info.appendChild(Utils.createElement('div', { class: 'font-semibold' }, request.senderName));
    info.appendChild(Utils.createElement('div', { class: 'text-sm text-gray-600' }, `Sent on ${Utils.formatDate(request.createdAt)}`));
    
    header.appendChild(info);
    card.appendChild(header);
    
    // Request message
    card.appendChild(Utils.createElement('p', { class: 'mb-4 text-sm' }, 'Would like to connect with you for mentorship.'));
    
    // Action buttons
    const actions = Utils.createElement('div', { class: 'connection-actions' });
    
    // Accept button
    actions.appendChild(Utils.createElement('button', {
      class: 'button btn-primary',
      onclick: () => {
        respondToRequest(request.id, true);
      }
    }, 'Accept'));
    
    // Decline button
    actions.appendChild(Utils.createElement('button', {
      class: 'button btn-secondary',
      onclick: () => {
        respondToRequest(request.id, false);
      }
    }, 'Decline'));
    
    card.appendChild(actions);
    
    return card;
  };
  
  /**
   * Respond to a connection request
   * @param {number} requestId - ID of the connection request
   * @param {boolean} accept - Whether to accept the request
   */
  const respondToRequest = (requestId, accept) => {
    Auth.respondToConnectionRequest(requestId, accept)
      .then(result => {
        if (result.success) {
          Toast.success(result.message);
          render(); // Re-render to remove the request
        } else {
          Toast.error('Failed to process request');
        }
      })
      .catch(error => {
        Toast.error('Error: ' + error.message);
      });
  };
  
  return {
    render
  };
})();
