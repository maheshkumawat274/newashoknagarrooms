import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, MapPin, IndianRupee, Home, Image as ImageIcon, X, Loader2, Edit3 } from 'lucide-react';
import { Property } from '@/src/types';
import { API_URLS } from '@/src/apiConfig';

export default function PropertiesManager() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    type: '1RK',
    location: '',
  });

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URLS.GET_PROPERTIES);
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const openAddModal = () => {
    setEditingProperty(null);
    setFormData({ title: '', price: '', type: '1RK', location: '' });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      price: property.price,
      type: property.type,
      location: property.location,
    });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('price', formData.price);
    submitData.append('type', formData.type);
    submitData.append('location', formData.location);
    if (selectedFile) {
      submitData.append('image', selectedFile);
    }
    if (editingProperty) {
      // Send the filename part of the URL if no new file is selected
      const currentFilename = editingProperty.imageUrl.split('/').pop() || '';
      submitData.append('existingImage', currentFilename);
    }

    const url = editingProperty 
      ? API_URLS.UPDATE_PROPERTY(editingProperty.id) 
      : API_URLS.ADD_PROPERTY;
    const method = editingProperty ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        body: submitData
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchProperties();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;
    try {
      await fetch(API_URLS.DELETE_PROPERTY(id), { method: 'DELETE' });
      fetchProperties();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Manage Room Listings</h3>
          <p className="text-gray-500 text-sm">Add or remove properties displayed on the homepage</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          Add Property
        </button>
      </div>

      <div className="p-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-primary" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <motion.div
                key={property.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={property.imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal(property)}
                      className="w-10 h-10 bg-white/90 backdrop-blur-md text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="w-10 h-10 bg-white/90 backdrop-blur-md text-red-500 rounded-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-widest">
                      {property.type}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2 truncate">{property.title}</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
                      <MapPin size={16} />
                      {property.location}
                    </div>
                    <div className="flex items-center gap-2 text-primary text-xl font-bold">
                      <IndianRupee size={20} />
                      {property.price}
                      <span className="text-xs text-gray-400 font-medium">/ month</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && properties.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Home className="text-gray-200" size={40} />
            </div>
            <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No properties found</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[40px] w-full max-w-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-2xl font-bold">{editingProperty ? 'Edit Property' : 'Add New Property'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-200 rounded-xl transition-colors">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Property Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Luxury 1BHK Flat"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-primary"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Price (₹)</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 12,000"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-primary"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Room Type</label>
                    <select
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-primary"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option>1RK</option>
                      <option>1BHK</option>
                      <option>2RK</option>
                      <option>2BHK</option>
                      <option>3BHK</option>
                      <option>PG</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Block C, New Ashok Nagar"
                      className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none ring-1 ring-gray-200 outline-none focus:ring-2 focus:ring-primary"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Property Image</label>
                  <div className="relative">
                    <div className="flex items-center gap-4">
                      {editingProperty && !selectedFile && (
                        <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200">
                          <img src={editingProperty.imageUrl} className="w-full h-full object-cover" alt="Current" />
                        </div>
                      )}
                      <label className="flex-1 cursor-pointer">
                        <div className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 hover:border-primary/50 transition-all flex items-center gap-3">
                          <ImageIcon className="text-gray-400" size={20} />
                          <span className="text-gray-500 font-medium truncate">
                            {selectedFile ? selectedFile.name : (editingProperty ? 'Change image' : 'Choose image...')}
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                          />
                        </div>
                      </label>
                    </div>
                    {editingProperty && !selectedFile && (
                      <p className="text-[10px] text-gray-400 mt-1 ml-1">Leave empty to keep current image</p>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-xl shadow-primary/20 mt-4"
                >
                  {editingProperty ? 'Update Listing' : 'Create Listing'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
