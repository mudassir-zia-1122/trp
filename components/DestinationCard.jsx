import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaStar, FaArrowRight } from 'react-icons/fa';

const DestinationCard = ({ destination }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300/0ea5e9/ffffff?text=Destination';
          }}
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="flex items-center space-x-1">
            <FaStar className="text-yellow-400" />
            <span className="font-semibold text-sm">{destination.rating}</span>
          </div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2 text-white">
            <FaMapMarkerAlt />
            <span className="text-sm font-medium">{destination.country}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {destination.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {destination.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-primary-600">${destination.price}</span>
            <span className="text-gray-500 text-sm">/person</span>
          </div>
          <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-semibold transition-colors">
            <span>Explore</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
