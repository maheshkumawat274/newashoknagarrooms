import { ADMIN_PHONE } from '@/src/lib/utils';
import { MapPin, Phone, ArrowRight, Users, CheckCircle, Building, Shield, ShoppingBag, Train, Trees, School, Hospital, Sun } from 'lucide-react';
import { useState } from 'react';

const locations = [
  { 
    name: 'Noida Sector 15', 
    rooms: 12,
    image: '/imgs/sector15.jpg',
    features: ['Metro Nearby', 'Market Area', '24/7 Security']
  },
  { 
    name: 'Noida Sector 16', 
    rooms: 8,
    image: '/imgs/sector16.jpg',
    features: ['Quiet Area', 'Park Nearby', 'Safe Locality']
  },
  
  { 
    name: 'Mayur Vihar', 
    rooms: 10,
    image: '/imgs/mayur-vihar.jpg',
    features: ['Well Connected', 'Delhi Border', 'Affordable']
  },
  { 
    name: 'Vasundhara Enclave', 
    rooms: 7,
    image: '/imgs/vasundhara.avif   ',
    features: ['Residential Area', 'Schools', 'Hospitals']
  },
];

// Icon mapping for features
const featureIcons = {
  'Metro Nearby': <Train className="w-3 h-3" />,
  'Market Area': <ShoppingBag className="w-3 h-3" />,
  '24/7 Security': <Shield className="w-3 h-3" />,
  'Quiet Area': <Sun className="w-3 h-3" />,
  'Park Nearby': <Trees className="w-3 h-3" />,
  'Safe Locality': <Shield className="w-3 h-3" />,
  'Shopping Hub': <ShoppingBag className="w-3 h-3" />,
  'Restaurants': <Building className="w-3 h-3" />,
  'Night Life': <Sun className="w-3 h-3" />,
  'Well Connected': <Train className="w-3 h-3" />,
  'Delhi Border': <MapPin className="w-3 h-3" />,
  'Affordable': <CheckCircle className="w-3 h-3" />,
  'Residential Area': <Building className="w-3 h-3" />,
  'Schools': <School className="w-3 h-3" />,
  'Hospitals': <Hospital className="w-3 h-3" />,
};

export default function NearbyLocations() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleWhatsApp = (location: string) => {
    const message = `Hi, I'm interested in getting a room in ${location}. Can you please share more details about availability, rent, and amenities?`;
    const url = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleQuickEnquiry = (location: string) => {
    setSelectedLocation(location);
    setTimeout(() => {
      handleWhatsApp(location);
      setSelectedLocation(null);
    }, 100);
  };

  return (
    <section className="py-6 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
            <MapPin className="text-primary w-4 h-4" />
            <span className="text-primary font-semibold text-sm">Prime Locations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Nearby Areas We Cover
          </h2>
         <p className="text-gray-600 max-w-6xl mx-auto text-md">
  Looking for <strong className="font-semibold text-gray-800">PG in Noida Sector 15</strong> or affordable <strong className="font-semibold text-gray-800">rooms for rent in Noida</strong>? Find fully furnished <strong className="font-semibold text-gray-800">paying guest accommodation</strong> near metro stations, including <strong className="font-semibold text-gray-800">boys PG in Noida Sector 18</strong>, <strong className="font-semibold text-gray-800">girls hostel in Mayur Vihar</strong>, and budget <strong className="font-semibold text-gray-800">rental rooms in Vasundhara</strong>. Best <strong className="font-semibold text-gray-800">PG near Noida Sector 16</strong> with <strong className="font-semibold text-gray-800">24/7 security</strong>, <strong className="font-semibold text-gray-800">WiFi</strong>, and <strong className="font-semibold text-gray-800">home-like food</strong>.
</p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Section */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={loc.image}
                  alt={loc.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Rooms Available Badge */}
                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs text-white font-semibold">
                  <Users className="inline w-3 h-3 mr-1" />
                  {loc.rooms} Rooms Available
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-primary transition-colors">
                  {loc.name}
                </h3>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {loc.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full"
                    >
                      {featureIcons[feature] || <CheckCircle className="w-3 h-3" />}
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleWhatsApp(loc.name)}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <Phone className="w-4 h-4" />
                    Get Room on WhatsApp
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoveredCard === i ? 'translate-x-1' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => handleQuickEnquiry(loc.name)}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Quick Enquiry
                  </button>
                </div>
              </div>

              {/* Loading Overlay for Quick Enquiry */}
              {selectedLocation === loc.name && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Redirecting...</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        

        {/* Info Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-6 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary/20 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Need a different location?</h4>
                <p className="text-gray-600 text-sm">We also cover surrounding areas. Contact us for more options!</p>
              </div>
            </div>
            <button
              onClick={() => handleWhatsApp('nearby location')}
              className="bg-primary text-white px-6 py-2 rounded-xl font-semibold hover:bg-primary-dark transition-colors shadow-md"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}