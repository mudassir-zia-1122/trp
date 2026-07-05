import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaCalendarCheck, FaTrash, FaChartBar, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { getAllBookings, deleteBooking, updateBookingStatus } from '../services/bookingService';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const Admin = () => {
  const { logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [bookingsData, usersData] = await Promise.all([
        getAllBookings(),
        fetchUsers_()
      ]);
      setBookings(bookingsData);
      setUsers(usersData);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers_ = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersData = [];
    querySnapshot.forEach((doc) => {
      usersData.push({ id: doc.id, ...doc.data() });
    });
    return usersData;
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking(bookingId);
        setBookings(bookings.filter(b => b.id !== bookingId));
        toast.success('Booking deleted successfully');
      } catch (error) {
        toast.error('Failed to delete booking');
      }
    }
  };

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await updateBookingStatus(bookingId, status);
      setBookings(
        bookings.map(b => (b.id === bookingId ? { ...b, status } : b))
      );
      toast.success('Booking status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteDoc(doc(db, 'users', userId));
        setUsers(users.filter(u => u.id !== userId));
        toast.success('User deleted successfully');
      } catch (error) {
        toast.error('Failed to delete user');
      }
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

  const stats = {
    totalUsers: users.length,
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Users', value: stats.totalUsers, icon: FaUsers, color: 'from-blue-500 to-blue-600' },
              { label: 'Total Bookings', value: stats.totalBookings, icon: FaCalendarCheck, color: 'from-green-500 to-green-600' },
              { label: 'Confirmed', value: stats.confirmedBookings, icon: FaChartBar, color: 'from-purple-500 to-purple-600' },
              { label: 'Pending', value: stats.pendingBookings, icon: FaChartBar, color: 'from-yellow-500 to-yellow-600' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`bg-gradient-to-r ${stat.color} rounded-2xl p-6 text-white`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="text-4xl opacity-50" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'bookings'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Bookings
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                  activeTab === 'users'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                Users
              </button>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
              ) : activeTab === 'bookings' ? (
                <div className="space-y-4">
                  {bookings.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                      No bookings found
                    </p>
                  ) : (
                    bookings.map((booking) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {booking.destination}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div>
                                <span className="font-medium">Name:</span>
                                <span className="ml-2">{booking.fullName}</span>
                              </div>
                              <div>
                                <span className="font-medium">Email:</span>
                                <span className="ml-2">{booking.email}</span>
                              </div>
                              <div>
                                <span className="font-medium">Date:</span>
                                <span className="ml-2">{booking.travelDate}</span>
                              </div>
                              <div>
                                <span className="font-medium">Travelers:</span>
                                <span className="ml-2">{booking.travelers}</span>
                              </div>
                            </div>
                            <div className="mt-3 flex items-center space-x-4">
                              <select
                                value={booking.status}
                                onChange={(e) => handleUpdateStatus(booking.id, e.target.value)}
                                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-primary-500 dark:bg-gray-700 dark:text-white text-sm"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteBooking(booking.id)}
                            className="ml-4 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Booking"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {users.length === 0 ? (
                    <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                      No users found
                    </p>
                  ) : (
                    users.map((user) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                              {user.name}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div>
                                <span className="font-medium">Email:</span>
                                <span className="ml-2">{user.email}</span>
                              </div>
                              <div>
                                <span className="font-medium">Role:</span>
                                <span className="ml-2 capitalize">{user.role}</span>
                              </div>
                              <div>
                                <span className="font-medium">Joined:</span>
                                <span className="ml-2">
                                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="ml-4 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete User"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;
