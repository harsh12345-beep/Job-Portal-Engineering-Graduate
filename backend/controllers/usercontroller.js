
import User from "../models/user.js";
import { genSalt, hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, mobileNumber, role } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            mobileNumber,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            httpOnly: true,  
            secure: false,   
            sameSite: "Lax", 
            maxAge: 24 * 60 * 60 * 1000, 
        });


        res.status(200).json({ 
            message: "Login successful", 
            user, 
            token 
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Logout User
export const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
};

// Get User Profile
export const getUserProfileById = async (req, res) => {
    try {
        const userId = req.params.id; 

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// Update User Profile
export const updateUserProfileById = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body; 

        if (updates.role && !["Student", "Employer", "College", "Admin"].includes(updates.role)) {
            return res.status(400).json({ message: "Invalid role provided" });
        }

        if (updates.password) {
            const salt = await genSalt(10);
            updates.password = await hash(updates.password, salt);
        }

        const user = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "Profile updated successfully", user });
    } catch (error) {
        console.error("Error updating user profile:", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Authenticate Middleware
export const authenticateUser = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is invalid" });
    }
};

// Role-Based Authorization
export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Access denied for role: ${req.user?.role || "Unknown"}` });
        }
        next();
    };
};


// Fetch unverified Admins and Employers
export const getUnverifiedUsers = async (req, res) => {
    try {
      const users = await User.find({ isVerified: false, role: { $in: ["Admin", "Employer"] } });
  
      if (users.length === 0) {
        return res.status(404).json({ message: "No unverified Admins or Employers found" });
      }
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  };
