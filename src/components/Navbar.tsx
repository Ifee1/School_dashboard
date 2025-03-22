import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

async function Navbar() {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  return (
    <div className="flex items-center justify-between p-4">
      {/* SEARCH */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <Image src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] bg-transparent outline-none p-2"
        />
      </div>
      {/* ICONS */}
      <div className=" flex items-center gap-6 justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <Image src="/message.png" alt="" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image src="/announcement.png" alt="" width={20} height={20} />
          <div className="absolute -top-3 -right-3 h-4 w-5 flex item-center justify-center text-white bg-purple-500 rounded-full text-xs ">
            2
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium">
            {user?.username}
          </span>
          <span className="text-[10px] text-right text-gray-500">{role}</span>
        </div>
        {/* <Image
          src="/avatar.png"
          alt=""
          width={36}
          height={36}
          className="rounded-full
        /> */}
        <UserButton />
      </div>
    </div>
  );
}

export default Navbar;
