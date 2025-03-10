"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import Header from "../app/components/Header";
import DateDetails from "../app/components/DateDetails";
import Calendar from "../app/components/Calendar";
import PoojaVratDetails from "../app/components/PoojaVratDetails";
import { fetchDailyPanchangDetail } from "../app/utils/fetchPanchang";
import { PanchangData } from "./types/panchang";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [panchangData, setPanchangData] = useState<PanchangData | null>(null);

  useEffect(() => {
    const getPanchang = async () => {
      const data = await fetchDailyPanchangDetail(selectedDate);
      if (data) {
        setPanchangData(data.data);
      }
    };
    getPanchang();
  }, [selectedDate]);

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row w-full ">
        <div className="w-full md:w-1/3 md:pr-4">
          <DateDetails date={selectedDate} data={panchangData} />
          <PoojaVratDetails items={panchangData?.poojaVratList || []} />
        </div>
        <div className="w-full md:w-2/3 overflow-x-auto">
          <Calendar currentDate={selectedDate} onSelectDate={setSelectedDate} />
        </div>
      </div>
    </>
  );
}
