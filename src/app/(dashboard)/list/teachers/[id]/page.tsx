import Image from "next/image";

function SingleTeacherPage() {
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/*LEFT  */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lightColor py-6 px-4 rounded-md flex flex-1 gap-4">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/32976/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600"
                alt=""
                width={144}
                height={144}
                className="rounded-full w-36 h-36 object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Casper Okafor</h1>
              <p className="text-gray-500 text-sm">
                Lorem ipsum dolor, sit amet consectetur.
              </p>
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>O+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>January, 2025</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>
                    casperokafor
                    <br />
                    @gmail.com
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-1/3 flex items-center gap-2 ">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>+234 7844</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARD */}
          <div className="flex justify-between gap-4 flex-wrap flex-1">
            {/* CARD*/}
            <div className="">
              <Image
                src="/singleAttendance.png"
                width={24}
                height={24}
                className="w-6 h-6"
                alt=""
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm "></span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="">Teachers Schedule</div>
      </div>

      {/* RIGHT */}
      <div className="w-full xl:w-1/3">r</div>
    </div>
  );
}

export default SingleTeacherPage;
