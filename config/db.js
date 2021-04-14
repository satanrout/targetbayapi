const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log(`Mongodb Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectDB;
