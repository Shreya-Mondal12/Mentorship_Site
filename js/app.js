
/**
 * Main application entry point for MentorMatch
 */

// Initialize authentication
Auth.init();

// Define routes
Router.addRoute('/', HomePage.render);
Router.addRoute('/profile', ProfilePage.render);
Router.addRoute('/discovery', DiscoveryPage.render);
Router.addRoute('/connections', ConnectionsPage.render);

// 404 route
Router.addRoute('*', () => {
  const appContainer = Utils.qs('#app');
  
  // Create page structure
  const page = Utils.createElement('div', { class: 'min-h-screen flex flex-col bg-gray-50' });
  
  // Add navbar
  page.appendChild(Navbar.render());
  
  // Error content
  const errorContent = Utils.createElement('div', { class: 'flex-1 flex flex-col items-center justify-center p-4 text-center' });
  
  errorContent.appendChild(Utils.createElement('h1', { class: 'text-4xl font-bold mb-4' }, '404'));
  errorContent.appendChild(Utils.createElement('p', { class: 'text-xl mb-6' }, 'Page not found'));
  errorContent.appendChild(Utils.createElement('button', {
    class: 'button btn-primary',
    onclick: () => Router.navigate('/')
  }, 'Return to Home'));
  
  page.appendChild(errorContent);
  
  // Append page to app container
  appContainer.innerHTML = '';
  appContainer.appendChild(page);
});

// Initialize the router
document.addEventListener('DOMContentLoaded', () => {
  Router.init();
});
