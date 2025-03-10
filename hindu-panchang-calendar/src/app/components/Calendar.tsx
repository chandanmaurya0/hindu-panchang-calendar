"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { MonthlyPanchangData } from "../types/panchang";

import getUserLocation from "../utils/getUserLocation";

import { fetchMonthlyPanchangDetail } from "../utils/fetchPanchang";

interface CalendarProps {
  currentDate: string;
  onSelectDate: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  onSelectDate,
}) => {
  const [location, setLocation] = useState(""); // Add state for user location
  const [calendarDays, setCalendarDays] = useState<string[][]>([]);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [monthlyPanchangData, setMonthlyPanchangData] = useState<MonthlyPanchangData | null>(null);

  console.log("Monthly Panchang Data", monthlyPanchangData);

  // Generate calendar days for the selected month
  useEffect(() => {
    const date = dayjs(currentDate);
    const firstDayOfMonth = date.startOf("month");
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
  }, []);

  // Fetch monthly panchang data for the selected month
  useEffect(() => {
    // Fetch monthly panchang data
    const getMonthlyPanchang = async () => {

      const response = await fetchMonthlyPanchangDetail(currentDate);

      if (response) {
        setMonthlyPanchangData(response.data);
      }
    };

    getMonthlyPanchang();
  }, [currentDate]);

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


  // Render day cell content
  const renderDayContent = (dateStr: string) => {
    if (!dateStr) return null;

    const day = dayjs(dateStr).date();
    const dayData = monthlyPanchangData?.[day];

    return (
      <div className="h-full p-2 flex flex-col justify-center">
        <div className="text-center font-semibold text-[#781e00] text-lg mb-1">{day}</div>
        
        {dayData && (
          <div className="flex justify-between text-[10px] mt-1">
            <div>🌅 {dayData.sunrise}</div>
            <div>🌇 {dayData.sunset}</div>
          </div>
        )}
        
        {dayData?.tithi && (
          <div className="text-[10px] mt-1 text-center">✨ {dayData.tithi}</div>
        )}
        
        {dayData?.nakshatra && (
          <div className="text-[10px] text-center">🌙 {dayData.nakshatra}</div>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-container  flex flex-col">
      {/* Add location input and date picker */}
      <div className="px-4 py-2 flex flex-wrap items-center gap-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Your location"
          value={location}
          disabled
          className="border border-gray-300 rounded p-2 min-w-[200px] bg-gray-50 cursor-not-allowed"
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
        <button
          onClick={goToPrevMonth}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          Prev
        </button>
        <div className="text-lg font-bold">
          {dayjs(currentDate).format("MMMM YYYY")}
        </div>
        <button
          onClick={goToNextMonth}
          className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50"
        >
          Next
        </button>
      </div>

      {/* Calendar grid with horizontal scroll on mobile */}
      <div className="overflow-x-auto">
        <div className="flex flex-1 min-w-[800px]">
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
                      className={`flex-1 border border-gray-200
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
    </div>
  );
};

export default Calendar;
