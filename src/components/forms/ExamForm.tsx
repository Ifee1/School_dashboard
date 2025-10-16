"use client";

import { FormModalProps, inputField } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import { examSchema, ExamSchema } from "@/lib/formValidationSchemas";
import { createExam, updateExam } from "@/lib/actions";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function ExamForm({ modalData, relatedData }: FormModalProps) {
  // console.log("Subject related Data", relatedData);
  const [state, formAction] = useFormState(
    modalData.type === "create" ? createExam : updateExam,
    {
      success: false,
      error: false,
    }
  );

  const router = useRouter();

  useEffect(
    function () {
      if (state.success) {
        toast(`Exam ${modalData.type === "create" ? "created" : "Updated"}`);
        setTimeout(function () {
          modalData.setOpen!(false);
        }, 3000);
        router.refresh();
      }
    },
    [modalData.setOpen, modalData.type, router, state.success]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExamSchema>({
    resolver: zodResolver(examSchema),
  });

  const onSubmit = handleSubmit((data) => {
    formAction(data);
    console.log(data);
  });

  const { lessons } = relatedData;
  console.log(lessons);
  // console.log(teachers);

  return (
    <form action="" className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">{`${
        modalData.type === "create" ? "Create a new Exam" : "Update the exam"
      }`}</h1>

      <div className="flex justify-between flex-wrap">
        <InputField
          label="Title"
          name="title"
          type="text"
          register={register}
          error={errors?.title}
          defaultValue={modalData?.data?.title}
        />
        <InputField
          label="Start Time"
          name="startTime"
          type="datetime-local"
          register={register}
          error={errors?.startTime}
          defaultValue={modalData?.data?.startTime}
        />
        <InputField
          label="End Time"
          name="endTime"
          type="datetime-local"
          register={register}
          error={errors?.endTime}
          defaultValue={modalData?.data?.endTime}
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
      </div>
      <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label className="text-xs text-gray-400">Lesson</label>
        <select
          id=""
          className="w-full ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
          defaultValue={modalData.data?.lessons}
          {...register("lessonId")}
        >
          {lessons.map(function (lesson: any) {
            return (
              <option value={lesson.id} key={lesson.id}>
                {lesson.name}
              </option>
            );
          })}
        </select>
        {errors.lessonId && (
          <p className="text-xs text-red-700">
            {errors.lessonId.message?.toString()}
          </p>
        )}
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

export default ExamForm;
