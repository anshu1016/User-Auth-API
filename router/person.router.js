const {signup,login,changePassword,changeProfilePicture,updateContactDetails,findUserByPhoneNumber} = require("../controller/person.controller.js");
const personRouter = require("express").Router();  

personRouter.post("/signup",signup);
personRouter.post("/login",login)
personRouter.post("/changePassword/:personID/password",changePassword)
personRouter.post("/:personID/profile",changeProfilePicture)
personRouter.post("/update-contact/:email",updateContactDetails);
personRouter.get("/phone/:phoneNUMBER",findUserByPhoneNumber);
module.exports = {personRouter};