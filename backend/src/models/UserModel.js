import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    github_id: Number,
    login: String,
    avatar_url: String,
    name: String,
    contributions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recommendation"
    }],
    bookmars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recommendation"
    }],
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recommendation"
    }],
})

export default mongoose.model("User", userSchema);