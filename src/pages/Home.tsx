import Hero from '../components/home/Hero';
import Listings from '../components/home/Listings';
import HowItWorks from '../components/home/HowItWorks';
import { motion } from 'motion/react';
import { Shield, Sparkles, Clock, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import NearbyLocations from '../components/home/NearLocations';
import AboutUs from '../components/about/Aboutus';
import AboutUsShort from '../components/home/homeabout';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col"
    >
      <Hero />
      
      <TrustBanner />
      <Listings />
      <AboutUsShort/>
      <NearbyLocations/>
      <HowItWorks />
      <CTASection />
    </motion.div>
  );
}

function TrustBanner() {
  const points = [
    { icon: Shield, text: 'Verified Properties' },
    { icon: Sparkles, text: 'Best Price Deals' },
    { icon: Clock, text: 'Instant Response' },
    { icon: MapPin, text: 'Best Local Support' },
  ];

  return (
    <div className="bg-primary py-8 border-y border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {points.map((p, i) => (
            <div key={i} className="flex items-center justify-center gap-3 text-white">
              <p.icon size={24} className="text-white/60" />
              <span className="font-bold tracking-tight">{p.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTASection() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Stop searching. <br /><span className="text-primary">Start living.</span></h2>
          <p className="text-xl text-gray-600 mb-12">Don't waste days on the streets of New Ashok Nagar. Our digital concierge finds yours dream room in minutes.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-primary text-white px-12 py-5 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              <Link to="/contact"> Join Us Today</Link>
            </button>
            <button className="w-full sm:w-auto bg-white text-gray-900 border border-gray-200 px-12 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors">
              <Link to="/properties"> Browse Listings</Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
