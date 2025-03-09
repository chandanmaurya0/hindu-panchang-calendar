'use client';
import React, { useState , useEffect} from "react";
import dayjs from "dayjs";
import dynamic  from "next/dynamic";

import Header from "../app/components/Header";
import DateDetails from "../app/components/DateDetails";
import Calendar from "../app/components/Calendar";
import fetchPanchang from "../app/utils/fetchPanchang";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [panchangData, setPanchangData] = useState<any>(null);
  const [location, setLocation] = useState("Delhi, India");

  useEffect(() => {
    const getPanchang = async () => {
      const data = await fetchPanchang();
      setPanchangData(data);
    };
    getPanchang();
  }, [selectedDate, location]);

  return (
    <>
    <Header />
    <div className="flex">
      <DateDetails date={selectedDate} data={panchangData} />
      <div className="flex-grow">
        <Calendar currentDate={selectedDate} onSelectDate={setSelectedDate} panchangData={panchangData} />
      </div>
    </div>
    </>
  );
}
