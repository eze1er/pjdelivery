import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose"; // Import mongoose for MongoDB interaction

import connectDB from "./mongodb/connect.js"; // Assuming this connects to MongoDB

import postRoutes from './routes/postRoutes.js';

import { User } from "./mongodb/models/post.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use('/api/v1/post', postRoutes);

// // User schema (model) for MongoDB (replace with your schema definition)
// const UserSchema = new mongoose.Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true }, // Ensure unique email
//   password: { type: String, required: true }, // Replace with secure password hashing
// });

// const User = mongoose.model"User", UserSchema); // Create the User model

// API endpoint for user registration (replace placeholder logic)
app.post("/api/users/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Basic data validation (replace with more thorough validation)
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check for existing user with the same email (replace with actual check)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Replace with your actual user creation logic (secure password hashing, database interaction)
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save(); // Save the user to the database

    res.status(201).json({ message: "Registration successful!" });
  } catch (error) {
    console.error("Error registering user:", error);
    // Handle potential errors like database connection issues or validation errors
    res.status(500).json({ message: "Registration failed" }); // Generic error for client
  }
});

app.get("/", async (req, res) => {
  res.send("Hello from P&J Delivery DB" );
});

const startServer = async () => {
  if (!process.env.MONGODB_URL) {
    console.error("MONGODB_URL environment variable is not set.");
    return; // Exit if the variable is missing
  }
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(3001, () =>
      console.log("Server has started on port http://localhost:3001")
    );
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();

