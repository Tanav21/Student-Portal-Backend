const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
    name: String,
    videos: [String] // Example array of video IDs or URLs
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;
