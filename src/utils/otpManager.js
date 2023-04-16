const UserAuth = require("../models/user_auth");
const bcrypt = require('bcrypt');

const pushOTP = async (user_id, otp_code, ip_address, browser, device_type) => {    
    try {
        const hashedOtpCode = await bcrypt.hash(otp_code, 10);
        const new_login = await UserAuth.create({
            user_id,
            otp: hashedOtpCode,
            login_time: new Date(),
            ip_address,
            browser,
            device_type,
        });
        console.log("OTP pushed to database");
    } catch( error ) {
        console.log(error);
    }
};

exports.pushOTP = pushOTP;