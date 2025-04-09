import { FormModalProps } from "@/lib/types";
import FormModal from "./FormModal";
import prisma from "@/lib/prisma";
import { currentUserId, role } from "@/lib/utils";

async function FormContainer({ modalData }: FormModalProps) {
  let relatedData = {};

  if (modalData.type !== "delete") {
    switch (modalData.table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true },
        });
        relatedData = { teachers: subjectTeachers };

        break;
      case "class":
        const classGrades = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const classTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true },
        });
        relatedData = { teachers: classTeachers, grades: classGrades };

        break;

      case "teacher":
        const subjects = await prisma.subject.findMany({
          select: { id: true, name: true },
        });

        relatedData = { subjects: subjects };

        break;
      case "student":
        const studentGrade = await prisma.grade.findMany({
          select: { id: true, level: true },
        });
        const studentClasses = await prisma.class.findMany({
          include: {
            _count: {
              select: {
                students: true,
              },
            },
          },
        });

        relatedData = { classes: studentClasses, grades: studentGrade };

        break;
      case "exam":
        const examLessons = await prisma.lesson.findMany({
          where: {
            ...(role === "teacher" ? { teacherId: currentUserId } : {}),
          },
          select: {
            id: true,
            name: true,
          },
        });

        relatedData = { lessons: examLessons };

        break;
      default:
        break;
    }

    // console.log(relatedData);
  }
  return (
    <div className="">
      <FormModal
        modalData={{
          table: modalData.table,
          type: modalData.type,
          id: modalData.id,
          data: modalData.data,
        }}
        relatedData={relatedData}
      />
    </div>
  );
}

export default FormContainer;
