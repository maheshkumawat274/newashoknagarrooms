import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, IndianRupee, MessageCircle, Star, Filter, ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ADMIN_PHONE } from '@/src/lib/utils';
import { Property } from '@/src/types';
import { API_URLS } from '@/src/apiConfig';

export default function Properties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_URLS.GET_PROPERTIES);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        
        // Handle both array and object response formats
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
        
        // Ensure each property has imageUrl (camelCase)
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
        setProperties([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
    window.scrollTo(0, 0);
  }, []);

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || p.type === selectedType;
    return matchesSearch && matchesType;
  });

  const propertyTypes = ['All', '1RK', '1BHK', '2RK', '2BHK', '3BHK', 'PG'];

  const handleWhatsApp = (title: string) => {
    const message = `Hi, I saw "${title}" on your website. Is it available?`;
    window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-secondary min-h-screen relative">
      {/* Search Hero Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          
          <div className="max-w-4xl">
            <h1 className="text-5xl font-black italic tracking-tight mb-6">find your perfect <span className="text-primary underline decoration-primary/30">room</span> in <br /> new ashok nagar.</h1>
            <p className="text-gray-500 text-lg mb-10 max-w-2xl">Browse through our verified collection of 1RK, 1BHK, and 2BHK flats. No brokers, no hidden fees, just pure direct deals.</p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={24} />
                <input 
                  type="text" 
                  placeholder="Search by area or property name..."
                  className="w-full pl-16 pr-8 py-5 rounded-[24px] bg-secondary border-none ring-2 ring-transparent focus:ring-primary focus:bg-white transition-all text-lg outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 p-2 bg-secondary rounded-[24px] overflow-x-auto no-scrollbar whitespace-nowrap md:w-auto">
                {propertyTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-6 py-3 rounded-2xl font-bold transition-all ${
                      selectedType === type ? 'bg-primary text-white shadow-lg' : 'text-gray-500 hover:bg-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Listings Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <Filter className="text-primary" />
              Showing {filteredProperties.length} Properties
            </h2>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <Loader2 className="animate-spin text-primary" size={48} />
              <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Fetching fresh listings...</p>
            </div>
          ) : (
            <>
              {filteredProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <AnimatePresence mode="popLayout">
                    {filteredProperties.map((listing, i) => (
                      <motion.div
                        key={listing.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all group"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                          <img 
                            src={listing.imageUrl} 
                            alt={listing.title} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                            }}
                          />
                          <div className="absolute top-6 left-6 bg-primary text-white px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl">
                            {listing.type}
                          </div>
                          <div className="absolute top-6 right-6 bg-white/95 backdrop-blur text-primary px-3 py-2 rounded-2xl text-xs font-bold flex items-center gap-1 shadow-lg">
                            <Star size={16} className="fill-current" />
                            Verified
                          </div>
                        </div>
                        
                        <div className="p-8">
                          <div className="flex items-center gap-2 text-gray-400 text-sm font-bold mb-4">
                            <MapPin size={16} className="text-primary" />
                            {listing.location}
                          </div>
                          <h3 className="text-2xl font-black italic mb-6 group-hover:text-primary transition-colors line-clamp-1">{listing.title}</h3>
                          
                          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                            <div>
                              <div className="flex items-center text-3xl font-black text-gray-900 leading-none">
                                <IndianRupee size={24} strokeWidth={3} /> {listing.price}
                              </div>
                              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1 block">per month</span>
                            </div>
                            
                            <button 
                              onClick={() => handleWhatsApp(listing.title)}
                              className="bg-green-500 text-white p-4 rounded-2xl hover:bg-green-600 transition-all hover:-translate-y-1 active:scale-95 shadow-xl shadow-green-500/20"
                            >
                              <MessageCircle size={28} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-40 bg-white rounded-[60px] border-2 border-dashed border-gray-100">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="text-gray-200" size={48} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No matching properties found</h3>
                  <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setSelectedType('All'); }}
                    className="mt-8 text-primary font-bold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}