export interface PoojaVratItem {
  type: 'POOJA' | 'VRAT';
  title: string;
  description: string;
  page_url: string;
}

export interface PanchangData {
  sunrise: string;
  sunset: string;
  tithi: string;
  nakshatra: string;
  yog: string;
  karan: string;
  poojaVratList: PoojaVratItem[];
}

export interface MonthlyPanchangData {
  [day: number]: {
    sunrise: string;
    sunset: string;
    tithi: string;
    nakshatra: string;
  };
}
