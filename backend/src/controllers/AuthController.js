//libraries
import axios from "axios"
import jwt from "jsonwebtoken"

//models
import User from "../models/UserModel.js"

export default {

    async auth(req, res) {

        const { code } = req.body;
        // console.log(code)

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

            // console.log(response)

            const {
                login,
                id,
                avatar_url,
                name
            } = response.data

            const user = await User.findOne({ github_id: id })

            if (!user) {
                user = await User.create({
                    github_id: id,
                    login,
                    avatar_url,
                    name
                })
            }

            const token = jwt.sign({
                github_id: user.github_id,
                name: user.name
            }, process.env.JWT_SECRET,
                {
                    subject: user.id,
                    expiresIn: "1d",
                }
            )
            return res.json({ token, user })
        }
        catch (err) {
            console.error(err);
            return res.status(401).json({
                msg: "Something went wrong while trying to authenticate..."
            })
        }
    }
}