require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");
const Student = require("./models/Student");
const studentRoutes = require("./routes/students");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/student_performance";

app.use("/api/students", studentRoutes);

// One-time seed endpoint: loads data/student_performance.csv into MongoDB
app.get("/api/seed", async (req, res) => {
  try {
    const count = await Student.countDocuments();
    if (count > 0) {
      return res.json({ message: `DB already has ${count} records. Skipping seed.` });
    }

    const results = [];
    const csvPath = path.join(__dirname, "../data/student_performance.csv");

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        results.push({
          student_id: Number(row.student_id),
          attendance_pct: Number(row.attendance_pct),
          study_hours_per_week: Number(row.study_hours_per_week),
          assignment_score: Number(row.assignment_score),
          previous_grade: Number(row.previous_grade),
          final_grade: Number(row.final_grade),
        });
      })
      .on("end", async () => {
        await Student.insertMany(results);
        res.json({ message: `Seeded ${results.length} student records.` });
      });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("Student Performance Analysis API is running. Try /api/students");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
