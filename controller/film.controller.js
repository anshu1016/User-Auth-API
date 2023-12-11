const FilmModel = require("../model/film.model.js");
const PersonModel = require("../model/person.model.js");

// Controller function to push film data
const addFilm = async (req, res) => {
  try {
    const { title, releaseDate, genre, reviews } = req.body;

    // Create a new film instance using the FilmModel
    const newFilm = new FilmModel({
      title,
      releaseDate,
      genre,
      reviews,
    });

    // Save the new film to the database
    const savedFilm = await newFilm.save();

    res.status(201).json(savedFilm);
  } catch (error) {
    console.error("Error adding film:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//add rating and review

const addRatingAndReview = async (req, res) => {
  const { movieId } = req.params;
  const { userId, rating, review } = req.body;

  try {
    // Check if the movie exists
    const movie = await FilmModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Check if the user exists
    const user = await PersonModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add the rating and review to the movie
    movie.reviews.push({
      userId: userId,
      rating: rating,
      review: review,
    });

    // Save the changes
    await movie.save();

    // Respond with the updated movie details
    res.status(201).json({
      message: "Rating and review added successfully",
      movie: {
        id: movie._id,
        title: movie.title,
        releaseDate: movie.releaseDate,
        genre: movie.genre,
        reviews: movie.reviews,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// top 3 movie

const getMovieReviewsWithUserDetails = async (req, res) => {
  const { movieId } = req.params;

  try {
    // Check if the movie exists
    const movie = await FilmModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Get the top 3 reviews with user details
    const top3Reviews = movie.reviews.slice(0, 3).map(async (review) => {
      const user = await PersonModel.findById(review.userId);
      return {
        rating: review.rating,
        reviewText: review.review,
        user: {
          id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
      };
    });

    // Wait for all promises to resolve
    const resolvedReviews = await Promise.all(top3Reviews);

    // Respond with the top 3 reviews and user details
    res.status(200).json({
      message: "Top 3 reviews with user details fetched successfully",
      reviews: resolvedReviews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to retrieve top 5 ratings and reviews of a movie
const getTop5RatingsAndReviews = async (req, res) => {
  const { movieId } = req.params;

  try {
    // Check if the movie exists
    const movie = await FilmModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Sort reviews by rating in descending order
    const sortedReviews = movie.reviews.sort((a, b) => b.rating - a.rating);

    // Get the top 5 reviews with user details
    const top5Reviews = sortedReviews.slice(0, 5).map(async (review) => {
      const user = await PersonModel.findById(review.userId);
      return {
        rating: review.rating,
        reviewText: review.review,
        user: {
          id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
      };
    });

    // Wait for all promises to resolve
    const resolvedReviews = await Promise.all(top5Reviews);

    // Respond with the top 5 reviews and user details
    res.status(200).json({
      message: "Top 5 ratings and reviews fetched successfully",
      reviews: resolvedReviews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to retrieve bottom 5 ratings and reviews of a movie
const getBottom5RatingsAndReviews = async (req, res) => {
  const { movieId } = req.params;

  try {
    // Check if the movie exists
    const movie = await FilmModel.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    // Sort reviews by rating in ascending order
    const sortedReviews = movie.reviews.sort((a, b) => a.rating - b.rating);

    // Get the bottom 5 reviews with user details
    const bottom5Reviews = sortedReviews.slice(0, 5).map(async (review) => {
      const user = await PersonModel.findById(review.userId);
      return {
        rating: review.rating,
        reviewText: review.review,
        user: {
          id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
      };
    });

    // Wait for all promises to resolve
    const resolvedReviews = await Promise.all(bottom5Reviews);

    // Respond with the bottom 5 reviews and user details
    res.status(200).json({
      message: "Bottom 5 ratings and reviews fetched successfully",
      reviews: resolvedReviews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};



module.exports = {
  addFilm,
  addRatingAndReview,
  getMovieReviewsWithUserDetails,
  getTop5RatingsAndReviews,
  getBottom5RatingsAndReviews,
};
