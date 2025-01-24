import { Model } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TUserName;
  gender: "male" | "female";
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: "active" | "blocked";
  isDeleted: boolean;
};

// For Creating Custom Staitc

export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isStudentExists(id: string): Promise<TStudent | null>;
}

// For Creating Custom Instance
// export type TStudentMethods = {
//   isStudentExists(id: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<TStudent, object, TStudentMethods>;
