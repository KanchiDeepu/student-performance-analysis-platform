const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  student_id: { type: Number, required: true, unique: true },
  attendance_pct: { type: Number, required: true },
  study_hours_per_week: { type: Number, required: true },
  assignment_score: { type: Number, required: true },
  previous_grade: { type: Number, required: true },
  final_grade: { type: Number, required: true },
});

module.exports = mongoose.model("Student", studentSchema);
