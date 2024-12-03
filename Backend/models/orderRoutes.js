import express from 'express';
import { acceptBooking, cancelBooking, getBookingsByServiceAndCity } from '../models/orders.js';

const router = express.Router();

// Route to accept a booking
router.post('/accept-booking/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    try {
        const result = await acceptBooking(bookingId);
        res.status(200).json({ message: `Booking ${bookingId} accepted`, result });
    } catch (error) {
        console.error(`Error accepting booking ${bookingId}:`, error);
        res.status(500).json({ message: 'Failed to accept booking', error: error.message });
    }
});

// Route to cancel a booking
router.post('/cancel-booking/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    try {
        const result = await cancelBooking(bookingId);
        res.status(200).json({ message: 'Booking canceled successfully', result });
    } catch (error) {
        console.error(`Error canceling booking ${bookingId}:`, error);
        res.status(500).json({ message: error.message });
    }
});

// Route to get bookings filtered by service and city
router.get('/bookings/:serviceName/:city', (req, res) => {
    const { serviceName, city } = req.params;
    getBookingsByServiceAndCity(serviceName, city, (err, bookings) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching bookings', error: err.message });
            return;
        }
        res.status(200).json({ bookings });
    });
});

export default router;
