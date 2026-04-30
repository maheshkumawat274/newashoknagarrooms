import { motion } from 'motion/react';
import { Mail, MapPin, MessageSquare, ShieldCheck } from 'lucide-react';
import LeadForm from '../components/home/LeadForm';
import { ADMIN_PHONE } from '../lib/utils';

export default function Contact() {
  const handleWhatsApp = () => {
    // Direct WhatsApp number - Change to your number
    const message = "Hi, I need information about rooms in New Ashok Nagar.";
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-24 bg-white"
    >
      <div className="container relative mx-auto px-4 text-center lg:text-left">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-5xl font-bold mb-4">Contact Our Team</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Fill out the form below or WhatsApp us directly to get instant room availability updates.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-10 order-2 lg:order-1">
              {/* ✅ WhatsApp Direct Button */}
              <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/10">
                <div className="flex gap-6 items-start mb-6">
                  <div className="w-14 h-14 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center shrink-0">
                    <MessageSquare size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">WhatsApp Direct</h3>
                    <p className="text-gray-600 text-sm mb-6">Get instant replies. Send us a message on WhatsApp for any query about rooms, pricing, or availability.</p>
                    <button 
                      onClick={handleWhatsApp}
                      className="bg-green-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg shadow-green-200"
                    >
                      <MessageSquare size={20} />
                      WhatsApp Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-all">
                  <Mail className="text-primary mb-4" size={24} />
                  <h4 className="font-bold mb-2">Email Us</h4>
                  <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-widest">Official Support</p>
                  <a href="mailto:maheshkumar006376@gmail.com" className="text-primary font-bold hover:underline break-all">
                    maheshkumar006376@gmail.com
                  </a>
                </div>
                <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-all">
                  <MapPin className="text-primary mb-4" size={24} />
                  <h4 className="font-bold mb-2">Visit Office</h4>
                  <p className="text-xs text-gray-500 mb-4 font-medium uppercase tracking-widest">Main Branch</p>
                  <span className="text-gray-900 font-bold">New Ashok Nagar Metro Station, Delhi</span>
                </div>
              </div>

              <div className="p-8 bg-black text-white rounded-[32px] flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={18} className="text-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Trust Factor</span>
                  </div>
                  <h4 className="text-xl font-bold">Verified by 5,000+</h4>
                  <p className="text-gray-500 text-sm">Working professionals trust our curated listings daily.</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-full blur-3xl" />
                <LeadForm className="relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}