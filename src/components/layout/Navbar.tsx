
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getNavLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-primary font-medium"
      : "text-gray-600 hover:text-primary";
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">MentorMatch</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/" className={`${getNavLinkClass('/')} text-sm font-medium`}>
                  Home
                </Link>
                <Link to="/profile" className={`${getNavLinkClass('/profile')} text-sm font-medium`}>
                  My Profile
                </Link>
                <Link to="/discovery" className={`${getNavLinkClass('/discovery')} text-sm font-medium`}>
                  Find Matches
                </Link>
                <Link to="/connections" className={`${getNavLinkClass('/connections')} text-sm font-medium`}>
                  Connections
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Hello, {user.name.split(' ')[0]}!
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="flex items-center gap-1"
                  >
                    <LogOut size={14} />
                    <span>Logout</span>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/" className={`${getNavLinkClass('/')} text-sm font-medium`}>
                  Home
                </Link>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/?auth=login">
                    <User size={14} className="mr-1" />
                    <span>Login</span>
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/?auth=register">
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-primary focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {user ? (
              <>
                <Link 
                  to="/"
                  className="block py-2 px-4 rounded hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  to="/profile"
                  className="block py-2 px-4 rounded hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link 
                  to="/discovery"
                  className="block py-2 px-4 rounded hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Find Matches
                </Link>
                <Link 
                  to="/connections"
                  className="block py-2 px-4 rounded hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Connections
                </Link>
                <div className="py-2 px-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full justify-center"
                  >
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/"
                  className="block py-2 px-4 rounded hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <div className="py-2 px-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-center mb-2"
                    asChild
                  >
                    <Link 
                      to="/?auth=login"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </Button>
                  <Button 
                    size="sm" 
                    className="w-full justify-center"
                    asChild
                  >
                    <Link 
                      to="/?auth=register"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
