import { Link, useLocation } from 'react-router-dom';
import { Home, Phone, LayoutDashboard, Menu, X, MapPin, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { ADMIN_PHONE, cn } from '@/src/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', icon: Home, description: 'Best PG in Noida' },
    { name: 'Rooms', path: '/properties', icon: LayoutDashboard, description: 'Furnished Rooms' },
    { name: 'Contact', path: '/contact', icon: Phone, description: 'Book Your Room' },
  ];

  const locations = [
    { name: 'New Ashok Nagar', icon: MapPin, path: '/location/new-ashok-nagar' },
    { name: 'Mayur Vihar', icon: MapPin, path: '/location/mayur-vihar' },
    { name: 'Vasundhara', icon: MapPin, path: '/location/vasundhara' },
    { name: 'Noida Sector 15', icon: MapPin, path: '/location/noida-sector-15' },
    { name: 'Noida Sector 16', icon: MapPin, path: '/location/noida-sector-16' },
  ];

  const handleLocationClick = (locationName: string) => {
    const message = `Hi, I'm interested in getting a room in ${locationName}. Can you please share more details about availability, rent, and amenities?`;
    const url = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="hidden lg:block bg-gradient-to-r from-primary to-primary/80 text-white py-2 text-sm relative z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                New Ashok Nagar | Mayur Vihar | Vasundhara | Noida Sectors 15, 16
              </span>
              <span className="text-white/80">|</span>
              <span>⭐ 4.9 Rated PG | 500+ Happy Tenants</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="tel:+916376228917" className="hover:underline text-sm">
                📞 Call Now: +91 6376228917
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Top Navbar */}
      <nav className="sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo with SEO Text */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 text-white rounded-xl flex items-center justify-center font-bold text-xl group-hover:rotate-12 transition-transform shadow-lg">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg md:text-xl tracking-tight">
                  New Ashok <span className="text-primary">Nagar Rooms</span>
                </span>
                <span className="text-xs text-gray-500 hidden md:block">
                  Best PG in Noida | Boys & Girls Hostel
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="group relative"
                >
                  <div className={cn(
                    "text-sm font-semibold transition-all flex items-center gap-2 px-4 py-2 rounded-full",
                    location.pathname === link.path 
                      ? "text-primary bg-primary/5" 
                      : "text-gray-600 hover:text-primary hover:bg-gray-50"
                  )}>
                    <link.icon size={16} />
                    <span>{link.name}</span>
                  </div>
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {link.description}
                  </span>
                </Link>
              ))}

              {/* Locations Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-sm font-semibold transition-all flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:text-primary hover:bg-gray-50"
                >
                  <MapPin size={16} />
                  Locations
                  <ChevronDown size={14} className={cn("transition-transform", isDropdownOpen && "rotate-180")} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                    {locations.map((location) => (
                      <button
                        key={location.name}
                        onClick={() => {
                          handleLocationClick(location.name);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors text-left"
                      >
                        <location.icon size={14} />
                        {location.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <Link
                to="/contact"
                className="bg-gradient-to-r from-primary to-primary/80 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all hover:scale-105"
              >
                Book Now 🚀
              </Link>
            </div>

            <button 
              className="lg:hidden p-2 text-gray-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-white border-b border-gray-100 py-4 px-4 space-y-2">
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
            <div className="border-t border-gray-100 pt-2 mt-2">
              <span className="text-xs text-gray-500 block px-4 py-2">Popular Locations:</span>
              {locations.map((location) => (
                <button
                  key={location.name}
                  onClick={() => {
                    handleLocationClick(location.name);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <location.icon size={16} />
                  {location.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation Bar - REMOVED to fix gap issue */}
      {/* Mobile menu is now only accessible via hamburger icon */}
    </>
  );
}