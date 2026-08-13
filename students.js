const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ student_id: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET summary stats (avg attendance, study hours, grade etc.)
router.get("/summary", async (req, res) => {
  try {
    const summary = await Student.aggregate([
      {
        $group: {
          _id: null,
          avg_attendance: { $avg: "$attendance_pct" },
          avg_study_hours: { $avg: "$study_hours_per_week" },
          avg_assignment_score: { $avg: "$assignment_score" },
          avg_final_grade: { $avg: "$final_grade" },
          total_students: { $sum: 1 },
        },
      },
    ]);
    res.json(summary[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET students below a grade threshold (at-risk students)
router.get("/at-risk/:threshold", async (req, res) => {
  try {
    const threshold = parseFloat(req.params.threshold) || 50;
    const atRisk = await Student.find({ final_grade: { $lt: threshold } }).sort({
      final_grade: 1,
    });
    res.json({ count: atRisk.length, students: atRisk });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET top performers
router.get("/top/:n", async (req, res) => {
  try {
    const n = parseInt(req.params.n) || 10;
    const top = await Student.find().sort({ final_grade: -1 }).limit(n);
    res.json(top);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
