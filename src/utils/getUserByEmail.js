const getUserByEmail = async (email) => {
  try {
    const Users = require("../models/users"); 
    const user = await Users.findOne({ where: { email } });
    return user;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

exports.getUserByEmail = getUserByEmail;
