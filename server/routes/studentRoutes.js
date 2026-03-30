// const express = require("express");
// const router = express.Router();
// const { addStudent, getStudents } = require("../controllers/studentController");

// // ➕ Add student
// router.post("/add", addStudent);

// // 📥 Get students
// router.get("/", getStudents);
// router.delete("/students/:id", studentController.deleteStudent);
// router.put("/students/:id", async (req, res) => {
//   const { id } = req.params;

//   const { error } = await supabase
//     .from("students")
//     .update(req.body)
//     .eq("id", id);

//   if (error) return res.status(500).json(error);

//   res.json({ message: "Updated" });
// });
// module.exports = router;

const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase"); // ✅ REQUIRED
const studentController = require("../controllers/studentController");

// ➕ Add student
router.post("/add", studentController.addStudent);

// 📥 Get students
router.get("/", studentController.getStudents);

// ❌ DELETE (FIXED PATH)
router.delete("/:id", studentController.deleteStudent);

// ✏️ UPDATE (FIXED PATH)
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("students")
    .update(req.body)
    .eq("id", id);

  if (error) return res.status(500).json(error);

  res.json({ message: "Updated ✅" });
});

module.exports = router;