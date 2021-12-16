import mongoose from "mongoose"

const recommendationSchema = new mongoose.Schema({
    title: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subcategory: String,
    url: String,
    about: String,
    votes: String,
})

export default mongoose.model("Recommendation", recommendationSchema);