const router = require("express").Router(); //express router
const bcrypt = require("bcryptjs"); // Don't forget to import bcrypt
let AppUserData = require("../models/Appuser.js"); // Make sure the path is correct

// Get all users
router.route("/").get((req, res) => {
  AppUserData.find() // List all users from MongoDB
    .then(users => res.json(users)) // Return users in JSON format
    .catch(err => res.status(400).json("Error: " + err));
});

// User Signup
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user with the same email exists
    const existingUser = await AppUserData.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user instance
    const newUser = new AppUserData({ name, email, password: hashedPassword, role });

    // Save the new user to the database
    await newUser.save();  // Corrected here: `await newUser.save()` instead of `AppUserData.save()`
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Get a single user by ID
router.route("/:id").get((req, res) => {
  AppUserData.findById(req.params.id)
    .then(AppUserData => res.json(AppUserData))
    .catch(err => res.status(400).json("Error: " + err));
});

// Delete a user by ID
router.route("/:id").delete((req, res) => {
  AppUserData.findByIdAndDelete(req.params.id)
    .then(() => res.json("Data deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
