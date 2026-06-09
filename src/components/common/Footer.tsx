import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react';
import { getAllSEOLinks } from '../landingpagedata/data';

export default function Footer() {
  const seoLinks = getAllSEOLinks();

  return (
    <footer className="bg-gray-950 text-gray-400 py-20 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1 - Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl">
                N
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white italic">New Ashok Nagar Rooms</span>
            </Link>
            <p className="text-sm leading-relaxed mb-8">
              Helping students and working professionals find comfortable and affordable living spaces in New Ashok Nagar, Delhi.
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/properties" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />Find a Room</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3 - Popular Searches (First 3 SEO Links) */}
          <div>
            <h4 className="text-white font-bold mb-6">Popular Searches</h4>
            <ul className="space-y-3 text-sm">
              {seoLinks.slice(0, 3).map((link, idx) => (
                <li key={idx}>
                  <Link to={`/${link.slug}`} className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - More Searches (Next 3 SEO Links) */}
          <div>
            <h4 className="text-white font-bold mb-6">More Searches</h4>
            <ul className="space-y-3 text-sm">
              {seoLinks.slice(3, 6).map((link, idx) => (
                <li key={idx}>
                  <Link to={`/${link.slug}`} className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    <span className="text-sm">{link.name}</span>
                  </Link>
                </li>
              ))}
              
              {/* Contact Info inside More Searches column */}
              <li className="mt-6 pt-4 border-t border-white/10">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone size={16} className="text-primary flex-shrink-0" /> 
                    <span>+91 6376228917</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={16} className="text-primary flex-shrink-0" /> 
                    <span className="break-all">maheshkumar006376@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={18} className="text-primary flex-shrink-0" /> 
                    <span>New Ashok Nagar Metro, Delhi</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 text-center text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} New Ashok Nagar Rooms. Made with ❤️ for Delhi Professionals.
        </div>
      </div>
    </footer>
  );
}