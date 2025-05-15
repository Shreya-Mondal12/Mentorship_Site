
/**
 * Navbar component for MentorMatch
 */

const Navbar = (() => {
  /**
   * Render the navbar
   * @returns {HTMLElement} - The navbar element
   */
  const render = () => {
    const currentRoute = Router.getCurrentRoute();
    const currentUser = Auth.getCurrentUser();
    
    const navbar = Utils.createElement('nav', { class: 'navbar' });
    const container = Utils.createElement('div', { class: 'nav-content' });
    
    // Logo
    const logo = Utils.createElement('a', {
      href: '/',
      class: 'logo'
    }, 'MentorMatch');
    
    container.appendChild(logo);
    
    // Links
    const links = Utils.createElement('div', { class: 'nav-links' });
    
    // Add appropriate links based on authentication state
    if (currentUser) {
      // Links for logged-in users
      const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/discovery', label: 'Find Matches' },
        { path: '/connections', label: 'Connections' },
        { path: '/profile', label: 'Profile' }
      ];
      
      navLinks.forEach(link => {
        links.appendChild(Utils.createElement('a', {
          href: link.path,
          class: `nav-link ${currentRoute === link.path ? 'active' : ''}`
        }, link.label));
      });
      
      // Logout button
      links.appendChild(Utils.createElement('button', {
        class: 'button btn-secondary',
        onclick: () => {
          Auth.logout();
          Router.navigate('/');
          Toast.success('You have been logged out successfully');
        }
      }, 'Logout'));
    } else {
      // Links for guests
      links.appendChild(Utils.createElement('a', {
        href: '/',
        class: `nav-link ${currentRoute === '/' ? 'active' : ''}`
      }, 'Home'));
      
      // Login and register buttons
      links.appendChild(Utils.createElement('button', {
        class: 'button btn-secondary',
        onclick: () => {
          Router.navigate('/', { auth: 'login' });
        }
      }, 'Log In'));
      
      links.appendChild(Utils.createElement('button', {
        class: 'button btn-primary',
        onclick: () => {
          Router.navigate('/', { auth: 'register' });
        }
      }, 'Sign Up'));
    }
    
    container.appendChild(links);
    navbar.appendChild(container);
    
    return navbar;
  };
  
  return {
    render
  };
})();
