//libraries
import axios from "axios"
import jwt from "jsonwebtoken"

//models
import Category from "../models/CategoryModel.js"

export default {

    async store(req, res) {

        const { name, password } = req.body;

        if (password !== process.env.ADD_CATTEGORY_PASS) {
            return res.status(403).json({
                msg: "Invalid request"
            });
        }

        // responds client-side if there is more fields than is accepted
        if (Object.keys(req.body).length !== 2 ||
            typeof name !== "string"
        ) {
            return res.status(400).json({
                msg: "Invalid request"
            });
        }

        try {

            // create category into db
            const category = await Category.create({ name });

            // responds the client-side with user data and their new token
            return res.json(category)
        }
        catch (err) {
            // log and responds with error if it is the case
            console.error(err);
            return res.status(400).json({
                err: err.code,
                msg: "Something went wrong while trying to create the category..."
            })
        }
    },

    async index(req, res) {

        try {

            // create category into db
            const categories = await Category.find({});

            // responds the client-side with user data and their new token
            return res.json(categories)
        }
        catch (err) {
            // log and responds with error if it is the case
            console.error(err);
            return res.status(401).json({
                msg: "Something went wrong while trying to retrieve categories..."
            })
        }
    }
}