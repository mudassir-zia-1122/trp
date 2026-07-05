# Travel & Tour Website

A modern, premium, fully responsive Travel & Tour Single Page Application built with React.js, Vite, Tailwind CSS, Firebase, Firestore, EmailJS, Framer Motion, and GSAP.

## 🚀 Features

- **Modern UI/UX**: Beautiful, clean design inspired by Booking.com and Airbnb
- **Fully Responsive**: Works seamlessly on all devices
- **Dark/Light Mode**: Toggle between themes
- **Authentication**: User registration, login, logout, and Google Sign-In
- **Booking System**: Complete booking workflow with Firestore integration
- **Email Notifications**: EmailJS integration for booking confirmations
- **User Dashboard**: View profile, booking history, and manage bookings
- **Admin Dashboard**: Manage users, bookings, and view statistics
- **Smooth Animations**: Framer Motion and GSAP animations
- **Loading Screen**: Professional loading animation
- **Scroll Progress Bar**: Visual scroll indicator
- **Back-to-Top Button**: Quick navigation
- **SEO Optimized**: Proper meta tags and structure

## 🛠️ Tech Stack

- **Frontend**: React.js 18, Vite
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM 6
- **Authentication**: Firebase Authentication
- **Database**: Cloud Firestore
- **Email Service**: EmailJS
- **Animations**: Framer Motion, GSAP
- **Icons**: React Icons
- **Sliders**: Swiper.js
- **Notifications**: React Toastify

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account
- EmailJS account

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Travel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**

   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication:
     - Email/Password
     - Google Sign-In
   - Create Firestore Database
   - Get your Firebase config from Project Settings

4. **Configure Firebase**

   Update `src/firebase/firebaseConfig.js` with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

5. **Set up EmailJS**

   - Go to [EmailJS](https://www.emailjs.com/)
   - Create an account
   - Create an email service
   - Create email templates:
     - Booking confirmation template
     - Admin notification template
     - Contact form template
   - Get your Service ID, Template IDs, and Public Key

6. **Configure EmailJS**

   Update `src/services/emailService.js` with your EmailJS credentials:
   ```javascript
   const SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
   const TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
   const PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
   const ADMIN_TEMPLATE_ID = 'YOUR_ADMIN_EMAILJS_TEMPLATE_ID';
   ```

7. **Set up Admin User**

   - Register a user through the app
   - In Firebase Console, go to Firestore Database
   - Navigate to the `users` collection
   - Find your user document and update the `role` field to `admin`

## 🏃 Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
src/
├── assets/                 # Static assets
├── components/             # Reusable components
│   ├── Navbar.jsx          # Navigation bar
│   ├── Footer.jsx          # Footer component
│   ├── Hero.jsx            # Hero section
│   ├── DestinationCard.jsx # Destination card component
│   ├── PackageCard.jsx     # Package card component
│   ├── ProtectedRoute.jsx  # Route protection wrapper
│   ├── LoadingScreen.jsx   # Loading animation
│   ├── ScrollProgressBar.jsx # Scroll progress indicator
│   └── BackToTop.jsx       # Back to top button
├── pages/                  # Page components
│   ├── Home.jsx            # Home page with all sections
│   ├── Login.jsx           # Login page
│   ├── Register.jsx        # Registration page
│   ├── ForgotPassword.jsx  # Password reset page
│   ├── Dashboard.jsx       # User dashboard
│   ├── Admin.jsx           # Admin dashboard
│   └── NotFound.jsx        # 404 page
├── context/                # React contexts
│   └── AuthContext.jsx     # Authentication context
├── firebase/               # Firebase configuration
│   └── firebaseConfig.js   # Firebase initialization
├── services/               # API services
│   ├── bookingService.js   # Booking operations
│   └── emailService.js     # Email operations
├── hooks/                  # Custom hooks (if needed)
├── App.jsx                 # Main app component
├── main.jsx                # Entry point
└── index.css               # Global styles
```

## 🔥 Firestore Collections

### users
```javascript
{
  uid: string,
  name: string,
  email: string,
  phone: string,
  role: 'user' | 'admin',
  createdAt: timestamp
}
```

### bookings
```javascript
{
  userId: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  destination: string,
  travelDate: string,
  travelers: number,
  specialRequests: string,
  status: 'pending' | 'confirmed' | 'cancelled',
  createdAt: timestamp
}
```

### contacts
```javascript
{
  name: string,
  email: string,
  subject: string,
  message: string,
  createdAt: timestamp
}
```

### testimonials
```javascript
{
  name: string,
  location: string,
  image: string,
  text: string,
  rating: number,
  createdAt: timestamp
}
```

## 🎨 Features Overview

### Home Page Sections
1. **Hero Section**: Video background with search form
2. **About Us**: Company information with animated counters
3. **Popular Destinations**: Grid of destination cards
4. **Tour Packages**: Package listings with details
5. **Services**: Service offerings with icons
6. **Gallery**: Image slider using Swiper.js
7. **Testimonials**: Customer reviews carousel
8. **FAQ**: Accordion-style questions
9. **Contact & Booking**: Booking form and contact info

### Authentication Features
- Email/Password registration
- Email/Password login
- Google Sign-In
- Password reset via email
- Protected routes
- Role-based access (user/admin)

### User Dashboard
- View and edit profile
- View booking history
- Cancel bookings
- Booking status tracking

### Admin Dashboard
- View all users
- View all bookings
- Manage booking status
- Delete bookings/users
- Dashboard statistics

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_ADMIN_TEMPLATE_ID=your_admin_template_id
```

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎯 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ },
      secondary: { /* your colors */ }
    }
  }
}
```

### Animations
Modify animation settings in component files using Framer Motion and GSAP.

## 🐛 Troubleshooting

### Tailwind CSS not working
- Ensure PostCSS and Autoprefixer are installed
- Check that `tailwind.config.js` is properly configured
- Restart the development server

### Firebase authentication errors
- Verify Firebase configuration in `firebaseConfig.js`
- Ensure Authentication is enabled in Firebase Console
- Check that the correct sign-in methods are enabled

### EmailJS not sending emails
- Verify EmailJS credentials in `emailService.js`
- Check that email templates are properly configured
- Ensure your EmailJS account has available credits

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email info@traveltour.com or open an issue in the repository.

---

Built with ❤️ using React.js and modern web technologies.
