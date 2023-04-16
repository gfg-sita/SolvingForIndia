const express = require('express');
const { sendCode, verifyCode } = require('../controllers/authController');
const rateLimit = require('express-rate-limit');

const otpRateLimiter = rateLimit({
  windowMs: 5* 60 * 1000, //5 minutes
  max: 3, //max 3 otp requests per IP
  message: { message: 'Too many OTP requests from this IP address' },
});

const router = express.Router();

router.post("/send-code", otpRateLimiter, (req, res, next) => {
  const { user_id } = req.body;
  res.locals.user = { user_id };
  next();
}, sendCode);
router.post('/verify-code', verifyCode);

module.exports = router;