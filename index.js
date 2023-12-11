 require('./db/db.js');
const express = require('express');
const app = express();
const cors = require('cors');
const {personRouter} = require("./router/person.router.js")
const {filmRouter} = require("./router/film.router.js");

const PORT = 3000;
const filmController = require('./controller/film.controller');
const personController = require('./controller/person.controller');

//MIDDLEWARES
app.use(cors());
app.use(express.json());


//Routers
app.get("/", (req, res) => {
  res.send("Hello Express App!");
})
app.use("/person",personRouter)
app.use("/film",filmRouter)
//PORT LLISTEN
app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});


//token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwiaWQiOiI2NTc2ZDUzMzdmZGVmOWI1OWNkNjNjMTciLCJpYXQiOjE3MDIyODY2NDMsImV4cCI6MTcwMjM3MzA0M30.Q2AoxjTI-oM03reSjaJV7H3kiIRmc7i5WjGAGNeLfAA