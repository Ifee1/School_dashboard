"use client";

import { FormModalProps, inputField } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { SubjectSchema, subjectSchema } from "@/lib/formValidationSchemas";
import { createSubject, updateSubject } from "@/lib/actions";
import { SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function SubjectForm({ modalData, relatedData }: FormModalProps) {
  // console.log("Subject related Data", relatedData);
  const [state, formAction] = useFormState(
    modalData.type === "create" ? createSubject : updateSubject,
    {
      success: false,
      error: false,
    }
  );

  const router = useRouter();

  useEffect(
    function () {
      if (state.success) {
        toast(`Subject ${modalData.type === "create" ? "created" : "Updated"}`);
        setTimeout(function () {
          modalData.setOpen!(false);
        }, 3000);
        router.refresh();
      }
    },
    [modalData.setOpen, modalData.type, router]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  const onSubmit = handleSubmit((data) => {
    formAction(data);
    console.log(data);
  });

  const { teachers } = relatedData;
  // console.log(teachers);

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
          error={errors?.name}
          defaultValue={modalData?.data?.name}
        />
        {modalData.data && (
          <InputField
            label="id"
            name="id"
            type="text"
            register={register}
            error={errors?.id}
            defaultValue={modalData?.data?.id}
            hidden
          />
        )}
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-400">Teachers</label>
          <select
            id=""
            multiple
            className="w-full ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            defaultValue={modalData.data?.teachers}
            {...register("teachers")}
          >
            {teachers.map(function (teacher: any) {
              return (
                <option value={teacher.id} key={teacher.id}>
                  {teacher.name}
                </option>
              );
            })}
          </select>
          {errors.teachers && (
            <p className="text-xs text-red-700">
              {errors.teachers.message?.toString()}
            </p>
          )}
        </div>
      </div>
      {state.error && (
        <span className="text-red-600">Something went wrong</span>
      )}
      <button className="bg-blue-500 py-2 px-4 text-white rounded-md border-none self-center w-full">
        {modalData.type === "create" ? "Create" : " Update"}
      </button>
    </form>
  );
}

export default SubjectForm;
