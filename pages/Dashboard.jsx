import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaCalendar, FaMapMarkerAlt, FaUsers, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { getUserBookings, deleteBooking } from '../services/bookingService';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    fetchBookings();
    if (currentUser) {
      setProfileData({
        name: currentUser.displayName || '',
        email: currentUser.email || '',
        phone: ''
      });
    }
  }, [currentUser]);

  const fetchBookings = async () => {
    try {
      if (currentUser) {
        const data = await getUserBookings(currentUser.uid);
        setBookings(data);
      }
    } catch (error) {
      toast.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await deleteBooking(bookingId);
        setBookings(bookings.filter(b => b.id !== bookingId));
        toast.success('Booking cancelled successfully');
      } catch (error) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        name: profileData.name,
        phone: profileData.phone
      });
      setEditingProfile(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            User Dashboard
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Section */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-white">
                      {profileData.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {profileData.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {profileData.email}
                    </p>
                  </div>
                </div>

                {!editingProfile ? (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                      <FaUser />
                      <span>{profileData.name}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                      <span className="text-sm">Email:</span>
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                      <span className="text-sm">Phone:</span>
                      <span>{profileData.phone || 'Not provided'}</span>
                    </div>
                    <button
                      onClick={() => setEditingProfile(true)}
                      className="w-full mt-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <FaEdit />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleUpdateProfile}
                        className="flex-1 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingProfile(false)}
                        className="flex-1 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full mt-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl shadow-lg p-6 mt-6 text-white"
              >
                <h3 className="text-lg font-semibold mb-4">Your Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{bookings.length}</div>
                    <div className="text-sm opacity-80">Total Bookings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">
                      {bookings.filter(b => b.status === 'confirmed').length}
                    </div>
                    <div className="text-sm opacity-80">Confirmed</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bookings Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Booking History
                </h2>

                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                  </div>
                ) : bookings.length === 0 ? (
                  <div className="text-center py-12">
                    <FaCalendar className="text-6xl text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">
                      No bookings yet. Start exploring and book your first trip!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <FaMapMarkerAlt className="text-primary-600" />
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {booking.destination}
                              </h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div className="flex items-center space-x-2">
                                <FaCalendar />
                                <span>{booking.travelDate}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <FaUsers />
                                <span>{booking.travelers} travelers</span>
                              </div>
                              <div>
                                <span className="font-medium">Status:</span>
                                <span
                                  className={`ml-2 px-2 py-1 rounded-full text-xs ${
                                    booking.status === 'confirmed'
                                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                      : booking.status === 'pending'
                                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                  }`}
                                >
                                  {booking.status}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium">Booked:</span>
                                <span className="ml-2">
                                  {new Date(booking.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="ml-4 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Cancel Booking"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
