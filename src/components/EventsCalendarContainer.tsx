import Image from "next/image";
import Calendar from "react-calendar";
import EventList from "./EventList";
import EventCalendar from "./EventCalendar";

async function EventsCalendarContainer({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) {
  const { date } = searchParams;
  return (
    <div className="bg-white p-4 rounded-md">
      <EventCalendar />
      {/* <Calendar onChange={onChange} value={value} /> */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold my-8">Events</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <div className="flex flex-col gap-4">
        <EventList dateParam={date} />
      </div>
    </div>
  );
}

export default EventsCalendarContainer;
