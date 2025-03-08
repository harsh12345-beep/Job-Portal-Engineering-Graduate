import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    planName: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true }, 
    features: [{ type: String, required: true }],
    status: { type: String, enum: ["Enabled", "Disabled"], default: "Enabled" }
}, { timestamps: true });

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
