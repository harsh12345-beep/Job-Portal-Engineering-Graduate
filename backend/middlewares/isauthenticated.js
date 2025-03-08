import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config(); 

const authenticateUser = async (req, res, next) => {
    try {
        console.log("🔹 Received Cookies:", req.cookies);

        let token = req.headers.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.split(" ")[1]
            : req.cookies?.token;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided", success: false });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.SECRET_KEY);
        } catch (error) {
            console.error("⚠️ JWT Verification Error:", error.message);
            return res.status(401).json({ message: "Unauthorized: Invalid Token", success: false });
        }

        console.log("🔹 Decoded Token:", decoded); 

        const userId = decoded.id;  
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User ID missing", success: false });
        }

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(401).json({ message: "Unauthorized: User not found", success: false });
        }

        console.log("✅ Authenticated User:", user.email);

        req.user = user; 
        next();
    } catch (error) {
        console.error("⚠️ Authentication Error:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated", success: false });
        }
        if (!roles.includes(req.user.role)) {
            console.warn(`🚫 Access denied: Role '${req.user.role}' not authorized.`);
            return res.status(403).json({ message: `Access denied for role: ${req.user.role}`, success: false });
        }
        next();
    };
};

export { authenticateUser, authorizeRoles };
