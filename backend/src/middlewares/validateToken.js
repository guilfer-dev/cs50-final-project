import jwt from "jsonwebtoken"

export default function validateToken(req, res, next) {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({
            msg: "You must be logged in in order to post a new recommendation",
        })
    }

    const [, token] = authToken.split(" ");

    try {
        const { sub } = jwt.verify(token, process.env.JWT_SECRET);
        req.userID = sub;
        return next();

    } catch (err) {
        console.error(err);
        return res.status(401).json({
            err,
            msg: "Authentication Error"
        })
    }
}