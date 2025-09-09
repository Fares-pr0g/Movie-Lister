import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    googleId:{ type: String, unique: true, sparse: true },
    githubId: { type: String, unique: true, sparse: true },
    username: { type: String, required: true },
    displayName: String,
    email: { type: String, unique: true },
    avatar: String,
    profileUrl: String,
    watchlist: [{
        _id: { type: Number, required: true }, // Use movie ID from external API as _id
        title: { type: String, required: true },
        release_date: { type: String, required: true },
        poster_path: { type: String, required: true },
        overview: { type: String, required: true },
        addedAt: { type: Date, default: Date.now }
  }],
    favorites: [{
        _id: { type: Number, required: true }, // Use movie ID from external API as _id
        title: { type: String, required: true },
        release_date: { type: String, required: true },
        poster_path: { type: String, required: true },
        overview: { type: String, required: true },
        addedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;