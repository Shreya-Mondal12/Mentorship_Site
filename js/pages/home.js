
/**
 * Home page component for MentorMatch
 */

const HomePage = (() => {
  /**
   * Render the home page
   */
  const render = () => {
    const appContainer = Utils.qs('#app');
    const currentUser = Auth.getCurrentUser();
    
    // Check if we should show auth form
    const authParam = Router.getParam('auth');
    
    if (authParam === 'login' || authParam === 'register') {
      // Render auth form
      appContainer.appendChild(Navbar.render());
      
      const authContainer = Utils.createElement('div', {
        class: 'flex-1 flex items-center justify-center p-4'
      });
      
      authContainer.appendChild(AuthPage.renderAuthForm(authParam));
      appContainer.appendChild(authContainer);
      return;
    }
    
    // Create page structure
    const page = Utils.createElement('div', { class: 'min-h-screen flex flex-col bg-gray-50' });
    
    // Add navbar
    page.appendChild(Navbar.render());
    
    // Main content container
    const main = Utils.createElement('div', { class: 'flex-1' });
    
    // Hero section
    const hero = Utils.createElement('div', { class: 'hero' });
    const heroContent = Utils.createElement('div', { class: 'hero-content' });
    
    // Hero left column
    const heroLeft = Utils.createElement('div', { class: 'max-w-lg' });
    
    heroLeft.appendChild(Utils.createElement('h1', { class: 'text-4xl font-bold mb-6' }, 'Find Your Perfect Mentorship Match'));
    
    heroLeft.appendChild(Utils.createElement('p', { class: 'text-xl mb-8' }, 'Connect with experienced mentors or eager mentees in your field. Share knowledge, grow together, and advance your career.'));
    
    // Add appropriate buttons based on authentication state
    const heroButtons = Utils.createElement('div', { class: 'flex flex-wrap gap-4' });
    
    if (currentUser) {
      // Buttons for logged-in users
      heroButtons.appendChild(Utils.createElement('button', {
        class: 'button btn-secondary',
        onclick: () => Router.navigate('/discovery')
      }, 'Find Matches'));
      
      heroButtons.appendChild(Utils.createElement('button', {
        class: 'button btn-primary',
        onclick: () => Router.navigate('/profile')
      }, 'View Profile'));
    } else {
      // Buttons for guests
      heroButtons.appendChild(Utils.createElement('button', {
        class: 'button btn-secondary',
        onclick: () => Router.navigate('/', { auth: 'register' })
      }, 'Get Started'));
      
      heroButtons.appendChild(Utils.createElement('button', {
        class: 'button btn-primary',
        onclick: () => Router.navigate('/', { auth: 'login' })
      }, 'Log In'));
    }
    
    heroLeft.appendChild(heroButtons);
    heroContent.appendChild(heroLeft);
    
    // Hero right column (image)
    const heroRight = Utils.createElement('div', { class: 'hero-image' });
    const heroImage = Utils.createElement('img', {
      src: 'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&q=80&w=800',
      alt: 'Mentorship',
      class: 'rounded-lg shadow-lg'
    });
    heroRight.appendChild(heroImage);
    heroContent.appendChild(heroRight);
    
    hero.appendChild(heroContent);
    main.appendChild(hero);
    
    // Features section
    const features = Utils.createElement('div', { class: 'features' });
    const featuresContainer = Utils.createElement('div', { class: 'container' });
    
    featuresContainer.appendChild(Utils.createElement('h2', { class: 'text-3xl font-bold text-center mb-12' }, 'How It Works'));
    
    const featuresGrid = Utils.createElement('div', { class: 'features-grid' });
    
    // Feature 1
    const feature1 = Utils.createElement('div', { class: 'feature-card' });
    feature1.appendChild(Utils.createElement('div', { class: 'feature-icon' }, '1'));
    feature1.appendChild(Utils.createElement('h3', { class: 'text-xl font-semibold mb-2' }, 'Create Your Profile'));
    feature1.appendChild(Utils.createElement('p', { class: 'text-gray-600' }, 'Sign up and build your profile with your skills, interests, and what you\'re looking for in a mentorship relationship.'));
    featuresGrid.appendChild(feature1);
    
    // Feature 2
    const feature2 = Utils.createElement('div', { class: 'feature-card' });
    feature2.appendChild(Utils.createElement('div', { class: 'feature-icon' }, '2'));
    feature2.appendChild(Utils.createElement('h3', { class: 'text-xl font-semibold mb-2' }, 'Find Your Match'));
    feature2.appendChild(Utils.createElement('p', { class: 'text-gray-600' }, 'Browse through potential mentors or mentees, filter by skills, interests, or experience level to find your perfect match.'));
    featuresGrid.appendChild(feature2);
    
    // Feature 3
    const feature3 = Utils.createElement('div', { class: 'feature-card' });
    feature3.appendChild(Utils.createElement('div', { class: 'feature-icon' }, '3'));
    feature3.appendChild(Utils.createElement('h3', { class: 'text-xl font-semibold mb-2' }, 'Connect & Grow'));
    feature3.appendChild(Utils.createElement('p', { class: 'text-gray-600' }, 'Send connection requests, start conversations, and begin your mentorship journey to accelerate your personal and professional growth.'));
    featuresGrid.appendChild(feature3);
    
    featuresContainer.appendChild(featuresGrid);
    features.appendChild(featuresContainer);
    main.appendChild(features);
    
    // Testimonials section
    const testimonials = Utils.createElement('div', { class: 'testimonials' });
    const testimonialsContainer = Utils.createElement('div', { class: 'container' });
    
    testimonialsContainer.appendChild(Utils.createElement('h2', { class: 'text-3xl font-bold text-center mb-12' }, 'What Our Users Say'));
    
    const testimonialGrid = Utils.createElement('div', { class: 'testimonial-grid' });
    
    // Testimonial 1
    const testimonial1 = Utils.createElement('div', { class: 'card' });
    testimonial1.appendChild(Utils.createElement('p', { class: 'text-gray-600 italic mb-4' }, '"I found an amazing mentor who helped me navigate my first year in tech. The guidance I received was invaluable for my career growth."'));
    
    const testimonialAuthor1 = Utils.createElement('div', { class: 'flex items-center' });
    testimonialAuthor1.appendChild(Utils.createElement('div', { class: 'w-10 h-10 bg-primary rounded-full mr-3' }));
    
    const authorInfo1 = Utils.createElement('div', {});
    authorInfo1.appendChild(Utils.createElement('p', { class: 'font-medium' }, 'Alex Johnson'));
    authorInfo1.appendChild(Utils.createElement('p', { class: 'text-sm text-gray-500' }, 'Junior Developer'));
    
    testimonialAuthor1.appendChild(authorInfo1);
    testimonial1.appendChild(testimonialAuthor1);
    testimonialGrid.appendChild(testimonial1);
    
    // Testimonial 2
    const testimonial2 = Utils.createElement('div', { class: 'card' });
    testimonial2.appendChild(Utils.createElement('p', { class: 'text-gray-600 italic mb-4' }, '"As a mentor, I\'ve connected with passionate mentees who remind me why I love my field. It\'s been rewarding to give back and watch them grow."'));
    
    const testimonialAuthor2 = Utils.createElement('div', { class: 'flex items-center' });
    testimonialAuthor2.appendChild(Utils.createElement('div', { class: 'w-10 h-10 bg-primary rounded-full mr-3' }));
    
    const authorInfo2 = Utils.createElement('div', {});
    authorInfo2.appendChild(Utils.createElement('p', { class: 'font-medium' }, 'Sarah Chen'));
    authorInfo2.appendChild(Utils.createElement('p', { class: 'text-sm text-gray-500' }, 'Senior Product Manager'));
    
    testimonialAuthor2.appendChild(authorInfo2);
    testimonial2.appendChild(testimonialAuthor2);
    testimonialGrid.appendChild(testimonial2);
    
    testimonialsContainer.appendChild(testimonialGrid);
    testimonials.appendChild(testimonialsContainer);
    main.appendChild(testimonials);
    
    // CTA section
    const cta = Utils.createElement('div', { class: 'container py-16 text-center' });
    
    cta.appendChild(Utils.createElement('h2', { class: 'text-3xl font-bold mb-6' }, 'Ready to Start Your Mentorship Journey?'));
    
    cta.appendChild(Utils.createElement('p', { class: 'text-xl text-gray-600 mb-8 max-w-2xl mx-auto' }, 'Whether you\'re looking to share your knowledge or seeking guidance, join our community today.'));
    
    if (currentUser) {
      cta.appendChild(Utils.createElement('button', {
        class: 'button btn-primary',
        onclick: () => Router.navigate('/discovery')
      }, 'Find Your Match Now'));
    } else {
      cta.appendChild(Utils.createElement('button', {
        class: 'button btn-primary',
        onclick: () => Router.navigate('/', { auth: 'register' })
      }, 'Sign Up For Free'));
    }
    
    main.appendChild(cta);
    page.appendChild(main);
    
    // Footer
    const footer = Utils.createElement('footer', { class: 'footer' });
    const footerContent = Utils.createElement('div', { class: 'footer-content' });
    
    // Footer top
    const footerTop = Utils.createElement('div', { class: 'footer-top' });
    
    const footerLogo = Utils.createElement('div', {});
    footerLogo.appendChild(Utils.createElement('h3', { class: 'text-xl font-bold' }, 'MentorMatch'));
    footerLogo.appendChild(Utils.createElement('p', { class: 'text-gray-400' }, 'Connecting mentors and mentees worldwide'));
    
    footerTop.appendChild(footerLogo);
    
    const footerLinks = Utils.createElement('div', { class: 'footer-links' });
    
    ['About', 'FAQ', 'Privacy', 'Terms', 'Contact'].forEach(link => {
      footerLinks.appendChild(Utils.createElement('a', {
        href: '#',
        class: 'footer-link'
      }, link));
    });
    
    footerTop.appendChild(footerLinks);
    footerContent.appendChild(footerTop);
    
    // Footer bottom
    const footerBottom = Utils.createElement('div', { class: 'footer-bottom' });
    footerBottom.appendChild(Utils.createElement('p', {}, `© ${new Date().getFullYear()} MentorMatch. All rights reserved.`));
    
    footerContent.appendChild(footerBottom);
    footer.appendChild(footerContent);
    page.appendChild(footer);
    
    // Append page to app container
    appContainer.innerHTML = '';
    appContainer.appendChild(page);
  };
  
  return {
    render
  };
})();
