import { useState, useEffect, useRef } from 'react';
import { 
  Home, 
  Users, 
  Clock, 
  Shield, 
  Heart, 
  Phone, 
  Mail, 
  MapPin,
  CheckCircle,
  Building,
  Key,
  Sparkles,
  ArrowRight,
  Quote,
  Compass,
  Calendar,
  ThumbsUp,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ADMIN_PHONE } from '@/src/lib/utils';

export default function AboutUs() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Set visible true immediately for initial render
    setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => observer.disconnect();
  }, []);

  const stats = [
    { 
      icon: Building, 
      value: "20+", 
      label: "Active Properties", 
      trend: "Available Now",
      color: "from-blue-500 to-blue-600"
    },
    { 
      icon: Users, 
      value: "15+", 
      label: "Satisfied Tenants", 
      trend: "Happy Living",
      color: "from-green-500 to-green-600"
    },
    { 
      icon: Calendar, 
      value: "2+", 
      label: "Years Experience", 
      trend: "Local Experts",
      color: "from-orange-500 to-orange-600"
    },
    { 
      icon: Shield, 
      value: "100%", 
      label: "Verified Properties", 
      trend: "Quality Assured",
      color: "from-purple-500 to-purple-600"
    },
  ];

  const services = [
    {
      icon: Key,
      title: "Property Rentals",
      description: "Find your perfect home with our curated list of rental properties"
    },
    {
      icon: Home,
      title: "Property Sales",
      description: "Buy your dream property at the best market prices"
    },
    {
      icon: Building,
      title: "Commercial Spaces",
      description: "Perfect locations for your business and office needs"
    },
    {
      icon: Compass,
      title: "Property Investment",
      description: "Smart investment opportunities in growing areas"
    }
  ];

  const features = [
    "Direct Owner Connect",
    "Verified Properties",
    "Local Expertise",
    "Best Price Promise",
    "Quick Response",
    "Paperwork Support"
  ];

  const testimonials = [
    {
      name: "Rahul Sharma",
      location: "New Ashok Nagar",
      text: "Great experience finding my 2BHK flat. The team was very helpful throughout the process.",
      rating: 5
    },
    {
      name: "Priya Singh",
      location: "East Delhi",
      text: "Professional service and genuine properties. Highly recommended for property search.",
      rating: 5
    }
  ];
   const handleWhatsApp = () => {
      const message =
    "Hi, I am looking for flats for rent in New Ashok Nagar. Please share available properties.";
      window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
    };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      
      

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">

          {/* Split Layout - Content & Services */}
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-24">
            
            {/* Left Side - Main Content */}
            <div>
              <div className="relative">
                <div className="absolute -left-4 -top-4 w-20 h-20 bg-primary/5 rounded-2xl"></div>
                <div className="relative">
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">About Us</span>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Find the Best Properties in New Ashok Nagar
                  </h2>
                  
                  <div className="space-y-5 text-gray-600 leading-relaxed">
                    <p className="text-lg">
                      Welcome to <span className="font-semibold text-gray-900">New Ashok Nagar Properties</span>, your reliable destination
                      for buying, selling, and renting properties in New Ashok Nagar,
                      Delhi.
                    </p>

                    <p>
                      Whether you are looking for a flat in New Ashok Nagar,
                      a flat for rent in New Ashok Nagar, or a premium apartment for
                      your family, we provide verified property options that match
                      your requirements and budget.
                    </p>

                    <div className="bg-gray-50 rounded-xl p-6 my-6 border-l-4 border-primary">
                      <Quote size={24} className="text-primary mb-3 opacity-50" />
                      <p className="italic text-gray-700 leading-relaxed">
                        Our services include residential flats, builder floors,
                        rental properties, commercial spaces, apartments, and property
                        investment opportunities. We work closely with property owners,
                        buyers, and tenants to ensure a smooth and hassle-free experience.
                      </p>
                    </div>

                    <p>
                      From affordable rental homes to premium apartments such as
                      East End Apartment New Ashok Nagar and other residential projects,
                      we help clients discover the most suitable properties in the area.
                      Whether you want to buy, sell, rent, or invest, our local market
                      knowledge helps you make the right decision.
                    </p>
                  </div>

                  {/* Feature List */}
                  <div className="grid grid-cols-2 gap-3 mt-8">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Services Grid */}
            <div>
              <div className="bg-gray-50 rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6">What We Offer</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {services.map((service, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                        <service.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{service.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{service.description}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Contact */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone size={16} className="text-primary" />
                      <span>Quick Support: +91 6376228917</span>
                    </div>
                    <button className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all">
                      <Link to="/contact">Contact Us</Link> <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-24" ref={sectionRef}>
            <div className="text-center mb-12">
              <h3 className="text-2xl lg:text-3xl font-bold mb-3">What Our Clients Say</h3>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Real experiences from people who found their perfect home with us
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <ThumbsUp key={i} size={14} className="fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">"{testimonial.text}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs text-gray-400">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gray-900 rounded-3xl p-10 lg:p-16 text-center">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              Ready to Find Your Next Home?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Get in touch with us today. Our team is here to help you find the perfect property.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all">
                <Phone size={18} />
                <Link to='/contact'>Contact us</Link>
              </button>
              <button onClick={handleWhatsApp} className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-all">
                <MessageCircle size={18} />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}