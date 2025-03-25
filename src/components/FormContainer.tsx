import { FormModalProps } from "@/lib/types";
import FormModal from "./FormModal";
import prisma from "@/lib/prisma";

async function FormContainer({ modalData }: FormModalProps) {
  let relatedData = {};

  if (modalData.type !== "delete") {
    switch (modalData.table) {
      case "subject":
        const subjectTeachers = await prisma.teacher.findMany({
          select: { id: true, name: true, surname: true },
        });
        relatedData = {
          teachers: subjectTeachers,
        };
        break;
      default:
        break;
    }
    // console.log(relatedData);
    // console.log(modalData.relatedData);
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
