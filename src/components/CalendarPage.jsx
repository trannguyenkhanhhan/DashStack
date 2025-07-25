import React from "react";

const events = [
  {
    name: "Design Conference",
    time: "Today 07:19 AM",
    location: "56 Davion Mission Suite 157, Meaghanberg",
    attending: 15,
    calendarDate: 7,
    color: "bg-purple-500",
  },
  {
    name: "Weekend Festival",
    time: "16 October 2019 at 5:00 PM",
    location: "853 Moore Flats Suite 158, Sweden",
    attending: 20,
    calendarDate: 16,
    color: "bg-pink-600",
  },
  {
    name: "Glastonbury Festival",
    time: "20-22 October 2019 at 8:00 PM",
    location: "646 Walter Road Apt. 571, Turks and Caicos Islands",
    attending: 14,
    calendarDate: 20,
    color: "bg-orange-500",
  },
  {
    name: "Ultra Europe",
    time: "25 October 2019 at 6:00 PM",
    location: "Zagreb, Croatia",
    attending: 30,
    calendarDate: 25,
    color: "bg-blue-600",
  },
];

const CalendarPage = () => {
  return (
    <div className="p-6 bg-[#1e2430] text-white min-h-screen">
      <div className="flex gap-6">
        {/* Left Panel with background */}
        <div className="w-1/3 bg-[#273142] rounded-2xl p-4 shadow-md">
          <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 rounded-xl mb-6">
            + Add New Event
          </button>

          {events.map((event, index) => (
            <div
              key={index}
              className="bg-[#363c4b] rounded-xl p-4 mb-4 space-y-2"
            >
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${event.color}`}></span>
                <h2 className="font-semibold text-lg">{event.name}</h2>
              </div>
              <p className="text-sm text-gray-400">{event.time}</p>
              <p className="text-sm text-gray-400">{event.location}</p>
              <p className="text-sm text-gray-500">
                {event.attending} attending
              </p>
            </div>
          ))}
        </div>

        {/* Right Panel with calendar and background */}
        <div className="w-2/3 bg-[#273142] rounded-2xl p-6 shadow-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">August 2025</h1>
            <div className="space-x-2">
              <button className="px-4 py-1 rounded bg-gray-700">Day</button>
              <button className="px-4 py-1 rounded bg-gray-700">Week</button>
              <button className="px-4 py-1 rounded bg-indigo-500 font-semibold">
                Month
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-sm">
            
            {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-gray-300 py-2"
              >
                {day}
              </div>
            ))}

            
            {Array.from({ length: 1 }, (_, i) => (
              <div key={`empty-${i}`} className="h-24"></div>
            ))}

            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              const event = events.find((e) => e.calendarDate === day);

              return (
                <div
                  key={day}
                  className="h-24 bg-[#363c4b] rounded-lg p-2 border border-[#434a5a] flex flex-col justify-between"
                >
                  <div className="text-sm text-gray-400 text-right">{day}</div>
                  {event && (
                    <div
                      className={`${event.color} text-white text-xs px-2 py-1 rounded mt-auto w-fit`}
                    >
                      {event.name.length > 14
                        ? `${event.name.slice(0, 14)}...`
                        : event.name}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
