import express from "express";
import { approveOrRejectUser } from "../controllers/admincontroller.js";
import { isAdmin } from "../middlewares/isadmin.js";

const router = express.Router();

router.put("/user/approve-reject/:id", isAdmin, approveOrRejectUser);

export default router;

