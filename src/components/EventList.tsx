import prisma from "@/lib/prisma";

async function EventList({ dateParam }: { dateParam: string | undefined }) {
  const date = dateParam ? new Date(dateParam) : new Date();
  //   console.log(date);
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });
  return (
    <div className="">
      {data.map(function (event) {
        return (
          <div
            className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lightColor even:border-t-normalPurple
           "
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-xs text-gray-300">
                {event.startTime.toLocaleTimeString("en-Us", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
              sequi maiores delectus earum quam nulla!
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default EventList;
