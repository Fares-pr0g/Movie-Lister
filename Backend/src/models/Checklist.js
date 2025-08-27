import mongoose from "mongoose";

// create a schema (blue print)
// create a model (using a name and a schema

const movieSchema = new mongoose.Schema({
    _id: { type: Number, required: true }, // Use movie ID from external API as _id
    title: { type: String, required: true },
    release_date: { type: String, required: true },
    poster_path: { type: String, required: true },
    overview: { type: String, required: true }
},
{timestamps: true}// createdAt, updatedAt
);

const Checklist = mongoose.model("Checklist", movieSchema);

export default Checklist;