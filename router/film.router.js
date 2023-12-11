const {addFilm,addRatingAndReview,getMovieReviewsWithUserDetails} = require("../controller/film.controller.js");
const filmRouter = require("express").Router();  


filmRouter.post("/addFilm", addFilm);
filmRouter.post("/:movieId/rating",addRatingAndReview)
filmRouter.get("/:movieId/reviews",getMovieReviewsWithUserDetails)
module.exports = {filmRouter};