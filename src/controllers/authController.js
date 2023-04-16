const { sendCode, verifyCode } = require("../utils/otpHelper");
const { pushOTP } = require("../utils/otpManager");
const jwt = require("jsonwebtoken");
const { getUserByEmail } = require("../utils/getUserByEmail");
const { Users } = require('../models/users');

exports.sendCode = async (req, res) => {
  const { user } = res.locals; // Get the user object from the previous middleware
  const {
    mobile_number,
    email,
    ip_address,
    browser,
    device_type,
  } = req.body;
  const otpData = await sendCode(mobile_number, email);
  await pushOTP(
    user.user_id,
    otpData.code,
    ip_address,
    browser,
    device_type
  );

  console.log(`Sending OTP: ${otpData.code} to email: ${email}`);
  const tempToken = jwt.sign(
    {
      email,
      secret: otpData.secret,
      exp: Math.floor(otpData.expiresAt / 1000),
    },
    process.env.JWT_TEMP
  );
  res.json({
    tempToken,
    });
  }

exports.verifyCode = async (req, res) => {
  const { code, tempToken } = req.body;
  try {
    const decoded = jwt.verify(tempToken, process.env.JWT_TEMP);
    const { email, secret } = decoded;
    const isCodeValid = await verifyCode(code, secret);
    console.log("Email in authController:", email);
    const user = await getUserByEmail(email);
    if (isCodeValid ) { 
      const payload = {
        iss: "SITA",
        sub: user.user_id,
        email: email,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
      };
      const newToken = jwt.sign(payload, process.env.JWT_SECRET);
      res.status(200).json({
        message: "Code verified successfully",
        token: newToken,
      });
    } else if (!isCodeValid) {
      res.status(400).json({
        message: "Invalid code",
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(401).json({
      message: "Invalid token",
      error: error.message,
    });
  }
};
