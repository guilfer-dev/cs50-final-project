import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name: String,
    subcategories: [String]
})

export default mongoose.model("Category", categorySchema);