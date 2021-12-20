// models
import Recommendation from "../models/RecommendationModel.js"
import User from "../models/UserModel.js"
import Category from "../models/CategoryModel.js"

// helpers
import youtubeURLParser from "../helpers/youtubeURLParser.js"

export default {

    async store(req, res) {

        const userID = req.userID;

        const user = await User.findById(userID);

        if (!user) {
            return res.status(403).json({
                msg: "Invalid user"
            })
        }

        const recommendation = req.body

        // define accepted field
        const fields = ["title", "category", "subcategory", "video", "about"]

        // responds client-side if there is more fields than is accepted
        if (Object.keys(recommendation).length !== fields.length) {
            return res.status(400).json({
                msg: "Invalid number of fields"
            })
        }

        // responds client-side if there is invalid field
        for (let item in recommendation) {
            if (!fields.includes(item) ||
                typeof recommendation[item] !== "string"
            ) {
                console.log({ item: recommendation[item] })
                return res.status(400).json({
                    msg: "Invalid field(s) type(s)"
                })
            }
        }

        // parse url provided as only the code
        recommendation.video = youtubeURLParser(recommendation.video);

        if (!recommendation.video) {
            return res.status(400).json({
                msg: "Invalid url format"
            })
        }

        // get category from db
        try {
            const category = await Category.findOne({ name: recommendation.category })

            if (!category) {
                return res.status(400).json({
                    msg: "Category does not exists"
                })
            }

            if (!category.subcategories.includes(recommendation.subcategory)) {
                category.subcategories.push(recommendation.subcategory);
                category.save()
            }

            recommendation.category = category;
            const newRecommendation = await Recommendation.create(recommendation);

            //save new contribution to the user who potested it
            user.contributions.push(newRecommendation._id);
            user.save();

            // responds the client-side with user data and their new token
            return res.json(newRecommendation)
        }
        catch (err) {
            // log and responds with error if it is the case
            console.error(err);
            return res.status(400).json({
                err,
                msg: "Something went wrong while trying to authenticate..."
            })
        }
    },

    async index(req, res) {

        try {

            // create category into db
            const recommendations = await Recommendation.find({}).sort({ _id: "desc" })
                .populate("category");

            // responds the client-side with user data and their new token
            return res.json(recommendations)
        }
        catch (err) {
            // log and responds with error if it is the case
            console.error(err);
            return res.status(400).json({
                err,
                msg: "Something went wrong while trying to retrieve categories..."
            })
        }
    },

    async update(req, res) {

        const userID = req.userID;
        const user = await User.findById(userID);

        const { action, value } = req.body;

        const { id } = req.params;

        if (!user ||
            typeof value !== "boolean" ||
            !id) {
            return res.status(400).json({
                msg: "Invalid request"
            })
        }

        try {

            // create category into db
            const recommendations = await Recommendation.findById(id);

            // only increase the number of votes if its value is true
            if (action === "votes" && value) {
                if (recommendations.votes) {
                    recommendations.votes++;
                } else {
                    recommendations.votes = 1;
                }
            } else if (action === "votes") {
                recommendations.votes--;
            }

            recommendations.save();

            // push the id of voted/bookmarked recommendation to the user who made the action
            if (value) {
                user[action].push(recommendations._id);
            } else {
                const doc = {};
                doc[action] = recommendations._id;
                const result = await user.update({
                    "$pull":
                        doc
                })
            }

            user.save();

            // responds the client-side if everything goes right
            return res.send();
        }
        catch (err) {
            // log and responds with error if it is the case
            console.error(err);
            return res.status(400).json({
                err,
                msg: "Something went wrong while trying cast vote/bookmark..."
            })
        }
    }
}