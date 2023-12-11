const { connect } = require("mongoose");
const mongoURI = process.env.MONGO_DB;

const connectDB = async () => {
  try {
    await connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
};
connectDB();

