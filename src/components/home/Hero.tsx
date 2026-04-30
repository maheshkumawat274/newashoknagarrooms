import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home as HomeIcon, MapPin, Search, ChevronRight, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';
import LeadForm from './LeadForm';
import { ADMIN_PHONE } from '@/src/lib/utils';

const heroImages = [
  "/imgs/1bhk.avif",
  "/imgs/2bhk.avif",
  "/imgs/1rk.avif",
  "/imgs/3bhk.jpg"
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // WhatsApp handler
  const handleWhatsApp = () => {
    const message = "Hi, I need information about rooms in New Ashok Nagar.";
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Get Started handler
  const handleGetStarted = () => {
    const element = document.getElementById('listings');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] py-5  flex items-center overflow-hidden bg-secondary">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform translate-x-20 hidden lg:block" />
      
      <div className="container mx-auto px-4 relative z-10 py-10 lg:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 font-medium"
            >
              <MapPin size={16} />
              New Ashok Nagar, Delhi
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              Find Rooms, PG & <br />
              <span className="text-primary italic">Flats Instantly</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 mb-10 max-w-2xl px-4 lg:px-0"
            >
              Stop wandering door-to-door. Get the best, verified room options in New Ashok Nagar directly on your WhatsApp.
            </motion.p>

            {/* ✅ CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12"
            >
              {/* WhatsApp CTA Button */}
              <button
                onClick={handleWhatsApp}
                className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-green-600 transition-all hover:scale-105 shadow-lg shadow-green-200 w-full sm:w-auto justify-center"
              >
                <MessageCircle size={22} />
                Chat on WhatsApp
              </button>

              {/* Get Started CTA Button */}
              <button
                onClick={handleGetStarted}
                className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/20 w-full sm:w-auto justify-center"
              >
                <ArrowRight size={22} />
                Get Started Now
              </button>
            </motion.div>

            {/* Mobile Image Slider */}
            <div className="lg:hidden w-full mb-10 rounded-3xl overflow-hidden shadow-2xl ring-8 ring-white relative h-64">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImage}
                  src={heroImages[currentImage]} 
                  alt={`Room ${currentImage + 1}`} 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 size={20} />
                </div>
                <span className="font-medium">Direct Owner</span>
              </div>
              <div className="flex items-center gap-2 text-primary font-bold">
                <Sparkles size={20} />
                <span>Verified Rooms</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/2 w-full flex flex-col items-center lg:items-end gap-8"
          >
            {/* Desktop Image Slider */}
            <div className="hidden lg:block w-full max-w-lg -mb-20 translate-x-10 rounded-[40px] overflow-hidden shadow-2xl ring-[12px] ring-white relative z-0 h-80">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={currentImage}
                  src={heroImages[currentImage]} 
                  alt={`Room ${currentImage + 1}`} 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>
            
            <div className="w-full max-w-md relative z-10">
              <LeadForm />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Grid */}
      <div className="absolute bottom-10 left-10 opacity-10 hidden lg:block">
        <IconGrid size={24} />
      </div>
    </section>
  );
}

function CheckCircle2({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>;
}

function IconGrid({ size }: { size: number }) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-primary" />
      ))}
    </div>
  );
}