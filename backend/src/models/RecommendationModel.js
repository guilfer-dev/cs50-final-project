import mongoose from "mongoose"

const recommendationSchema = new mongoose.Schema({
    title: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    subcategoy: String,
    url: String,
    about: String,
})

export default mongoose.model("Recommendation", recommendationSchema);