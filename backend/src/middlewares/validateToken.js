import jwt from "jsonwebtoken"

export default function validateToken(req, res, next) {

    const authToken = req.headers.authorization;

    // reads authorization from the reader and returns if there is none
    if (!authToken) {
        return res.status(401).json({
            msg: "You must be logged in in order to post a new recommendation",
        })
    }

    // get only the token from the header
    const [, token] = authToken.split(" ");

    // if the token is correct, try the next req treatment
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