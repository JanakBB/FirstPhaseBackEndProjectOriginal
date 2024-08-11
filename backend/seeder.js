import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import connectDB from "./config/db.js";
import colors from "colors";

process.loadEnvFile();

connectDB();

const loadData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();

    let newUsers = await User.insertMany(users);
    await Product.insertMany(
      products.map((product) => {
        return {
          ...product,
          user: newUsers[0]._id,
        };
      })
    );
    console.log("Data Loaded!".yellow.inverse);
    process.exit();
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    console.log("Data Cleared!".red.inverse);
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

// console.log(process.argv);

if (process.argv[2] === "-d") {
  destroyData();
} else {
  loadData();
}
