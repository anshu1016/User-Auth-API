const mongoose = require("mongoose");
const { Schema } = mongoose;

const personSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, required: true },
  contactDetails: {
    phoneNumber: { type: Number, required: true, unique: true },
    street: { type: String,  },
    city: { type: String,  },
    state: { type: String,  },
    country: { type: String, required: true },
  },
});

const PersonModel = mongoose.model("Person", personSchema);

module.exports = PersonModel;


