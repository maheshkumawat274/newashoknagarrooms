// components/LandingPage.tsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, IndianRupee, Building, Wifi, Coffee, Car, Shield, 
  Phone, MessageCircle, CheckCircle, Sparkles, Wind, Dumbbell, 
  Users, Clock, Award, Star, Home, Key 
} from 'lucide-react';
import { landingPagesData } from '../landingpagedata/data';
import LANDINGSEO from './LandingSEO';
import { ADMIN_PHONE } from '@/src/lib/utils';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { slug } = useParams();
  const pageData = landingPagesData.find(page => page.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</h1>
          <p className="text-gray-500">The page you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const amenitiesList = [
    { icon: Wifi, name: "High Speed Internet" },
    { icon: Coffee, name: "Modular Kitchen" },
    { icon: Car, name: "Parking Available" },
    { icon: Shield, name: "24/7 Security" },
    { icon: Wind, name: "Air Conditioning" },
    { icon: Dumbbell, name: "Gym Access" },
    { icon: Building, name: "Lift Facility" },
    { icon: Users, name: "Community Hall" }
  ];


   const handleWhatsApp = () => {
       const message = `Hi, I'm interested in ${pageData.title}. Can you share more details?`;
      window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
    };

  return (
    <>
      <LANDINGSEO
        title={`${pageData.title} | Best Deals & Verified Listings in New Ashok Nagar`}
        description={pageData.metaDescription}
        keywords={pageData.keywords}
      />
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          "name": pageData.title,
          "description": pageData.description,
          "areaServed": "New Ashok Nagar, Delhi",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "New Ashok Nagar",
            "addressRegion": "Delhi",
            "addressCountry": "IN"
          }
        })}
      </script>

      <div className="min-h-screen bg-white">
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Sparkles size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Verified Listings Available</span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {pageData.heading}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8">
                {pageData.subheading}
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl">
                  <Phone size={20} />
                  <Link to='/contact'>Contact Now</Link>
                </button>
                <button 
                  onClick={handleWhatsApp}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-2xl font-semibold hover:bg-green-600 transition-all shadow-lg"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Property Types & Stats */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 mb-16">
              <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Property Types</h3>
                <div className="flex flex-wrap gap-2 justify-center mt-3">
                  {pageData.propertyTypes.map((type, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <IndianRupee className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Price Range</h3>
                <p className="text-2xl font-semibold text-primary mt-2">{pageData.avgPrice}</p>
                <p className="text-sm text-gray-500 mt-1">per month</p>
              </div>
              
              <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-2xl p-6 text-center">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Connectivity</h3>
                <p className="text-gray-600 mt-2">{pageData.connectivity}</p>
              </div>
            </div>

            {/* Main Description */}
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-6">Why Choose {pageData.title}?</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {pageData.description}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-12">Premium Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {amenitiesList.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group cursor-pointer">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all">
                      <amenity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-gray-700 font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Area Amenities */}
            <div className="bg-gray-50 rounded-3xl p-8 mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">Nearby Facilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {pageData.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle size={18} className="text-green-500" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Us */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-primary/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                <div className="space-y-3">
                  {[
                    "100% Verified Properties",
                    "Direct Owner Contact",
                    "No Hidden Charges",
                    "Local Area Experts",
                    "Quick Response",
                    "Best Price Guarantee"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle size={18} className="text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-primary/5 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-4">Area Highlights</h3>
                <div className="space-y-3">
                  {[
                    "Excellent Metro Connectivity",
                    "Close to Noida & Delhi",
                    "Schools & Colleges Nearby",
                    "Hospitals in Vicinity",
                    "Shopping Malls & Markets",
                    "Banking & ATM Facilities"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <MapPin size={18} className="text-primary" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-primary to-primary/90 rounded-3xl p-10 text-center text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Home?</h3>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                Contact us today and get the best deals on {pageData.title.toLowerCase()}
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <button className="inline-flex items-center gap-2 px-8 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-all">
                  <Phone size={18} />
                  <Link to='/contact'>Contact Now</Link>
                </button>
                <button 
                  onClick={handleWhatsApp}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}