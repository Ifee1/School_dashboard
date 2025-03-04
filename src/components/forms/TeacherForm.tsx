"use client";

import { FormModalProps, inputField } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputField from "../InputField";
import Image from "next/image";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(25, { message: "Username must be 25 characters maximum" }),
  email: z.string().email({ message: "Invalid Email address" }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  bloodType: z.string().min(1, { message: "Blood Type is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  birthday: z.date({ message: "Birthday is required" }),
  sex: z.enum(["male", "female"], { message: "sex is required" }),
  img: z.instanceof(File, { message: "Image is required" }),
});

type Inputs = z.infer<typeof schema>;

function TeacherForm({ modalData }: FormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  // console.log(errors.password);

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    console.log("clicked");
  });
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
          defaultValue={modalData.data?.firstName}
          error={errors?.firstName}
        />
        <InputField
          label="Last Name"
          name="lastName"
          type="text"
          register={register}
          defaultValue={modalData.data?.lastName}
          error={errors?.lastName}
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
          defaultValue={modalData.data?.birthday}
          error={errors?.birthday}
        />

        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-400">Sex</label>
          <select
            id=""
            className="w-full ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm"
            defaultValue={modalData.data?.sex}
            {...register("sex")}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.sex && (
            <p className="text-xs text-red-700">
              {errors.sex.message?.toString()}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
          <label
            className="text-xs text-gray-400 flex items-center gap-2 cursor-pointer"
            htmlFor="img"
          >
            <Image src="/upload.png" alt="" width={28} height={28} />
            <span>Upload a photo</span>
          </label>
          <input
            type="file"
            id="img"
            className="hidden"
            defaultValue={modalData.data?.img}
            {...register("img")}
          />

          {errors.img && (
            <p className="text-xs text-red-700">
              {errors.img.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <button className="bg-blue-500 py-2 px-4 text-white rounded-md border-none self-center">
        {modalData.type === "create" ? "Create" : " Update"}
      </button>
    </form>
  );
}

export default TeacherForm;
