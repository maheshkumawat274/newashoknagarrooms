import { Link, useLocation } from 'react-router-dom';
import { Home, Phone, LayoutDashboard, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Rooms', path: '/properties', icon: Home },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl group-hover:rotate-12 transition-transform">
              N
            </div>
            <span className="font-display font-bold text-xl tracking-tight">New Ashok <span className="text-primary">Nagar Rooms</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-semibold transition-colors flex items-center gap-2",
                  location.pathname === link.path ? "text-primary px-4 py-2 bg-primary/5 rounded-full" : "text-gray-500 hover:text-gray-900"
                )}
              >
                <link.icon size={16} />
                {link.name}
              </Link>
            ))}
          </div>

          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4 space-y-2">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium",
                location.pathname === link.path ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <link.icon size={20} />
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
