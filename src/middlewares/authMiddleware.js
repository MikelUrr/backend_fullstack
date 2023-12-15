import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

const isAuthenticatedApi = (req, res, next) => {
    try {
        console.log("cookies", req.headers.cookie);
        const cookie = req.headers.cookie;
        console.log("dos", req.headers.cookie.name);

        if (!cookie) {
            return res.status(401).json({ error: "Authentication failed: No token found" });
        }

        const token = cookie.split("=")[1];
        console.log("tokensito", token);

        if (!token) {
            return res.status(401).json({ error: "Authentication failed: Invalid token" });
        }

        const { emai, id } = jwt.verify(token, process.env.JWT_SECRET);
        console.log("uno", email);
     req.user= {email, userId}
        req.email = email;
        next();
    } catch (error) {
        console.error("Error in authentication:", error);
        res.status(401).json({ error: "Authentication failed: Invalid token" });
    }
};

export default isAuthenticatedApi;
export { isAuthenticatedApi };
