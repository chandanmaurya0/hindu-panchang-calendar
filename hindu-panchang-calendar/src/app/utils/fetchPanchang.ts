import axios from "axios";

const fetchPanchang = async () => {
  try {
    // const response = await axios.get(`/api/panchang?date=${date}&location=${location}`);
    let sample_data = {
      date: "2025-03-08",
      location: "Aurangabad, India",
      sunrise: "06:43 AM",
      sunset: "06:36 PM",
      moonrise: "01:17 PM",
      moonset: "03:18 AM, Mar 09",
      shaka_samvat: "1946 Krodhi",
      vikram_samvat: "2081 Pingala",
      gujarati_samvat: "2081 Nala",
      amanta_month: "Phalguna",
      purnimanta_month: "Phalguna",
      weekday: "Shaniwara",
      paksha: "Shukla Paksha",
      tithi: "Navami",
      nakshatra: "Ardra",
      yoga: "Ayushmana",
      karana: "Kaulava",
      pravishte_gate: 25,
      sunsign: "Kumbha",
      moonsign: "Mithuna",
    };
    return sample_data;
  } catch (error) {
    console.error("Error fetching Panchang data", error);
    return null;
  }
};

export default fetchPanchang;
