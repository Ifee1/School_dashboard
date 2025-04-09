import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(3, { message: "Subject Name is required" }),
  teachers: z.array(z.string()),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(2, { message: "Exam title is required" }),
  startTime: z.coerce.date({ message: "Start Time is required" }),
  endTime: z.coerce.date({ message: "End Time is required" }),
  lessonId: z.coerce.number({ message: "Lesson is required" }),
});

export type ExamSchema = z.infer<typeof examSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Class Name is required" }),
  capacity: z.coerce.number().min(2, { message: "Class Name is required" }),
  gradeId: z.coerce.number().min(2, { message: "gradeId  is required" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teachersSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(25, { message: "Username must be 25 characters maximum" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .or(z.literal(""))
    .optional(),
  firstName: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  email: z
    .string()
    .email({ message: "Invalid Email address" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  birthday: z.coerce.date({ message: "Birthday is required" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "sex is required" }),
  img: z.string().optional(),
  subjects: z.array(z.string()).optional(),
});

export type TeachersSchema = z.infer<typeof teachersSchema>;

export const studentsSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(25, { message: "Username must be 25 characters maximum" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" })
    .or(z.literal(""))
    .optional(),
  firstName: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  email: z
    .string()
    .email({ message: "Invalid Email address" })
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
  address: z.string(),
  birthday: z.coerce.date({ message: "Birthday is required" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "sex is required" }),
  img: z.string().optional(),
  gradeId: z.coerce.number().min(1, { message: "Grade is required" }),
  classId: z.coerce.number().min(1, { message: "Class is required" }),
  parentId: z.string().min(1, { message: "Parent Id is required" }),
});

export type StudentsSchema = z.infer<typeof studentsSchema>;
