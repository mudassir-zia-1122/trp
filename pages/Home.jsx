import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import PackageCard from '../components/PackageCard';
import { FaPlane, FaHotel, FaCar, FaUmbrellaBeach, FaMountain, FaCamera, FaHeadset, FaShieldAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const destinations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      country: 'Indonesia',
      image: 'https://images.pexels.com/photos/2113554/pexels-photo-2113554.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Experience the magic of Bali with its stunning beaches, temples, and vibrant culture.',
      rating: 4.9,
      price: 1299
    },
    {
      id: 2,
      name: 'Santorini, Greece',
      country: 'Greece',
      image: 'https://images.pexels.com/photos/210452/pexels-photo-210452.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Discover the iconic white-washed buildings and breathtaking sunsets of Santorini.',
      rating: 4.8,
      price: 1599
    },
    {
      id: 3,
      name: 'Kyoto, Japan',
      country: 'Japan',
      image: 'https://images.pexels.com/photos/2084858/pexels-photo-2084858.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Immerse yourself in Japanese culture with ancient temples and beautiful gardens.',
      rating: 4.9,
      price: 1899
    },
    {
      id: 4,
      name: 'Machu Picchu, Peru',
      country: 'Peru',
      image: 'https://images.pexels.com/photos/2290086/pexels-photo-2290086.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Explore the ancient Incan citadel set high in the Andes Mountains.',
      rating: 4.7,
      price: 2199
    },
    {
      id: 5,
      name: 'Maldives',
      country: 'Maldives',
      image: 'https://images.pexels.com/photos/1591376/pexels-photo-1591376.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Relax in paradise with crystal-clear waters and overwater bungalows.',
      rating: 5.0,
      price: 2999
    },
    {
      id: 6,
      name: 'Swiss Alps',
      country: 'Switzerland',
      image: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Experience breathtaking mountain scenery and world-class skiing.',
      rating: 4.8,
      price: 2499
    }
  ];

  const packages = [
    {
      id: 1,
      title: 'Tropical Paradise Escape',
      category: 'Beach',
      image: 'https://images.pexels.com/photos/2113554/pexels-photo-2113554.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      reviews: 234,
      duration: '7 Days',
      groupSize: '2-12',
      availableDates: 'Flexible',
      price: 1299
    },
    {
      id: 2,
      title: 'Mountain Adventure Trek',
      category: 'Adventure',
      image: 'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.8,
      reviews: 189,
      duration: '10 Days',
      groupSize: '4-15',
      availableDates: 'Jun-Sep',
      price: 1899
    },
    {
      id: 3,
      title: 'Cultural Heritage Tour',
      category: 'Culture',
      image: 'https://images.pexels.com/photos/2084858/pexels-photo-2084858.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.7,
      reviews: 156,
      duration: '8 Days',
      groupSize: '6-20',
      availableDates: 'Year-round',
      price: 1599
    },
    {
      id: 4,
      title: 'Safari Wildlife Expedition',
      category: 'Wildlife',
      image: 'https://images.pexels.com/photos/2290086/pexels-photo-2290086.jpeg?auto=compress&cs=tinysrgb&w=800',
      rating: 4.9,
      reviews: 298,
      duration: '12 Days',
      groupSize: '4-10',
      availableDates: 'Jul-Oct',
      price: 3499
    }
  ];

  const services = [
    { icon: FaPlane, title: 'Flight Booking', description: 'Best deals on domestic and international flights' },
    { icon: FaHotel, title: 'Hotel Reservations', description: 'Handpicked hotels for every budget' },
    { icon: FaCar, title: 'Car Rentals', description: 'Explore destinations at your own pace' },
    { icon: FaUmbrellaBeach, title: 'Beach Resorts', description: 'Luxury beachfront accommodations' },
    { icon: FaMountain, title: 'Adventure Tours', description: 'Thrilling experiences for adrenaline seekers' },
    { icon: FaCamera, title: 'Photography Tours', description: 'Capture stunning moments with expert guides' }
  ];

  const galleryImages = [
    'https://images.pexels.com/photos/2113554/pexels-photo-2113554.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/210452/pexels-photo-210452.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2084858/pexels-photo-2084858.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2290086/pexels-photo-2290086.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1591376/pexels-photo-1591376.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=600'
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      text: 'An incredible experience! The team at Travel & Tour made our honeymoon absolutely perfect. Every detail was taken care of.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      location: 'Toronto, Canada',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      text: 'Best travel agency I have ever used. Professional, responsive, and they truly care about creating memorable experiences.',
      rating: 5
    },
    {
      name: 'Emma Williams',
      location: 'London, UK',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      text: 'From booking to the actual trip, everything was seamless. Highly recommend for anyone looking for stress-free travel planning.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'How do I book a tour package?',
      answer: 'You can book a tour package by selecting your desired package, filling out the booking form with your details, and completing the payment. You will receive a confirmation email with all the necessary information.'
    },
    {
      question: 'What is included in the tour packages?',
      answer: 'Our tour packages typically include accommodation, transportation, guided tours, and some meals. Specific inclusions vary by package, so please check the detailed itinerary for each package.'
    },
    {
      question: 'Can I customize my travel itinerary?',
      answer: 'Yes! We offer customizable itineraries to suit your preferences. Contact our travel experts to discuss your requirements and we will create a personalized travel plan for you.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'Our cancellation policy varies depending on the package and timing. Generally, cancellations made 30+ days before departure receive a full refund, while those made closer to the travel date may incur fees.'
    },
    {
      question: 'Do you offer travel insurance?',
      answer: 'Yes, we strongly recommend travel insurance and can help you purchase comprehensive coverage that includes medical emergencies, trip cancellations, and lost luggage protection.'
    }
  ];

  const features = [
    { icon: FaHeadset, title: '24/7 Support', description: 'Round-the-clock customer assistance' },
    { icon: FaShieldAlt, title: 'Secure Booking', description: 'Safe and encrypted transactions' },
    { icon: FaPlane, title: 'Best Prices', description: 'Competitive rates guaranteed' }
  ];

  useEffect(() => {
    // GSAP animations for counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      gsap.to(counter, {
        innerHTML: target,
        duration: 2,
        scrollTrigger: {
          trigger: counter,
          start: 'top 80%',
        },
        snap: { innerHTML: 1 },
        ease: 'power1.out'
      });
    });
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen">
      <Hero />

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                About <span className="text-primary-600">Travel & Tour</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                With over 15 years of experience in the travel industry, Travel & Tour has been creating unforgettable journeys for travelers worldwide. Our passion for exploration and commitment to excellence has made us a trusted name in the tourism sector.
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                We believe that travel is not just about visiting new places, but about creating memories that last a lifetime. Our team of expert travel consultants works tirelessly to craft personalized experiences that exceed expectations.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 counter" data-target="500">0</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 counter" data-target="10000">0</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Happy Travelers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary-600 counter" data-target="15">0</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Years Experience</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800"
                alt="About Us"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="destinations" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Popular <span className="text-primary-600">Destinations</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Explore our handpicked destinations that offer unforgettable experiences and breathtaking views.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </section>

      {/* Tour Packages */}
      <section id="packages" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tour <span className="text-primary-600">Packages</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Choose from our carefully curated tour packages designed to give you the best travel experience.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} package={pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our <span className="text-primary-600">Services</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We offer comprehensive travel services to make your journey seamless and memorable.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="text-3xl text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Travel <span className="text-primary-600">Gallery</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Browse through our collection of stunning travel photographs from around the world.
            </p>
          </motion.div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 }
            }}
            className="pb-12"
          >
            {galleryImages.map((image, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative h-64 rounded-2xl overflow-hidden shadow-lg"
                >
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              What Our <span className="text-yellow-300">Travelers Say</span>
            </h2>
            <p className="text-gray-100 max-w-2xl mx-auto">
              Read testimonials from our satisfied customers who have experienced our exceptional service.
            </p>
          </motion.div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            className="pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked <span className="text-primary-600">Questions</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Find answers to common questions about our services and bookings.
            </p>
          </motion.div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </span>
                  {activeFaq === index ? (
                    <FaChevronUp className="text-primary-600" />
                  ) : (
                    <FaChevronDown className="text-primary-600" />
                  )}
                </button>
                {activeFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600 dark:text-gray-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Booking Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Book Your <span className="text-primary-600">Dream Trip</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Fill out the form below and our travel experts will get back to you with a personalized itinerary.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Booking Form
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="03705140238"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Destination
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white">
                      <option>Select Destination</option>
                      <option>Bali, Indonesia</option>
                      <option>Santorini, Greece</option>
                      <option>Kyoto, Japan</option>
                      <option>Machu Picchu, Peru</option>
                      <option>Maldives</option>
                      <option>Swiss Alps</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Number of Travelers
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="2"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Special Requests
                  </label>
                  <textarea
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Any special requirements or preferences..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all font-semibold"
                >
                  Submit Booking Request
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Us?
              </h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="text-2xl text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl text-white">
                <h4 className="text-xl font-bold mb-2">Need Help?</h4>
                <p className="mb-4">Our travel experts are available 24/7 to assist you.</p>
                <a
                  href="tel:03705140238"
                  className="inline-flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors"
                >
                  <span className="text-2xl font-bold">03705140238</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
