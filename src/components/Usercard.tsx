import prisma from "@/lib/prisma";
import { UserCardModalProps } from "@/lib/types";
import Image from "next/image";

async function UserCard({ userModal }: UserCardModalProps) {
  // console.log("UserCard", relatedData);
  const modelMap: Record<typeof userModal.type, any> = {
    admin: prisma.admin,
    teacher: prisma.teacher,
    student: prisma.student,
    parent: prisma.parent,
  };
  const data = await modelMap[userModal.type].count();
  // console.log(data);
  return (
    <div className="rounded-2xl odd:bg-normalPurple even:bg-normalYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2025/2026
        </span>
        <Image src="/more.png" width={20} height={20} alt="" />
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-gray-500 text-sm font-medium">
        {userModal.type}
      </h2>
    </div>
  );
}

export default UserCard;
