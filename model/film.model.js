const mongoose = require("mongoose");
const { Schema } = mongoose;

const filmSchema = new Schema({
  title: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  genre: { type: String, required: true },
  reviews: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "PersonModel", required: true },
      rating: { type: Number, required: true },
      review: { type: String, required: true },
    },
  ],
});

const FilmModel = mongoose.model("MovieModel", filmSchema);

module.exports = FilmModel;
