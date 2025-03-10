import React from 'react';
import Link from 'next/link';
import '@/app/styles/custom.css'; // Import the custom CSS file

interface PoojaVratItem {
  type: 'POOJA' | 'VRAT';
  title: string;
  description: string;
  page_url: string;
}

interface PoojaVratDetailsProps {
  items: PoojaVratItem[];
}

const PoojaVratDetails: React.FC<PoojaVratDetailsProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-4">Pooja and Vrat</h2>
      <ul className="list-disc pl-5 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            <div>
              <span className="font-semibold">{item.title}</span> - {item.description}
            </div>
            {item.type === 'POOJA' && (
              <Link href={`/pooja/${encodeURIComponent(item.page_url)}`}>
                <button className="relative overflow-hidden bg-orange-500 hover:bg-orange-600 text-white py-1 px-3 rounded text-sm ml-2 shine-button">
                  <span className="relative z-10">Book Now</span>
                  <span className="absolute inset-0 shine-wave"></span>
                </button>
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoojaVratDetails;
