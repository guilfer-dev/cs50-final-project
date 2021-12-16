//libraries
import axios from "axios"
import jwt from "jsonwebtoken"

//models
import Recommendation from "../models/RecommendationModel.js"
import Category from "../models/CategoryModel.js"

export default {

    async store(req, res) {

        const recommendation = req.body

        // responds client-side if there is more fields than is accepted
        if (Object.keys(recommendation).length !== 6) {
            return res.status(400).json({
                msg: "Invalid request"
            })
        }

        // define accepted field
        const fields = ["title", "category", "subcategory", "url", "about", "bookmars"]

        // responds client-side if there is invalid field
        for (let item in recommendation) {
            if (!fields.includes(item) ||
                typeof recommendation[item] !== "string"
            ) {
                return res.status(400).json({
                    msg: "Invalid request"
                })
            }
        }

        try {
            const category = await Category.findOne({ name: recommendation.category })

            if (!category) {
                return res.status(400).json({
                    msg: "Category does not exists"
                })
            }

            if (!category.subcategory.includes(recommendation.subcategory)) {
                category.subcategory.push(recommendation.subcategory);
                category.save()
            }

            recommendation.category = category;
            const newRecommendation = await Recommendation.create(recommendation);

            // responds the client-side with user data and their new token
            return res.json(newRecommendation)
        }
        catch (err) {
            // log and responds with error if it is the case
            console.error(err);
            return res.status(401).json({
                msg: "Something went wrong while trying to authenticate..."
            })
        }
    }
}