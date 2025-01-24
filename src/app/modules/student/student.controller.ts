import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { validateStudent } from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    const validatedStudentData = validateStudent.parse(studentData);

    const result = await StudentServices.createStudentIntoDb(
      validatedStudentData
    );

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Someting went wrong",
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students retrieved successfully",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Someting went wrong",
      error: error,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.getStudentByIdFromDB(studentId);
  res.status(200).json({
    success: true,
    message: "Students retrieved successfully",
    data: result,
  });
};
const deleteSingleStudent = async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentByIdFromDB(studentId);
  res.status(200).json({
    success: true,
    message: "Students deleted successfully",
    data: result,
  });
};

export const StudentContoller = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};
