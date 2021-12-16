import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    github_id: Number,
    login: String,
    avatar_url: String,
    name: String
})

export default mongoose.model("User", userSchema);