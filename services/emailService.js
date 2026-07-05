import emailjs from 'emailjs-com';

const SERVICE_ID = 'YOUR_EMAILJS_SERVICE_ID';
const TEMPLATE_ID = 'YOUR_EMAILJS_TEMPLATE_ID';
const PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY';
const ADMIN_TEMPLATE_ID = 'YOUR_ADMIN_EMAILJS_TEMPLATE_ID';

emailjs.init(PUBLIC_KEY);

export const sendBookingConfirmation = async (bookingData) => {
  try {
    const templateParams = {
      to_name: bookingData.fullName,
      to_email: bookingData.email,
      destination: bookingData.destination,
      travel_date: bookingData.travelDate,
      travelers: bookingData.travelers,
      special_requests: bookingData.specialRequests || 'None',
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    return true;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

export const sendBookingToAdmin = async (bookingData) => {
  try {
    const templateParams = {
      customer_name: bookingData.fullName,
      customer_email: bookingData.email,
      customer_phone: bookingData.phoneNumber,
      destination: bookingData.destination,
      travel_date: bookingData.travelDate,
      travelers: bookingData.travelers,
      special_requests: bookingData.specialRequests || 'None',
    };

    await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams);
    return true;
  } catch (error) {
    console.error('Admin email error:', error);
    throw error;
  }
};

export const sendContactMessage = async (contactData) => {
  try {
    const templateParams = {
      from_name: contactData.name,
      from_email: contactData.email,
      message: contactData.message,
      subject: contactData.subject,
    };

    await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
    return true;
  } catch (error) {
    console.error('Contact email error:', error);
    throw error;
  }
};
