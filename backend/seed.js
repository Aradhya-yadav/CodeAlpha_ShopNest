const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Product = require("./models/Product");
const connectDB = require("./config/db");

dotenv.config();

const importData = async () => {
try {
await connectDB();
console.log("Clearing old data...");

await User.deleteMany();
await Product.deleteMany();

const hashedPassword =
  await bcrypt.hash(
    "password123",
    10
  );

const adminUser =
  await User.create({
    name: "Admin User",
    email:
      "admin@shopnest.com",
    password:
      hashedPassword,
    role: "admin",
  });

console.log(
  `Admin Created: ${adminUser.email}`
);

const products = [
  {
    name:
      "Wireless Noise-Cancelling Headphones",
    description:
      "Immersive sound experience with advanced active noise cancellation.",
    price: 299.99,
    category:
      "Electronics",
    stock: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    ratings: 4.8,
    numReviews: 24,
  },
  {
    name:
      "Minimalist Modern Chair",
    description:
      "Stylish and comfortable chair for modern homes.",
    price: 150,
    category:
      "Furniture",
    stock: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1",
    ratings: 4.2,
    numReviews: 12,
  },
  {
    name:
      "Professional DSLR Camera",
    description:
      "Capture professional quality photos.",
    price: 1199.99,
    category:
      "Electronics",
    stock: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    ratings: 4.9,
    numReviews: 50,
  },
  {
    name:
      "Classic White Sneakers",
    description:
      "Comfortable sneakers for daily wear.",
    price: 85,
    category:
      "Clothing",
    stock: 50,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    ratings: 4.5,
    numReviews: 89,
  },
  {
  name: "Nike Air Max",
  description: "Premium running shoes",
  price: 4999,
  category: "Footwear",
  stock: 25,
  imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
},

{
  name: "Leather Handbag",
  description: "Luxury handbag for women",
  price: 2999,
  category: "Accessories",
  stock: 20,
  imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3"
},

{
  name: "Men's Casual Shirt",
  description: "Comfortable cotton shirt",
  price: 1299,
  category: "Fashion",
  stock: 40,
  imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
},

{
  name: "Smart Watch",
  description: "Fitness tracking smartwatch",
  price: 3499,
  category: "Accessories",
  stock: 15,
  imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
},

{
  name: "Women's Sneakers",
  description: "Stylish everyday sneakers",
  price: 2499,
  category: "Footwear",
  stock: 30,
  imageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2"
}
];

await Product.insertMany(
  products
);

console.log(
  "✅ Sample Data Imported Successfully"
);

await mongoose.connection.close();

process.exit(0);


} catch (error) {
console.error(
"❌ Seed Error:",
error.message
);

await mongoose.connection.close();

process.exit(1);


}
};

importData();
