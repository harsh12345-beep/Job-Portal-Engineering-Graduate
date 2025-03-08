import Subscription from "../models/subscription.js";

export const createSubscription = async (req, res) => {
    try {
        const { planName, price, duration, features, status } = req.body;

        if (!planName || !price || !duration || !features || !Array.isArray(features) || features.length === 0) {
            return res.status(400).json({ success: false, message: "All fields are required, and features must be an array with at least one item." });
        }

        const newSubscription = new Subscription({ planName, price, duration, features, status });
        await newSubscription.save();

        return res.status(201).json({ success: true, message: "Subscription plan created successfully!", data: newSubscription });
    } catch (error) {
        console.error("Error creating subscription:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};


export const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching plans", error: error.message });
    }
};


export const getSubscriptionById = async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findById(id);

        if (!subscription) {
            return res.status(404).json({ success: false, message: "Subscription not found" });
        }

        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching subscription", error: error.message });
    }
};

export const updateSubscription = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ success: false, message: "No data provided for update." });
        }

        if (!existingSubscription) {
            return res.status(404).json({ success: false, message: "Subscription not found." });
        }

        
        const updatedSubscription = await Subscription.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

        return res.status(200).json({ success: true, message: "Subscription updated successfully!", data: updatedSubscription });
    } catch (error) {
        console.error("Error updating subscription:", error);
        return res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};
