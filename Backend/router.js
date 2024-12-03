// router.js
import express from 'express';
import Razorpay from 'razorpay';
// RAZORPAYX_API_KEY="rzp_test_iDWZYaECE3rES2"
// RAZORPAYX_API_SECRET="5bx32uiT2GpnGJOurYwR2uSk"
const router = express.Router();
const razorpay = new Razorpay({
  key_id: "rzp_test_iDWZYaECE3rES2",
  key_secret: "5bx32uiT2GpnGJOurYwR2uSk",
});

// Define your routes
router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.post('/orders', async (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: 'receipt',
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    res.json({ order_id: response.id, currency: response.currency, amount: response.amount });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

router.get('/payment/:paymentId', async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await razorpay.payments.fetch(paymentId);
    if (!payment) {
      return res.status(404).json("Payment not found");
    }
    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    res.status(500).json("Failed to fetch payment");
  }
});











export default router;
