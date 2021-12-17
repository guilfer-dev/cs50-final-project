//libraries
import axios from "axios"
import jwt from "jsonwebtoken"

//models
import User from "../models/UserModel.js"

export default {

    async auth(req, res) {

        const { code } = req.body;

        const url = "https://github.com/login/oauth/access_token";
        try {

            // request login over oauth and parse data
            const { data: accessTokenResponse } = await axios.post(url, null, {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                },
                headers: {
                    Accept: "application/json"
                }
            });

            // request user data from token given by oauth
            const response = await axios.get("https://api.github.com/user", {
                headers: {
                    Authorization: `Bearer ${accessTokenResponse.access_token}`,
                }
            });

            const {
                login,
                id,
                avatar_url,
                name
            } = response.data

            // check if user already exists in db
            let user = await User.findOne({ github_id: id })

            // if the user do not exists, create one
            if (!user) {
                user = await User.create({
                    github_id: id,
                    login,
                    avatar_url,
                    name
                })
            }

            // create a token for the logged user
            const token = jwt.sign({
                github_id: user.github_id,
                name: user.name
            }, process.env.JWT_SECRET,
                {
                    subject: user.id,
                    expiresIn: "1d",
                }
            )

            // responds the client-side with user data and their new token
            return res.json({
                token,
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url
                }
            })
        }
        catch (err) {
            // log and response with error if it is the case
            console.error(err);
            return res.status(401).json({
                msg: "Something went wrong while trying to authenticate..."
            })
        }
    }
}