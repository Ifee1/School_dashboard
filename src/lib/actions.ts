"use server";

import {
  ClassSchema,
  ExamSchema,
  StudentsSchema,
  SubjectSchema,
  TeachersSchema,
} from "./formValidationSchemas";
import prisma from "./prisma";
import { CurrentState } from "./types";
import { clerkClient, createClerkClient } from "@clerk/nextjs/server";
import { currentUserId, role } from "./utils";

export async function createSubject(
  currentState: CurrentState,
  data: SubjectSchema
) {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
        teachers: {
          connect: data.teachers.map(function (teacherId: any) {
            return { id: teacherId };
          }),
        },
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function updateSubject(
  currentState: CurrentState,
  data: SubjectSchema
) {
  try {
    await prisma.subject.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        teachers: {
          set: data.teachers.map(function (teacherId: any) {
            return { id: teacherId };
          }),
        },
      },
    });
    console.log(data.name, data.id);
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function deleteSubject(
  currentState: CurrentState,
  data: FormData
) {
  const id = data.get("id") as string;
  try {
    await prisma.subject.delete({
      where: {
        id: parseInt(id),
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function createExam(currentState: CurrentState, data: ExamSchema) {
  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: currentUserId,
          id: data.lessonId,
        },
      });

      if (!teacherLesson) {
        return { success: false, error: true };
      }
    }
    await prisma.exam.create({
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function updateExam(currentState: CurrentState, data: ExamSchema) {
  try {
    if (role === "teacher") {
      const teacherLesson = await prisma.lesson.findFirst({
        where: {
          teacherId: currentUserId,
          id: data.lessonId,
        },
      });

      if (!teacherLesson) {
        return { success: false, error: true };
      }
    }
    await prisma.exam.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        startTime: data.startTime,
        endTime: data.endTime,
        lessonId: data.lessonId,
      },
    });

    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function deleteExam(currentState: CurrentState, data: FormData) {
  const id = data.get("id") as string;
  try {
    await prisma.exam.delete({
      where: {
        id: parseInt(id),
        ...(role === "teacher"
          ? { lesson: { teacherId: currentUserId! } }
          : {}),
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function createClass(
  currentState: CurrentState,
  data: ClassSchema
) {
  try {
    await prisma.class.create({
      data,
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function updateClass(
  currentState: CurrentState,
  data: ClassSchema
) {
  try {
    await prisma.class.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        capacity: data.capacity,
        gradeId: data.gradeId,
        supervisorId: data.supervisorId,
      },
    });
    console.log(data.name, data.id);
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function deleteClass(currentState: CurrentState, data: FormData) {
  const id = data.get("id") as string;
  try {
    await prisma.class.delete({
      where: {
        id: parseInt(id),
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function createTeacher(
  currentState: CurrentState,
  data: TeachersSchema
) {
  try {
    const resUser = await clerkClient();
    const user = await resUser.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });
    await prisma.teacher.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.firstName,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        sex: data.sex,
        address: data.address,
        bloodType: data.bloodType,
        birthday: data.birthday,
        subjects: {
          connect: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function updateTeacher(
  currentState: CurrentState,
  data: TeachersSchema
) {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    const resUser = await clerkClient();
    const user = await resUser.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.firstName,
      lastName: data.surname,
      publicMetadata: { role: "teacher" },
    });
    await prisma.teacher.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.firstName,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        sex: data.sex,
        address: data.address,
        bloodType: data.bloodType,
        birthday: data.birthday,
        subjects: {
          set: data.subjects?.map((subjectId: string) => ({
            id: parseInt(subjectId),
          })),
        },
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function deleteTeacher(
  currentState: CurrentState,
  data: FormData
) {
  const id = data.get("id") as string;
  try {
    const resUser = await clerkClient();
    const user = await resUser.users.deleteUser(id);
    await prisma.teacher.delete({
      where: {
        id: id,
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function createStudent(
  currentState: CurrentState,
  data: StudentsSchema
) {
  try {
    const classItem = await prisma.class.findUnique({
      where: { id: data.classId },
      include: { _count: { select: { students: true } } },
    });
    if (classItem && classItem.capacity === classItem._count.students) {
      return { success: false, error: true };
    }

    const resUser = await clerkClient();
    const user = await resUser.users.createUser({
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.surname,
      publicMetadata: { role: "student" },
    });
    await prisma.student.create({
      data: {
        id: user.id,
        username: data.username,
        name: data.firstName,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        sex: data.sex,
        address: data.address,
        bloodType: data.bloodType,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function updateStudent(
  currentState: CurrentState,
  data: StudentsSchema
) {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    const resUser = await clerkClient();
    const user = await resUser.users.updateUser(data.id, {
      username: data.username,
      ...(data.password !== "" && { password: data.password }),
      firstName: data.firstName,
      lastName: data.surname,
      publicMetadata: { role: "student" },
    });
    await prisma.student.update({
      where: {
        id: data.id,
      },
      data: {
        ...(data.password !== "" && { password: data.password }),
        username: data.username,
        name: data.firstName,
        surname: data.surname,
        email: data.email,
        phone: data.phone,
        sex: data.sex,
        address: data.address,
        bloodType: data.bloodType,
        birthday: data.birthday,
        gradeId: data.gradeId,
        classId: data.classId,
        parentId: data.parentId,
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}

export async function deleteStudent(
  currentState: CurrentState,
  data: FormData
) {
  const id = data.get("id") as string;
  try {
    const resUser = await clerkClient();
    const user = await resUser.users.deleteUser(id);
    await prisma.student.delete({
      where: {
        id: id,
      },
    });
    // revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}
