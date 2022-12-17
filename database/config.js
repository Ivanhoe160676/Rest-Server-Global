const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Online");
  } catch (error) {
    console.log(error);
    throw new Error("Database connection error");
  }
};

module.exports = {
  dbConnection,
};
