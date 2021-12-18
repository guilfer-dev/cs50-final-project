//libraries
import axios from "axios"
import jwt from "jsonwebtoken"

//models
import User from "../models/UserModel.js"

export default {
    async show(req, res) {

        const userID = req.userID;

        const user = await User.findById(userID);

        if (!user) {
            return res.status(403).json({
                msg: "Invalid user"
            })
        }

        try {
            // create category into db
            const activity = await User.findById(userID)
                .select("contributions bookmarks votes -_id")

            // responds the client-side with user data and their new token
            return res.json(activity)
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
}