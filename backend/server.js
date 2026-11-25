const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Enrollment Schema
const enrollmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

// Home Route
app.get("/", (req, res) => {
    res.send("Backend Server is Running!");
});

// Enrollment Route
app.post("/enroll", async (req, res) => {
    try {
        const { name, email, phone, course } = req.body;

        const newEnrollment = new Enrollment({
            name,
            email,
            phone,
            course
        });

        await newEnrollment.save();

        console.log("New Enrollment Saved:", name, email, phone, course);

        res.json({
            success: true,
            message: "Enrollment saved successfully!"
        });

    } catch (error) {
        console.log("Enrollment Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to save enrollment"
        });
    }
});

// Connect MongoDB FIRST, then start server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully!");

        app.listen(5000, () => {
            console.log("Server running on http://localhost:5000");
        });
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });