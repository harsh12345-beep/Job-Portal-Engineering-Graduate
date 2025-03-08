import express from "express";
import {
    createSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    updateSubscription,
} from "../controllers/subscriptioncontroller.js"; 

const router = express.Router();

// Create a new subscription
router.post("/create", createSubscription); 

// Get all subscriptions
router.get("/get-all", getAllSubscriptions);

// Get a single subscription by ID
router.get("/:id", getSubscriptionById);

// Update a subscription
router.put("/update:id", updateSubscription);

export default router;
