const {
  
  addFilm,
  addRatingAndReview,
  getMovieReviewsWithUserDetails,
  getTop5RatingsAndReviews,
  getBottom5RatingsAndReviews,
} = require("../controller/film.controller.js");
const filmRouter = require("express").Router();

filmRouter.post("/addFilm", addFilm);
filmRouter.post("/:movieId/rating", addRatingAndReview);
filmRouter.get("/:movieId/reviews", getMovieReviewsWithUserDetails);

filmRouter.get("/:movieId/top5",getTop5RatingsAndReviews);
filmRouter.get("/:movieId/bottom5",getBottom5RatingsAndReviews);
module.exports = { filmRouter };
