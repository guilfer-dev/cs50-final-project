import mongoose from "mongoose"

const recommendationSchema = new mongoose.Schema({
    title: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subcategory: String,
    video: String,
    about: String,
    votes: Number,
})

export default mongoose.model("Recommendation", recommendationSchema);