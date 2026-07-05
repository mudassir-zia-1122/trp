import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold">Travel & Tour</span>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for unforgettable travel experiences. Explore the world with us.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/1AMfjAP9Pm/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="https://x.com/MudassirZia79" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com/mudassirzia38?igsh=MXIyNXh0b3Vhbmc3bA==" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.linkedin.com/in/mudassir-zia-648187373?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-500 transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-400 hover:text-primary-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/#destinations" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/#packages" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-400 hover:text-primary-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-500 mt-1" />
                <span className="text-gray-400">Hayatabad, Peshawar, KPK, Pakistan</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-500" />
                <span className="text-gray-400">03705140238</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-500" />
                <span className="text-gray-400">ziamudassir17@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers and travel updates.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-primary-500 text-white"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Travel & Tour. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
