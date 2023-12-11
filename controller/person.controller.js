const PersonModel = require("../model/person.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "PERSONAUTH";

const signup = async (req, res) => {
  const { username, email, password, profilePicture, contactDetails } = req.body;

  try {
    const existingUser = await PersonModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const result = await PersonModel.create({
      username: username,
      email: email,
      password: hashedPassword,
      profilePicture: profilePicture,
      contactDetails: contactDetails, 
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY, {
      expiresIn: "24h",
    });

    res.status(201).json({ message: "User created successfully", token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await PersonModel.findOne({ email: email });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the provided password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email, id: user._id }, SECRET_KEY, {
      expiresIn: "24h",
    });

    // Respond with user details and token
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        contactDetails: user.contactDetails,
      },
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//CHange Password

const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await PersonModel.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the current password is correct
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedNewPassword;
    await user.save();

    // Respond with the updated user details
    res.status(200).json({
      message: "Password updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        contactDetails: user.contactDetails,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};




//Change Profile Picture


const changeProfilePicture = async (req, res) => {
  const { email, newProfilePictureUrl } = req.body;

  try {
    // Find the user by email
    const user = await PersonModel.findOne({ email: email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's profile picture
    user.profilePicture = newProfilePictureUrl;
    await user.save();

    // Respond with the updated user details
    res.status(200).json({
      message: "Profile picture updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        contactDetails: user.contactDetails,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//change address

const updateContactDetails = async (req, res) => {
  const { email } = req.params;
  const { phoneNumber, street,city,state,country } = req.body;

  try {
    // Find the user by email
    const user = await PersonModel.findOne({ email: email });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's contact details
    user.contactDetails.phoneNumber = phoneNumber;
    user.contactDetails.street = street;
    user.contactDetails.city = city;
    user.contactDetails.state = state;
    user.contactDetails.country = country;
    // Save the changes
    await user.save();

    // Respond with the updated user details
    res.status(200).json({
      message: "Contact details updated successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        contactDetails: user.contactDetails,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

//find by phone number

const findUserByPhoneNumber = async (req, res) => {
  const { phoneNUMBER } = req.params;

  try {
    const user = await PersonModel.findOne({ 'contactDetails.phoneNumber': phoneNUMBER });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User found successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        contactDetails: user.contactDetails,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};





module.exports = {signup,login,changePassword,changeProfilePicture,updateContactDetails,findUserByPhoneNumber};
