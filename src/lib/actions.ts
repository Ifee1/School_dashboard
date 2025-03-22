"use server";

import { revalidatePath } from "next/cache";
import { SubjectInput } from "./formValidationSchemas";
import prisma from "./prisma";
import { CurrentState } from "./types";

export async function createSubject(
  data: SubjectInput
  //   currentState: CurrentState
) {
  try {
    await prisma.subject.create({
      data: {
        name: data.name,
      },
    });
    const result = await createSubject(data);
    console.log(result);
    revalidatePath("/list/subjects");
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
}
