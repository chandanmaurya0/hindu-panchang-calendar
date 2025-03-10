'use client';
import React from "react";
import dayjs from "dayjs";
import { PanchangData } from "../types/panchang";

interface DateDetailsProps {
  date: string;
  data: PanchangData | null;
}

const DateDetails: React.FC<DateDetailsProps> = ({ date, data }) => {

  // Helper function to format time strings
  const formatTime = (timeString: string) => {
       
    // Check if the string has a valid format
    if (typeof timeString === 'string') {
      // For format like "18:40:47"
      if (timeString.includes(':')) {
        // Create a dummy date with today's date and the time from the string
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        const dateObj = new Date();
        dateObj.setHours(hours);
        dateObj.setMinutes(minutes);
        dateObj.setSeconds(seconds || 0);
        
        return dayjs(dateObj).format('h:mm A');
      }
    }
    
    // Return the original if we can't parse it
    return timeString;
  };


  // Format date string from YYYY-MM-DD to "Day, Month DD YYYY"
const formatDate = (dateString: string) => {
  return dayjs(dateString).format('ddd, MMMM D YYYY');
};

  return (
    <div className="p-4 border-b shadow rounded-lg mb-4 border-gray-200">
      <h2 className="text-xl font-bold">Panchang for <span className="font-bold">{formatDate(date)}</span> </h2>
      {data ? (
        <ul className="mt-2">
            <li><strong>Sunrise:</strong> {formatTime(data.sunrise)}</li>
            <li><strong>Sunset:</strong> {formatTime(data.sunset)}</li>
          <li><strong>Tithi:</strong> {data.tithi}</li>
          <li><strong>Nakshatra:</strong> {data.nakshatra}</li>
          <li><strong>Yog:</strong> {data.yog}</li>
          <li><strong>Karan:</strong> {data.karan}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DateDetails;