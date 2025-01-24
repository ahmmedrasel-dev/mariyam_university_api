import { z } from "zod";

// UserName schema

const userNameValidationSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().nonempty("Last name is required"),
});

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty("Father's name is required"),
  fatherContactNo: z
    .string()
    .length(11, "Father's contact number must be 11 digits")
    .nonempty("Father's contact number is required"),
  fatherOccupation: z.string().nonempty("Father's occupation is required"),
  motherName: z.string().nonempty("Mother's name is required"),
  motherOccupation: z.string().nonempty("Mother's occupation is required"),
  motherContactNo: z
    .string()
    .length(11, "Mother's contact number must be 11 digits")
    .nonempty("Mother's contact number is required"),
});

// LocalGuardian schema
const localGuardianValidationSchema = z.object({
  name: z.string().nonempty("Local guardian's name is required"),
  occupation: z.string().nonempty("Local guardian's occupation is required"),
  contactNo: z
    .string()
    .length(11, "Number must be 11 digit")
    .nonempty("Local guardian's contact number is required"),
  address: z.string().nonempty("Local guardian's address is required"),
});

// Student schema
const studentSchema = z.object({
  id: z.string(),
  password: z.string().max(12),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female"]),
  dateOfBirth: z.string(),
  email: z.string().email("Invalid email address"),
  contactNo: z
    .string()
    .length(11, "Contact number must be 11 digit")
    .nonempty("Contact number is required"),
  emergencyContactNo: z
    .string()
    .length(11, "Contact number must be 11 digit")
    .nonempty("Emergency contact number is required"),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  presentAddress: z.string().nonempty("Present address is required"),
  permanentAddress: z.string().nonempty("Permanent address is required"),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImage: z.string().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean().default(false),
});

// Export the student schema for validation
export const validateStudent = studentSchema;
