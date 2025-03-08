import User from "../models/user.js";
// import Job from "../models/jobmodel.js";

export const approveOrRejectUser = async (req, res) => {
    try {
        const { action, role } = req.body;  // Accept role from request

        // Check if the role is Admin
        if (role !== "Admin") {
            return res.status(403).json({ message: "Access denied. Admins only!" });
        }

        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        // Ensure only Employers or Admins can be approved/rejected
        if (user.role !== "Employer" && user.role !== "Admin") {
            return res.status(403).json({ message: "Only Employers or Admins can be approved or rejected!" });
        }

        if (action === "approve") {
            user.isVerified = true;
            await user.save();
            return res.json({ message: "User approved successfully!" });
        }

        if (action === "reject") {
            console.log(User.findByIdAndDelete(req.params.id));
            await User.findByIdAndDelete(req.params.id);
            return res.json({ message: "User rejected successfully!" });
        }

        return res.status(400).json({ message: "Invalid action. Use 'approve' or 'reject'." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

