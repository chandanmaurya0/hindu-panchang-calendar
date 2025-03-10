import axios from "axios";
import dayjs from "dayjs";

// Function to convert UTC offset string to timezone float
const convertUtcOffsetToTimezone = (utcOffset: string): number => {
  // Handle case when utcOffset is not provided
  if (!utcOffset) return 0;

  // Extract sign, hours, and minutes
  const sign = utcOffset.charAt(0) === "-" ? -1 : 1;
  const hourStart =
    utcOffset.charAt(0) === "+" || utcOffset.charAt(0) === "-" ? 1 : 0;
  const hours = parseInt(utcOffset.substring(hourStart, hourStart + 2));
  const minutes = parseInt(utcOffset.substring(hourStart + 2));

  // Convert to decimal format
  return sign * (hours + minutes / 60);
};

const fetchDailyPanchangDetail = async (selectedDate: string) => {
  try {
    // extract day, month and year from selected date
    const date = dayjs(selectedDate);
    const day = date.date();
    const month = date.month() + 1;
    const year = date.year();

    // get current hour and minutes
    const now = dayjs();
    const hour = now.hour();
    const min = now.minute();

    // get user location detail local storage
    const storedLocation = localStorage.getItem("userLocation");
    const location = storedLocation ? JSON.parse(storedLocation) : null;

    // Calculate timezone from UTC offset
    const tzone =
      location && location.utc_offset
        ? convertUtcOffsetToTimezone(location.utc_offset)
        : 5.5; // Default to India timezone if not available

    // Prepare request data
    const requestData = {
      day,
      month,
      year,
      hour,
      min,
      lat: location?.latitude || 28.6139, // Default to Delhi if not available
      lon: location?.longitude || 77.209, // Default to Delhi if not available
      tzone,
      city: location?.city || "Delhi",
      region: location?.country || "India",
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/panchang/basic-panchang-details`,
      requestData
    );

    const data = response.data;

    // Mock pooja and vrat data if not provided by the API
    if (data.data && !data.data.poojaVratList) {
      data.data.poojaVratList = await generatePoojaVratData(
        day,
        month,
        year,
        location?.city,
        location?.region
      );
    }

    return data;
  } catch (error) {
    console.error("Error fetching Panchang data", error);
    return null;
  }
};

// Helper function to generate mock data until API provides it
async function generatePoojaVratData(
  day: number,
  month: number,
  year: number,
  city: string,
  region: string
) {
  try {
    const reqBody = {
      day,
      month,
      year,
      city,
      region,
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/panchang/pooja-vrat-details`,
      reqBody
    );

    return response.data?.data;
  } catch (error) {
    console.error("Error fetching Pooja Vrat data", error);
    return null;
  }
}

const fetchMonthlyPanchangDetail = async (selectedDate: string) => {
  try {
    // extract month and year from selected date
    const date = dayjs(selectedDate);
    const month = date.month() + 1;
    const year = date.year();

    // get city and region from local storage
    const storedLocation = localStorage.getItem("userLocation");
    const location = storedLocation ? JSON.parse(storedLocation) : null;

    const requestData = {
      month,
      year,
      city: location?.city || "Delhi",
      region: location?.country || "India",
    };

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/panchang/monthly-panchang-details`,
      requestData
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly Panchang data", error);
    return null;
  }
};

export { fetchDailyPanchangDetail, fetchMonthlyPanchangDetail };
