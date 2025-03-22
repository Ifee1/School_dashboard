import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/countChartContainer";
import EventsCalendarContainer from "@/components/EventsCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserCard from "@/components/Usercard";

function AdminPage({
  searchParams,
}: {
  searchParams: { [keys: string]: string | undefined };
}) {
  return (
    <div className="p-4 flex flex-col gap-4 md:flex-row">
      {/* LEFT */}
      <div className="w-full lg:w-2/3 flex gap-8 flex-col">
        {/* USER CARD */}
        <div className="flex justify-between gap-4 flex-wrap">
          <UserCard
            userModal={{
              type: "admin",
            }}
          />
          <UserCard
            userModal={{
              type: "teacher",
            }}
          />
          <UserCard
            userModal={{
              type: "parent",
            }}
          />
          <UserCard
            userModal={{
              type: "student",
            }}
          />
        </div>
        {/* MIDDLE CHART */}
        <div className="flex gap-4 flex-col lg:flex-row">
          {/* COUNT CHART */}
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChartContainer />
          </div>
          {/* ATTENDANCE CHART */}
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChartContainer />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
        <EventsCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
}

export default AdminPage;
