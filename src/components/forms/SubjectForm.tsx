"use client";

import { FormModalProps, inputField } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { SubjectInput, subjectSchema } from "@/lib/formValidationSchemas";
import { createSubject } from "@/lib/actions";
import { useActionState } from "react";

function SubjectForm({ modalData }: FormModalProps) {
  //   const [state, formAction, pending] = useActionState(createSubject, {
  //     success: false,
  //     error: false,
  //   });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectInput>({
    resolver: zodResolver(subjectSchema),
  });

  const onSubmit = handleSubmit((data) => {
    // console.log(data)
    createSubject(data);
  });

  return (
    <form action="" className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{`${
        modalData.type === "create"
          ? "Create a new Subject"
          : "Update the Subject"
      }`}</h1>

      <div className="flex justify-between flex-wrap">
        <InputField
          label="Subject Name"
          name="name"
          type="text"
          register={register}
          defaultValue={modalData.data?.name}
          error={errors?.name}
        />
      </div>

      <button className="bg-blue-500 py-2 px-4 text-white rounded-md border-none self-center w-full">
        {modalData.type === "create" ? "Create" : " Update"}
      </button>
    </form>
  );
}

export default SubjectForm;
