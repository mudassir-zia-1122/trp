import { motion } from 'framer-motion';
import { FaCalendar, FaUsers, FaClock, FaStar, FaHeart } from 'react-icons/fa';

const PackageCard = ({ package: pkg }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative h-56 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/0ea5e9/ffffff?text=Travel+Package';
          }}
        />
        <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {pkg.category}
        </div>
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
          <FaHeart />
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < Math.floor(pkg.rating) ? 'text-yellow-400' : 'text-gray-300'}
              size={16}
            />
          ))}
          <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">({pkg.reviews})</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {pkg.title}
        </h3>
        <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 text-sm mb-4">
          <div className="flex items-center space-x-1">
            <FaClock />
            <span>{pkg.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaUsers />
            <span>{pkg.groupSize}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FaCalendar />
            <span>{pkg.availableDates}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <span className="text-2xl font-bold text-primary-600">${pkg.price}</span>
            <span className="text-gray-500 text-sm">/person</span>
          </div>
          <button 
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PackageCard;
