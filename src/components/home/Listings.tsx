import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { MapPin, IndianRupee, MessageCircle, Star, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ADMIN_PHONE } from '@/src/lib/utils';
import { Property } from '@/src/types';
import { API_URLS } from '@/src/apiConfig';

export default function Listings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const res = await fetch(API_URLS.GET_PROPERTIES);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Handle both array response and object response
        let propertiesData = [];
        if (Array.isArray(data)) {
          propertiesData = data;
        } else if (data.properties && Array.isArray(data.properties)) {
          propertiesData = data.properties;
        } else if (data.data && Array.isArray(data.data)) {
          propertiesData = data.data;
        } else {
          propertiesData = [];
        }
        
        // Ensure each property has imageUrl (camelCase) from backend
        const formattedProperties = propertiesData.map((prop: any) => ({
          id: prop.id,
          title: prop.title,
          price: prop.price,
          type: prop.type,
          location: prop.location,
          imageUrl: prop.imageUrl || prop.image_url || '/placeholder-image.jpg',
          created_at: prop.created_at
        }));
        
        setProperties(formattedProperties);
      } catch (err) {
        console.error('Failed to fetch properties:', err);
        setError(err instanceof Error ? err.message : 'Failed to load properties');
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);

  const handleWhatsApp = (title: string) => {
    const message = `Hi, I saw "${title}" on your website. Is it available?`;
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Loading state
  if (loading) {
    return (
      <section id="listings" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="mt-4 text-gray-500">Loading properties...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="listings" className="py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-red-500 text-center">
              <p className="text-lg font-semibold">Unable to load properties</p>
              <p className="text-sm mt-2">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No properties state
  if (properties.length === 0) {
    return null;
  }

  return (
    <section id="listings" className="py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-4">Latest Verified Listings</h2>
            <p className="text-gray-600">Fresh properties added every 24 hours. Directly from owners with zero brokerage fees.</p>
          </div>
          <Link 
            to="/properties" 
            className="bg-primary text-white px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            View All Properties
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((listing, index) => (
            <motion.div
              key={listing.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                {listing.imageUrl ? (
                  <img 
                    src={listing.imageUrl} 
                    alt={listing.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  {listing.type}
                </div>
                
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-primary px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-sm">
                  <Star size={12} className="fill-current" />
                  Verified
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                  <MapPin size={14} />
                  <span className="truncate">{listing.location}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-1">
                  {listing.title}
                </h3>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-2xl font-bold text-gray-900 flex items-center">
                      <IndianRupee size={20} /> {listing.price}
                    </span>
                    <span className="text-sm text-gray-500">/ month</span>
                  </div>
                  
                  <button 
                    onClick={() => handleWhatsApp(listing.title)}
                    className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-all hover:scale-110 hover:rotate-6 shadow-lg shadow-green-200"
                    aria-label="Inquire on WhatsApp"
                  >
                    <MessageCircle size={22} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}