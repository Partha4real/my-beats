import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./database/database.js";
import routes from "./routes/index.js";

// express init
const app = express();

// config
dotenv.config({ path: "./config/config.env" });

// connect DB
connectDB();

// body-parser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb", extended: true }));

// morgan
app.use(morgan("dev"));

// cors
app.use(cors({ origin: true, credentials: true }));

// routes
app.get("/", (req, res) => {
    res.send("MY BEATS API CONNECTED");
});
app.use("/api/v1", routes);

// post
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server started at PORT", PORT));
