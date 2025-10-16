"use client";

import { FormModalProps } from "@/lib/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  deleteClass,
  deleteExam,
  deleteStudent,
  deleteSubject,
  deleteTeacher,
} from "@/lib/actions";
import ExamForm from "./forms/ExamForm";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading ...</h1>,
});

const StudentForm = dynamic(() => import("./forms/StudentForm"), {
  loading: () => <h1>Loading ...</h1>,
});

const SubjectForm = dynamic(() => import("./forms/SubjectForm"), {
  loading: () => <h1>Loading ...</h1>,
});
const ClassForm = dynamic(() => import("./forms/ClassForm"), {
  loading: () => <h1>Loading ...</h1>,
});

const deleteActionObject = {
  subject: deleteSubject,
  class: deleteClass,
  teacher: deleteTeacher,
  student: deleteStudent,
  exam: deleteExam,
};

// For each table, we need a different form. Hence the component below
const forms: {
  [key: string]: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    type: "create" | "update",
    data?: any,
    relatedData?: any
  ) => JSX.Element;
} = {
  teacher: (setOpen, type, data, relatedData) => (
    <TeacherForm
      modalData={{
        type: type,
        data: data,
        table: "teacher",
        setOpen: setOpen,
      }}
      relatedData={relatedData}
    />
  ),
  student: (setOpen, type, data, relatedData) => (
    <StudentForm
      modalData={{
        type: type,
        data: data,
        table: "student",
        setOpen: setOpen,
      }}
      relatedData={relatedData}
    />
  ),

  subject: (setOpen, type, data, relatedData) => (
    <SubjectForm
      modalData={{
        type: type,
        data: data,
        table: "subject",
        setOpen: setOpen,
      }}
      relatedData={relatedData}
    />
  ),
  class: (setOpen, type, data, relatedData) => (
    <ClassForm
      modalData={{
        type: type,
        data: data,
        table: "subject",
        setOpen: setOpen,
      }}
      relatedData={relatedData}
    />
  ),
  exam: (setOpen, type, data, relatedData) => (
    <ExamForm
      modalData={{
        type: type,
        data: data,
        table: "exam",
        setOpen: setOpen,
      }}
      relatedData={relatedData}
    />
  ),
};

function FormModal({ modalData, relatedData }: FormModalProps) {
  // console.log(relatedData);

  const [open, setOpen] = useState(false);
  const size = modalData.type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    modalData.type === "create"
      ? "bg-normalYellow"
      : modalData.type === "update"
      ? "bg-lightColor"
      : "bg-normalPurple";

  function handleOpen() {
    setOpen(!open);
  }

  const Form = () => {
    // console.log("Form Props", relatedData);
    const [state, formAction] = useFormState(
      deleteActionObject[modalData.table as keyof typeof deleteActionObject],
      {
        success: false,
        error: false,
      }
    );

    const router = useRouter();

    useEffect(
      function () {
        if (state.success) {
          toast(`${modalData.table} deleted`);
          router.refresh();
          setOpen(false);
        }
      },
      [state, router]
    );

    return modalData.type === "delete" && modalData.id ? (
      <form action={formAction} className="p-4 flex flex-col gap-4">
        <input type="text | number" name="id" value={modalData.id} hidden />
        <span className="text-center font-medium">
          Are you sure? Are you sure you want to delete this {modalData.table}
        </span>
        <button className="bg-red-700 py-2 px-4 text-white rounded-md border-none self-center w-max">
          Delete
        </button>
      </form>
    ) : modalData.type === "create" || modalData.type === "update" ? (
      forms[modalData.table](
        setOpen,
        modalData.type,
        modalData.data,
        relatedData
      )
    ) : (
      "Form Not found"
    );
  };

  return (
    <div className="">
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={handleOpen}
      >
        <Image src={`/${modalData.type}.png`} alt="" width={16} height={16} />
      </button>
      {open && (
        <div
          className="w-full h-full absolute top-0 left-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
          // onClick={alwaysClose}
        >
          <div className="bg-white p-4 top-[15rem] sm:top-[15rem] md:top-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />

            <div
              className="absolute cursor-pointer top-4 right-6"
              onClick={handleOpen}
            >
              <Image src="/close.png" alt="" width={16} height={16} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormModal;
