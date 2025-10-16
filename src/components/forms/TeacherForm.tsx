"use client";

import { FormModalProps, inputField } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";
import { teachersSchema, TeachersSchema } from "@/lib/formValidationSchemas";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createTeacher, updateTeacher } from "@/lib/actions";
import { useFormState } from "react-dom";
import { CldUploadWidget } from "next-cloudinary";

function TeacherForm({ modalData, relatedData }: FormModalProps) {
  const [state, formAction] = useFormState(
    modalData.type === "create" ? createTeacher : updateTeacher,
    {
      success: false,
      error: false,
    }
  );

  const router = useRouter();

  useEffect(
    function () {
      if (state.success) {
        toast(`Teacher ${modalData.type === "create" ? "created" : "Updated"}`);
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
  } = useForm<TeachersSchema>({
    resolver: zodResolver(teachersSchema),
  });

  const onSubmit = handleSubmit((data) => {
    formAction({ ...data, img: img?.secure_url });
    console.log(data);
  });

  const { subjects } = relatedData;
  // console.log(subjects);

  const [img, setImage] = useState<any>();
  return (
    <form action="" className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">Create a new teacher</h1>
      <span className="text-xs text-gray-400 font-medium">
        Authentication Information
      </span>
      <div className="flex justify-between flex-wrap">
        <InputField
          label="Username"
          name="username"
          type="text"
          register={register}
          defaultValue={modalData.data?.username}
          error={errors?.username}
        />

        <InputField
          label="Email"
          name="email"
          type="email"
          register={register}
          defaultValue={modalData.data?.email}
          error={errors?.email}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          register={register}
          defaultValue={modalData.data?.password}
          error={errors?.password}
        />
      </div>
      <span className="text-xs text-gray-400 medium">Personal Information</span>
      <div className="flex flex-wrap gap-4 justify-between">
        <InputField
          label="First Name"
          name="firstName"
          type="text"
          register={register}
          defaultValue={modalData.data?.name}
          error={errors?.firstName}
        />
        <InputField
          label="Surname"
          name="surname"
          type="text"
          register={register}
          defaultValue={modalData.data?.surname}
          error={errors?.surname}
        />
        <InputField
          label="Phone"
          name="phone"
          type="phone"
          register={register}
          defaultValue={modalData.data?.phone}
          error={errors?.phone}
        />
        <InputField
          label="Address"
          name="address"
          type="text"
          register={register}
          defaultValue={modalData.data?.address}
          error={errors?.address}
        />
        <InputField
          label="Blood Type"
          name="bloodType"
          type="text"
          register={register}
          defaultValue={modalData.data?.bloodType}
          error={errors?.bloodType}
        />
        <InputField
          label="Date of Birth"
          name="birthday"
          type="date"
          register={register}
          defaultValue={modalData.data?.birthday.toISOString().split("T")[0]}
          error={errors?.birthday}
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
          <label className="text-xs text-gray-400">Sex</label>
          <select
            id=""
            className="w-full ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            defaultValue={modalData.data?.sex}
            {...register("sex")}
          >
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          {errors.sex && (
            <p className="text-xs text-red-700">
              {errors.sex.message?.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-400">Subjects</label>
          <select
            multiple
            className="w-full ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            defaultValue={modalData.data?.subjects}
            {...register("subjects")}
          >
            {subjects.map(function (subject: any) {
              return (
                <option
                  value={subject.id}
                  key={subject.id}
                  selected={
                    modalData.data && subject.id === modalData.data.subjectId
                  }
                >
                  {subject.name}
                </option>
              );
            })}
          </select>
          {errors.subjects && (
            <p className="text-xs text-red-700">
              {errors.subjects.message?.toString()}
            </p>
          )}
        </div>

        <CldUploadWidget
          uploadPreset="School"
          onSuccess={(result, { widget }) => {
            setImage(result.info), widget.close();
          }}
        >
          {({ open }) => {
            return (
              <label
                className="text-xs text-gray-400 flex items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <Image src="/upload.png" alt="" width={28} height={28} />
                <span>Upload a photo</span>
              </label>
            );
          }}
        </CldUploadWidget>
      </div>
      <button className="bg-blue-500 py-2 px-4 text-white rounded-md border-none self-center">
        {modalData.type === "create" ? "Create" : " Update"}
      </button>
    </form>
  );
}

export default TeacherForm;
