import { MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { ADMIN_PHONE } from '@/src/lib/utils';

export default function WhatsAppButton() {
  const handleClick = () => {
    const message = "Hi, I am interested in rooms in New Ashok Nagar. Please share some options.";
    const url = `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="whatsapp-float flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#20ba59] transition-colors group"
    >
      <MessageSquare size={32} />
      <span className="absolute right-full mr-4 bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-gray-100">
        Chat with Admin
      </span>
    </motion.button>
  );
}
