const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv'); // For environment variables

dotenv.config(); // Load environment variables

// Connect to MongoDB using a secure connection string stored in an environment variable
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


// User Schema with separate first and last name fields
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: {
    line1: { type: String, required: true },
    line2: { type: String }, // Optional for apartment number
    city: { type: String, required: true },
    state: { type: String, required: true }, // US state abbreviation or Canadian province code
    postal_code: { type: String, required: true }, // US zip code or Canadian postal code format
    country: { type: String, required: true, default: "Canada" }, // Optional or allow user to specify
  },
  // ... other user fields
});

// Hash password before saving (same as previous example)
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Generate JWT token (same as previous example)

// Order Schema with separate pickup and delivery dates (including time as part of the date)
const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  order_date: { type: Date, default: Date.now },
  pickup_date: { type: Date, required: true }, // Date and time
  delivery_date: { type: Date, required: true }, // Date and time
  pickup_address: {
    line1: { type: String, required: true },
    line2: { type: String }, // Optional for apartment number
    city: { type: String, required: true },
    state: { type: String, required: true }, // US state abbreviation or Canadian province code
    postal_code: { type: String, required: true }, // US zip code or Canadian postal code format
    country: { type: String, required: true, default: "Canada" }, // Optional or allow user to specify
  },
  delivery_address: {
    line1: { type: String, required: true },
    line2: { type: String }, // Optional for apartment number
    city: { type: String, required: true },
    state: { type: String, required: true }, // US state abbreviation or Canadian province code
    postal_code: { type: String, required: true }, // US zip code or Canadian postal code format
    country: { type: String, required: true, default: "Canada" }, // Optional or allow user to specify
  },
  items: [{ description: String, quantity: Number, price: Number }],
});

const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { User, Order };
