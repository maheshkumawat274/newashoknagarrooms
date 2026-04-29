import { motion } from 'motion/react';
import { ClipboardList, MessageSquare, Key, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  { icon: ClipboardList, title: 'Submit Lead', desc: 'Fill out the form with your budget and property type preferences.' },
  { icon: MessageSquare, title: 'Chat on WhatsApp', desc: 'Instantly connect with our admin to see available room photos and videos.' },
  { icon: Key, title: 'Visit & Move-in', desc: 'Schedule a physical visit, verify the room, and shift on the same day if you like it.' },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-xl mx-auto">Three simple steps to find your next home in New Ashok Nagar without any stress.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 hidden md:block z-0" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-primary text-white rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-primary/20 ring-8 ring-white">
                <step.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
              <p className="text-gray-500 leading-relaxed max-w-[250px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-24 p-12 bg-primary text-white rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 bg-white/10 px-4 py-2 rounded-full w-fit">
              <ShieldCheck size={20} />
              <span className="font-bold text-sm uppercase tracking-wider">Trusted by 5000+ Tenants</span>
            </div>
            <h3 className="text-3xl font-bold mb-2">Ready to find your room?</h3>
            <p className="text-white/70">Join thousands of others who found their perfect home through us.</p>
          </div>
          <button className="bg-white text-primary px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
            <Link to="/contact" className="flex items-center gap-2">
              Get Started
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
