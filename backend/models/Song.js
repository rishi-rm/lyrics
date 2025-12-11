import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
    title: String,
    artist: String,
    searchKey: String,
    lastFetched: Date,
})

export default mongoose.model("Song", SongSchema)