import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name: String,
    subcategory: [String]
})

export default mongoose.model("Category", categorySchema);