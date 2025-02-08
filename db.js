const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name must be at least 2 characters long"],
    maxlength: [50, "First name must be at most 50 characters long"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name must be at least 2 characters long"],
    maxlength: [50, "Last name must be at most 50 characters long"],
    trim: true,
  },
});

const adminSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: [2, "First name must be at least 2 characters long"],
    maxlength: [50, "First name must be at most 50 characters long"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    minlength: [2, "Last name must be at least 2 characters long"],
    maxlength: [50, "Last name must be at most 50 characters long"],
    trim: true,
  },
});

const courseSchema = new Schema({
  title: {
    type: String,
    required: [true, "Course title is required"],
    minlength: [5, "Course title must be at least 5 characters long"],
    maxlength: [100, "Course title must be at most 100 characters long"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Course description is required"],
    minlength: [10, "Description must be at least 10 characters long"],
    maxlength: [1000, "Description must be at most 1000 characters long"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
    match: [/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/, "Please provide a valid image URL (must end with .png, .jpg, .jpeg, .gif, or .webp)"],
  },
  creatorId: ObjectId,
});

const purchaseSchema = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
