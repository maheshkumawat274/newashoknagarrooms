import { ADMIN_PHONE } from '@/src/lib/utils';
import { ArrowRight, Building, Users, Clock, Shield, CheckCircle, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutUsShort() {
  const stats = [
    { icon: Building, value: "20+", label: "Properties" },
    { icon: Users, value: "15+", label: "Happy Clients" },
    { icon: Clock, value: "2+", label: "Years Exp" },
    { icon: Shield, value: "100%", label: "Verified" },
  ];

  const features = [
    "Direct Owner Connect",
    "Verified Properties",
    "Local Expertise",
    "Quick Response"
  ];
  const handleWhatsApp = () => {
      const message =
    "Hi, I am looking for flats for rent in New Ashok Nagar. Please share available properties.";
      window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
    };
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-3 block">
              About Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Your Trusted Partner in
              <span className="text-primary block mt-1">New Ashok Nagar</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Helping you find the perfect property with complete transparency and local expertise
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left */}
            <div>
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to <span className="font-semibold text-gray-900">New Ashok Nagar Properties</span>, your reliable destination for buying, selling, and renting properties in New Ashok Nagar, Delhi.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Whether you're looking for a flat for rent or a premium apartment for your family, we provide verified property options that match your requirements and budget.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <CheckCircle size={14} className="text-green-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
               <Link to="/about-us">Learn More</Link> <ArrowRight size={16} />
              </button>
            </div>

            {/* Right - Quick Contact */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Get in Touch</h3>
              <p className="text-gray-500 text-sm mb-6">
                Have questions? We're here to help you find your perfect home.
              </p>
              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all">
                  <Phone size={18} />
                  <Link to='/contact'>Contact us</Link>
                </button>
                <button onClick={handleWhatsApp} className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all">
                  <MessageCircle size={18} />
                  WhatsApp
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">
                Response within 24 hours
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}