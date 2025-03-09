'use client';
import React from "react";

interface DateDetailsProps {
  date: string;
  data: any;
}

const DateDetails: React.FC<DateDetailsProps> = ({ date, data }) => {
  return (
    <div className="p-4 border-r border-gray-300 w-1/3">
      <h2 className="text-xl font-bold">Panchang for {date}</h2>
      {data ? (
        <ul className="mt-2">
          <li><strong>Sunrise:</strong> {data.sunrise}</li>
          <li><strong>Sunset:</strong> {data.sunset}</li>
          <li><strong>Tithi:</strong> {data.tithi}</li>
          <li><strong>Nakshatra:</strong> {data.nakshatra}</li>
          <li><strong>Yoga:</strong> {data.yoga}</li>
          <li><strong>Karana:</strong> {data.karana}</li>
          <li><strong>Moon Sign:</strong> {data.moonsign}</li>
          <li><strong>Sun Sign:</strong> {data.sunsign}</li>
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DateDetails;