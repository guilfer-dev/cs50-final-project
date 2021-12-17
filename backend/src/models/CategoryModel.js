import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    subcategories: [String]
})

export default mongoose.model("Category", categorySchema);