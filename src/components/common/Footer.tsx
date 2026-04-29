import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-20 border-t border-white/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl">
                N
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white italic">New Ashok Nagar Rooms</span>
            </Link>
            <p className="text-sm leading-relaxed mb-8">
              Helping students and working professionals find comfortable and affordable living spaces in New Ashok Nagar, Delhi. No brokers, no hidden fees.
            </p>
            {/* <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"><Facebook size={20} /></div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"><Instagram size={20} /></div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors cursor-pointer"><Twitter size={20} /></div>
            </div> */}
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/contact" className="hover:text-primary transition-colors">Find a Room</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Popular Areas</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="/" className="hover:text-primary transition-colors">Block A, East Delhi</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Block B, Near Metro</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Block C, Main Market</a></li>
              <li><a href="/" className="hover:text-primary transition-colors">Near Vasundhara Enclave</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><Phone size={16} className="text-primary" /> +91 6376228917</li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-primary" /> maheshkumar006376@gmail.com</li>
              <li className="flex items-center gap-3"><MapPin size={18} className="text-primary" /> New Ashok Nagar Metro, Delhi</li>
            </ul>
            <div className="mt-8 p-4 bg-primary/10 rounded-2xl border border-primary/20">
              <p className="text-xs text-primary font-bold mb-1 uppercase tracking-wider">Office Hours</p>
              <p className="text-white text-sm">Mon - Sat: 9:00 AM - 9:00 PM</p>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/5 text-center text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} New Ashok Nagar Rooms. Made with ❤️ for Delhi Professionals.
        </div>
      </div>
    </footer>
  );
}
