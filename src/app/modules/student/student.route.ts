import express from "express";
import { StudentContoller } from "./student.controller";

const router = express.Router();

router.post("/create-student", StudentContoller.createStudent);
router.get("/", StudentContoller.getAllStudents);
router.get("/:studentId", StudentContoller.getSingleStudent);
router.delete("/:studentId", StudentContoller.deleteSingleStudent);

export const StudentRoutes = router;
