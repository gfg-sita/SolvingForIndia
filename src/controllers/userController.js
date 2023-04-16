const { getUserByEmail } = require("../utils/getUserByEmail");
const Users = require("../models/users");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  const { first_name, last_name, email, mobile_number, password } = req.body;

  try {
    // Check if email exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await Users.create({
    first_name,
    last_name,
    email,
    mobile_number,
    password: hashedPassword,
    registered_on: new Date(),
  });

  res.status(201).json({ success: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.readUsers = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      res.status(404).send({ error: "User not found" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
