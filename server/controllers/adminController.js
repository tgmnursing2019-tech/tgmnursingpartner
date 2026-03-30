// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");

// // TEMP admin (later we store in DB)
// const admin = {
//   email: "admin@gmail.com",
//   password: "$2a$10$wH8eQKZ8Q0uYw7zKX6XyUuQm8hH7pZ1l9KJj6ZxZyZyZyZyZyZyZy" // hashed "admin123"
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   if (email !== "admin" || password !== "admin") {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const token = require("jsonwebtoken").sign(
//     { email },
//     "SECRET_KEY",
//     { expiresIn: "1d" }
//   );

//   res.json({ token });
// };