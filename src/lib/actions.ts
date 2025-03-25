"use server";

import { revalidatePath } from "next/cache";
import { SubjectSchema } from "./formValidationSchemas";
import prisma from "./prisma";
import { CurrentState } from "./types";

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
