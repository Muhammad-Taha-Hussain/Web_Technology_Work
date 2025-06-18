import mongoose from 'mongoose';

// const { Schema, model, Types } = mongoose;

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String, // Hashed
    phone: String,
    address: {
      street: String,
      city: String,
      postalCode: String,
      country: String
    },
    createdAt: Date,
    updatedAt: Date
});
const Jw_Users = mongoose.model("Jw_Users", userSchema);
export default Jw_Users;
