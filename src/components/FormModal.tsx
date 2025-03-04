"use client";

import { FormModalProps } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
// import TeacherForm from "./forms/TeacherForm";
import dynamic from "next/dynamic";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
  loading: () => <h1>Loading ...</h1>,
});

// For each table, we need a different form. Hence the component below
const forms: {
  [key: string]: (type: "create" | "update", data?: any) => JSX.Element;
} = {
  teacher: (type, data) => (
    <TeacherForm
      modalData={{
        type: type,
        data: data,
        table: "teacher",
      }}
    />
  ),
};

function FormModal({ modalData }: FormModalProps) {
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

  function alwaysClose() {
    setOpen(false);
  }

  const Form = () => {
    return modalData.type === "delete" ? (
      <form action="" className="p-4 flex flex-col gap-4">
        <span className="text-center font-medium">
          Are you sure? All data will be lost in the {modalData.table}'s
          database?
        </span>
        <button className="bg-red-700 py-2 px-4 text-white rounded-md border-none self-center w-max">
          Delete
        </button>
      </form>
    ) : modalData.type === "create" || modalData.type === "update" ? (
      // <TeacherForm
      //   modalData={{
      //     id: 1,
      //     type: "update",
      //     table: "teacher",
      //     data: {},
      //   }}
      // />
      forms[modalData.table](modalData.type, modalData.data)
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
