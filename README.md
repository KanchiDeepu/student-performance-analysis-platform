# 📚 Student Performance Analysis Platform

A full-stack platform that analyzes academic performance data to identify what actually
drives student outcomes — attendance, study habits, assignment scores, or past performance —
and visualizes the findings in an interactive dashboard.

---

## 🚀 Project Overview

This project answers a practical question for educators: **which factors predict a student's
final grade, and by how much?** It combines:

- **Python data analysis** — correlation analysis and a linear regression model to quantify
  the impact of each factor on final grade.
- **Node.js/Express + MongoDB backend** — a REST API serving student records and aggregated
  analytics (summary stats, at-risk students, top performers).
- **Interactive frontend dashboard** — visualizes grade distribution and lets users query
  at-risk or top-performing students on demand.

---

## 🛠️ Tech Stack

- **Data Analysis:** Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Frontend:** HTML, CSS, JavaScript, Chart.js
- **Tools:** Git, VS Code

---

## 📂 Project Structure

```
student-performance-platform/
├── data/
│   └── student_performance.csv       # 500-record synthetic student dataset
├── notebooks/
│   ├── analysis.py                   # EDA + correlation + regression analysis
│   └── requirements.txt
├── reports/
│   ├── correlation_heatmap.png
│   ├── grade_distribution.png
│   └── analysis_summary.md           # Auto-generated findings
├── backend/
│   ├── app.js                        # Express server + CSV seed endpoint
│   ├── models/Student.js             # Mongoose schema
│   ├── routes/students.js            # REST API routes
│   ├── package.json
│   └── .env.example
├── frontend/
│   └── index.html                    # Dashboard (charts + tables)
└── README.md
```

---

## 📊 Key Findings (from `notebooks/analysis.py`)

Run against the included 500-student dataset:

| Factor | Correlation with Final Grade |
|---|---|
| Study hours/week | 0.656 |
| Assignment score | 0.359 |
| Attendance % | 0.265 |
| Previous grade | 0.235 |

**Regression model performance:** R² = 0.716 (explains ~72% of grade variance),
Mean Absolute Error = 4.56 grade points.

**Insight:** current study habits (hours/week) are a stronger predictor of final grade
than historical academic performance — suggesting present engagement matters more than
past track record.

---

## ▶️ How to Run

### 1. Python Analysis
```bash
cd notebooks
pip install -r requirements.txt
python analysis.py
```
This regenerates the correlation heatmap, grade distribution chart, and summary report
in `reports/`.

### 2. Backend API
```bash
cd backend
npm install
cp .env.example .env      # edit MONGO_URI if needed
npm start
```
Make sure MongoDB is running locally (or point `MONGO_URI` to a hosted instance, e.g. MongoDB Atlas).

Then seed the database once:
```
GET http://localhost:5000/api/seed
```

### 3. Frontend
The backend serves the frontend automatically. Open:
```
http://localhost:5000
```
Click **"Seed Database"** once, then explore the dashboard — grade distribution chart,
at-risk student lookup, and top performer lookup.

---

## 🔗 API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/students` | All student records |
| `GET /api/students/summary` | Aggregated stats (averages) |
| `GET /api/students/at-risk/:threshold` | Students below a grade threshold |
| `GET /api/students/top/:n` | Top N performers by final grade |
| `GET /api/seed` | One-time load of CSV data into MongoDB |

---

## 🎯 Key Learnings

- Applied correlation analysis and linear regression to identify meaningful predictors in
  real (if synthetic) academic data, not just descriptive statistics.
- Built a REST API with MongoDB aggregation pipelines for server-side analytics.
- Connected a Python analysis layer to a full-stack JS application — a common real-world
  pattern where data science and backend development meet.
- Practiced end-to-end project structuring: data → analysis → API → UI.

---

## ⭐ Future Enhancements

- Deploy backend on Render and frontend on GitHub Pages / Vercel
- Add a classification model (pass/fail prediction) alongside the regression model
- Replace synthetic data with a real public dataset (e.g., UCI Student Performance dataset)
- Add authentication for a real "educator login" use case

---

## 👤 Author

**Deepu Kanchi**
GitHub: https://github.com/KanchiDeepu
