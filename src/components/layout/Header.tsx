import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { navLinks } from '../../data/navLinks';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const isScrolled = useScrollPosition(30);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    if (isAuthenticated) {
      // If already logged in, take them straight to the admin side
      navigate('/admin/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleLogoutClick = () => {
    setIsMenuOpen(false);
    logout();
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-bg-dark/95 backdrop-blur-sm shadow-lg'
          : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-gold-primary font-extrabold text-xl md:text-2xl tracking-tight">
            STAR CIVIC
          </span>
          <span className="text-text-primary text-xs md:text-sm font-light tracking-widest">
            EMPIRE
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs md:text-sm font-medium tracking-widest uppercase transition-colors duration-200 ${
                link.isActive
                  ? 'text-gold-primary'
                  : 'text-text-primary hover:text-gold-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: Login / Logout + Mobile toggle */}
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={handleLoginClick}
                className="text-xs md:text-sm font-medium tracking-widest uppercase text-text-primary hover:text-gold-primary transition-colors"
              >
                Admin
              </button>
              <button
                onClick={handleLogoutClick}
                className="text-xs md:text-sm font-medium tracking-widest uppercase text-gold-primary border-b border-gold-primary pb-1 hover:text-gold-hover hover:border-gold-hover transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLoginClick}
              className="hidden md:inline-block text-xs md:text-sm font-medium tracking-widest uppercase text-gold-primary border-b border-gold-primary pb-1 hover:text-gold-hover hover:border-gold-hover transition-colors"
            >
              Login
            </button>
          )}

          <button
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen((v) => !v)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
          >
            <span
              className={`block w-6 h-0.5 bg-gold-primary transition-transform ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gold-primary transition-opacity ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-gold-primary transition-transform ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-bg-dark border-t border-white/5"
          >
            <div className="section-container py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-sm font-medium tracking-widest uppercase ${
                    link.isActive ? 'text-gold-primary' : 'text-text-primary'
                  }`}
                >
                  {link.label}
                </a>
              ))}

              {isAuthenticated ? (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="text-left text-sm font-medium tracking-widest uppercase text-text-primary"
                  >
                    Admin
                  </button>
                  <button
                    onClick={handleLogoutClick}
                    className="text-left text-sm font-medium tracking-widest uppercase text-gold-primary"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="text-left text-sm font-medium tracking-widest uppercase text-gold-primary"
                >
                  Login
                </button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};