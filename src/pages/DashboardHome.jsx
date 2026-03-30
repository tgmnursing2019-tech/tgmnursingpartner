import { useEffect, useState } from "react";

const DashboardHome = ({ setActive }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch("http://localhost:5000/api/students");
    const result = await res.json();
    setData(result || []);
  };

  // 📊 TOTAL
  const totalStudents = data.length;

  // 👨‍🎓 CURRENT / PASSED (example logic)
  const currentStudents = data.filter(s => s.status !== "passed").length;
  const passedStudents = data.filter(s => s.status === "passed").length;

  // 🎓 COURSE COUNT
  const courses = {};
  data.forEach(s => {
    courses[s.course] = (courses[s.course] || 0) + 1;
  });

  // 📄 DOCUMENT STATUS
  const completeDocs = data.filter(s =>
    s.documents && Object.values(s.documents).every(v => v)
  ).length;

  const pendingDocs = totalStudents - completeDocs;

  // 🚻 GENDER
  const male = data.filter(s => s.gender === "Male").length;
  const female = data.filter(s => s.gender === "Female").length;

  // ⚠ ALERTS
  const missingAadhar = data.filter(s => !s.aadhar_no).length;
  const missingMobile = data.filter(s => !s.mobile).length;

  // 📤 EXPORT CSV
  const exportCSV = () => {
    const headers = Object.keys(data[0] || {}).join(",");
    const rows = data.map(s => Object.values(s).join(",")).join("\n");
    const csv = headers + "\n" + rows;

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();
  };

  return (
    <div className="space-y-6">

      {/* 🚀 QUICK ACTIONS */}
      <div className="flex gap-3 flex-wrap">
        <button onClick={() => setActive("add-student")} className="bg-blue-500 text-white px-4 py-2 rounded">
          ➕ Add Student
        </button>
        <button onClick={() => setActive("students")} className="bg-green-500 text-white px-4 py-2 rounded">
          👩‍🎓 View Students
        </button>
        <button onClick={exportCSV} className="bg-purple-500 text-white px-4 py-2 rounded">
          📥 Export CSV
        </button>
      </div>

      {/* 📊 STATS CARDS */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3>Total Students</h3>
          <p className="text-xl font-bold">{totalStudents}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>Current Students</h3>
          <p className="text-xl font-bold">{currentStudents}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3>Passed Students</h3>
          <p className="text-xl font-bold">{passedStudents}</p>
        </div>
      </div>

      {/* 🎓 COURSE COUNT */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Course Wise Students</h3>
        {Object.entries(courses).map(([course, count]) => (
          <div key={course} className="flex justify-between text-sm border-b py-1">
            <span>{course}</span>
            <span>{count}</span>
          </div>
        ))}
      </div>

      {/* 📄 DOCUMENT STATUS */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Document Status</h3>
        <p>✔ Complete: {completeDocs}</p>
        <p>⚠ Pending: {pendingDocs}</p>
      </div>

      {/* 🚻 GENDER */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Gender Distribution</h3>
        <p>Male: {male}</p>
        <p>Female: {female}</p>
      </div>

      {/* ⚠ ALERTS */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2 text-red-500">Alerts</h3>
        <p>Missing Aadhaar: {missingAadhar}</p>
        <p>Missing Mobile: {missingMobile}</p>
      </div>

      {/* 👩‍🎓 RECENT STUDENTS */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Recent Students</h3>
        {data.slice(0, 5).map(s => (
          <div key={s.id} className="flex justify-between border-b py-1 text-sm">
            <span>{s.student_name}</span>
            <span>{s.course}</span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default DashboardHome;