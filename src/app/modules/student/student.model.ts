import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from "./student.interface";
import config from "../../config";

const userNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGurdianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: [true, "Id is required"], unique: true },
  password: {
    type: String,
    required: [true, "Password is required"],
    maxlength: [12, "Password can not be more then 12 Characters"],
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: {
    type: localGurdianSchema,
    required: true,
  },
  profileImage: { type: String },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Pre Middleware
studentSchema.pre("save", async function () {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const student = this;
  // Hasing Password
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds)
  );
});

// Post Middleware
studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// Querry Middleware
studentSchema.pre("find", function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const student = this;
});

// Creating Custom Statics Methods;
studentSchema.statics.isStudentExists = async function (id: string) {
  const existingStudent = await Student.findOne({ id });
  return existingStudent;
};

// Creatign Custom Instance methods
// studentSchema.methods.isStudentExists = async function (id: string) {
//   const existingStudent = await Student.findOne({ id });
//   return existingStudent;
// };

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
