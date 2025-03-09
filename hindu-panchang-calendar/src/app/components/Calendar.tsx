"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import getUserLocation from "../utils/getUserLocation";

interface CalendarProps {
  currentDate: string;
  onSelectDate: (date: string) => void;
  panchangData?: any;
}

const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  onSelectDate,
  panchangData,
}) => {
  const [location, setLocation] = useState(""); // Add state for user location
  const [calendarDays, setCalendarDays] = useState<string[][]>([]);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate calendar days for the selected month
  useEffect(() => {
    const date = dayjs(currentDate);
    const firstDayOfMonth = date.startOf("month");
    const lastDayOfMonth = date.endOf("month");
    const daysInMonth = date.daysInMonth();

    // Get the day of week for the first day (0-6, where 0 is Sunday)
    const firstDayWeekday = firstDayOfMonth.day();

    // Create a 2D array for the calendar weeks
    const days: string[][] = [];
    let week: string[] = Array(7).fill("");

    // Fill in empty days before the first day of the month
    for (let i = 0; i < firstDayWeekday; i++) {
      week[i] = "";
    }

    // Fill in the days of the month
    let currentDay = 1;
    for (let i = firstDayWeekday; i < 7; i++) {
      if (currentDay <= daysInMonth) {
        const dayDate = firstDayOfMonth.date(currentDay);
        week[i] = dayDate.format("YYYY-MM-DD");
        currentDay++;
      }
    }
    days.push(week);

    // Fill in the remaining weeks
    while (currentDay <= daysInMonth) {
      week = Array(7).fill("");
      for (let i = 0; i < 7; i++) {
        if (currentDay <= daysInMonth) {
          const dayDate = firstDayOfMonth.date(currentDay);
          week[i] = dayDate.format("YYYY-MM-DD");
          currentDay++;
        } else {
          break;
        }
      }
      days.push(week);
    }

    setCalendarDays(days);
  }, [currentDate]);

  // Fetch user location on component mount and store it in localstorage with timestamp fetch after 1 minute
  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    const storedTimestamp = localStorage.getItem("locationTimestamp");

    if (storedLocation && storedTimestamp) {
      const timestamp = parseInt(storedTimestamp);
      const isExpired = Date.now() - timestamp > 60000; // 1 minute

      if (!isExpired) {
        const location_detail = JSON.parse(storedLocation);
        setLocation(`${location_detail.city}, ${location_detail.region}`);
        return;
      }
    }

    getUserLocation().then((location_detail) => {
      if (location_detail) {
        setLocation(`${location_detail.city}, ${location_detail.region}`);
        localStorage.setItem("userLocation", JSON.stringify(location_detail));
        localStorage.setItem("locationTimestamp", Date.now().toString());
      }
    });
  }
  , []);

  // Navigate to previous month
  const goToPrevMonth = () => {
    const prevMonth = dayjs(currentDate)
      .subtract(1, "month")
      .format("YYYY-MM-DD");
    onSelectDate(prevMonth);
  };

  // Navigate to next month
  const goToNextMonth = () => {
    const nextMonth = dayjs(currentDate).add(1, "month").format("YYYY-MM-DD");
    onSelectDate(nextMonth);
  };

  // Navigate to today
  const goToToday = () => {
    onSelectDate(dayjs().format("YYYY-MM-DD"));
  };

  // Render day cell content
  const renderDayContent = (dateStr: string) => {
    if (!dateStr) return null;

    const dayData = panchangData?.[dateStr];
    const day = dayjs(dateStr).date();

    return (
      <div className="h-full p-2">
        <div className="text-right font-semibold">{day}</div>
        {dayData ? (
          <div className="text-xs mt-1">
            <div>🌅 {dayData.sunrise}</div>
            <div>🌇 {dayData.sunset}</div>
            <div>
              ✨{" "}
              {typeof dayData.tithi === "object"
                ? dayData.tithi.name
                : dayData.tithi}
            </div>
            <div className="mt-1">📅 Additional info here</div>
            <div>🌙 More details can go here</div>
            <div>⭐ And even more here</div>
          </div>
        ) : (
          <div className="text-xs mt-1">
            <div>🌅 06:43 AM</div>
            <div>🌇 06:36 PM</div>
            <div>✨ Navami</div>
            {/* <div className="mt-1">📅 Additional placeholder info</div>
            <div>🌙 More placeholder details</div>
            <div>⭐ Even more placeholder content</div> */}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-container h-[600px] flex flex-col">
      {/* Add location input and date picker */}
      <div className="px-4 py-2 flex flex-wrap items-center gap-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Enter location (city, state)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 rounded p-2 min-w-[200px]"
        />
        <input
          type="date"
          value={currentDate}
          onChange={(e) => onSelectDate(e.target.value)}
          className="border border-gray-300 rounded p-2"
        />
      </div>
      
      {/* Calendar header with navigation */}
      <div className="flex items-center justify-between mb-4 p-2 bg-gray-100">
        <div className="flex space-x-2">
          <button
            onClick={goToPrevMonth}
            className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            Prev
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            Today
          </button>
          <button
            onClick={goToNextMonth}
            className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="text-lg font-bold">
          {dayjs(currentDate).format("MMMM YYYY")}
        </div>
        <div></div> {/* Empty div for flex alignment */}
      </div>

      {/* Calendar grid with vertical weekdays */}
      <div className="flex flex-1 ">
        {/* Weekdays column */}
        <div className="flex flex-col w-16 border border-gray-300">
          {weekdays.map((day) => (
            <div
              key={day}
              className="h-[calc(100%/7)] min-h-[100px] flex items-center justify-center font-semibold bg-gray-50"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="flex-1 grid grid-cols-1 grid-rows-7 h-full">
          {weekdays.map((_, rowIndex) => (
            <div key={rowIndex} className="flex min-h-[100px]">
              {calendarDays.map((week, colIndex) => {
                const dateStr = week[rowIndex] || "";
                const isToday = dateStr === dayjs().format("YYYY-MM-DD");
                const isSelected = dateStr === currentDate;

                return (
                  <div
                    key={`${rowIndex}-${colIndex}`}
                    className={`flex-1 border border-gray-200 overflow-y-auto 
                      ${dateStr ? "cursor-pointer hover:bg-gray-50" : ""} 
                      ${isToday ? "bg-blue-50" : ""} 
                      ${isSelected ? "ring-2 ring-blue-500 ring-inset" : ""}`}
                    onClick={() => dateStr && onSelectDate(dateStr)}
                  >
                    {renderDayContent(dateStr)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
