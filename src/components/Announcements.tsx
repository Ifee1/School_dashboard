function Announcements() {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between ">
        <h1 className="font-semibold text-xl">Announcements</h1>
        <span className="text-sm text-gray-400">View all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <div className="bg-lightShadeColor p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="font-medium">Lorem ipsum dolor.</h2>
            <span className="text-xs bg-white px-1 py-1 text-gray-400 rounded-md">
              12th February
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
            possimus at officiis!
          </p>
        </div>
        <div className="bg-lightPurple p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="font-medium">Lorem ipsum dolor.</h2>
            <span className="text-xs bg-white px-1 py-1 text-gray-400 rounded-md">
              12th February
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
            possimus at officiis!
          </p>
        </div>
        <div className="bg-lightYellow p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="font-medium">Lorem ipsum dolor.</h2>
            <span className="text-xs bg-white px-1 py-1 text-gray-400 rounded-md">
              12th February
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum
            possimus at officiis!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Announcements;
