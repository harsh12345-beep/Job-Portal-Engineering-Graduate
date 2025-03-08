import express from "express";
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getUserProfileById, 
    updateUserProfileById ,
    getUnverifiedUsers
} from "../controllers/usercontroller.js";

import { authenticateUser } from "../middlewares/isauthenticated.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/unverified-users", getUnverifiedUsers);

router.get("/profile/:id", authenticateUser, getUserProfileById);

router.put("/update-profile/:id", authenticateUser, updateUserProfileById);

router.get("/get-cookie", (req, res) => {
    console.log("Cookies Sent to Client:", req.cookies);
    res.json({ cookie: req.cookies.token || "No cookie found" });
});

export default router; 
