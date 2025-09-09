import User from '../models/UserModel.js';



// Favorites controllers

export const addToFavorites= async(req,res) =>{
    try{

        const {_id,title, release_date,poster_path, overview }=req.body

        const user = await User.findById(req.user._id);
        if (!user){
            return res.status(404).json({ error: "User not found" });
        }
        // check if the movie already exists in favorites 
        const alreadyFavorite = await user.favorites.some(favMovie => favMovie._id==_id);
        if (alreadyFavorite) {
            return res.status(409).json({ error: "Movie already in favorites" });
        }

        // Add movie to favorites
        user.favorites.push({ _id, title, release_date, poster_path, overview, addedAt: new Date() });
        await user.save();

        res.status(201).json({ message: "Movie added to favorites", 
            favorites: user.favorites
         });
    }catch(error){
        console.error('Add to favorites error:', error);
        res.status(500).json({ error: "Failed to add to favorites" });
    }
}

export const getFavorites= async (req,res) =>{
    try{
 
        const user = await User.findById(req.user._id);
        if (!user){
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user.favorites);
    }catch(err){
        console.error('Get favorites error:', err);
        res.status(500).json({ error: "Failed to get favorites" });
    }
}

export const removeFromFavorites = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { favorites: { _id: req.params.id } } }, // remove favorite with matching _id
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Movie removed from favorites", favorites: user.favorites });
  } catch (err) {
    console.error("Remove from favorites error:", err);
    res.status(500).json({ error: "Failed to remove from favorites" });
  }
};



// Watchlist controllers

export const addToWatchlist = async(req,res) =>{
    try{
        const {_id,title, release_date,poster_path, overview }=req.body

        const user = await User.findById(req.user._id);
        if (!user){
            return res.status(404).json({ error: "User not found" });
        }
        // check if the movie already exists in watchlist
        const alreadyInWatchlist = await user.watchlist.some(favMovie => favMovie._id==_id);
        if (alreadyInWatchlist) {
            return res.status(409).json({ error: "Movie already in watchlist" });
        }

        // Add movie to watchlist
        user.watchlist.push({ _id, title, release_date, poster_path, overview, addedAt: new Date() });
        await user.save();

        res.status(201).json({ message: "Movie added to watchlist", 
            watchlist: user.watchlist
         });
    }catch(error){
        console.error('Add to watchlist error:', error);
        res.status(500).json({ error: "Failed to add to watchlist" });
    }
}

export const getWatchlist = async (req,res) =>{
    try{
        const user=  await User.findById(req.user._id);
        if (!user){
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user.watchlist);
    }catch(err){
        console.error('Get watchlist error:', err);
        res.status(500).json({ error: "Failed to get watchlist" });
    }
}

export const removeFromWatchlist = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            { $pull: { watchlist: { _id: req.params.id } } }, // remove watchlist item with matching _id
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json({ message: "Movie removed from watchlist", watchlist: user.watchlist });
    } catch (err) {
        console.error('Remove from watchlist error:', err);
        res.status(500).json({ error: "Failed to remove from watchlist" });
    }
};
