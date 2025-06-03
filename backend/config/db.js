const mongoose = require("mongoose");

const connectWithRetry = async (retryCount = 0) => {
  const maxRetries = 5;
  const backoffDelay = Math.min(1000 * Math.pow(2, retryCount), 10000);

  try {
    const options = {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      ssl: true,
      authSource: "admin",
      maxPoolSize: 10,
      family: 4,
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("MongoDB Connected Successfully");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB error:", err);
    });
  } catch (error) {
    console.error("Connection error:", error.message);

    if (retryCount < maxRetries) {
      console.log(
        `Retrying in ${backoffDelay / 1000}s... (${
          retryCount + 1
        }/${maxRetries})`
      );
      await new Promise((resolve) => setTimeout(resolve, backoffDelay));
      return connectWithRetry(retryCount + 1);
    }
    process.exit(1);
  }
};

module.exports = connectWithRetry;
