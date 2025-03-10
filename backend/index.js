import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/userroute.js";
import jobRoute from "./routes/jobroute.js";
import subscriptionRoute from "./routes/subscriptionroutes.js";
import adminRoute from "./routes/adminroute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// **Dynamic CORS Configuration**
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || origin.startsWith("http://localhost:")) {
            callback(null, true); 
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"], 
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
    console.log("cstm Incoming Cookies:", req.cookies);
    next();
});

const PORT = process.env.PORT || 8080;

app.use("/api/v1/user", userRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/subscription", subscriptionRoute);
app.use("/api/v1/admin", adminRoute);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
