import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const createStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isStudentExists(studentData.id)) {
    throw new Error("Student Alreday Exists");
  }
  const result = await Student.create(studentData);
  // Create Instance
  // const student = new Student(studentData);
  // if (await student.isStudentExists(studentData.id)) {
  //   throw new Error("Student Alreday Exists");
  // }
  // const result = await student.save();

  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteStudentByIdFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentByIdFromDB,
};
