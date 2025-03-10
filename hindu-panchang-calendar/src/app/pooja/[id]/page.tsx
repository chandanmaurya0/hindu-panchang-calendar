'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/app/components/Header';
import Image from 'next/image';

// This would come from an API in a real application
interface PoojaDetails {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  requirements: string[];
  image?: string;
}

export default function PoojaDetailsPage() {
  const { id } = useParams();
  const [poojaDetails, setPoojaDetails] = useState<PoojaDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock API call - in a real app you'd fetch from a backend
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setPoojaDetails({
        id: id as string,
        title: `Satya Narayan Pooja`,
        description: "This is a traditional Hindu ceremony performed to seek blessings and prosperity.",
        price: 1100,
        duration: "2 hours",
        requirements: [
          "Fresh flowers",
          "Fruits",
          "Coconut",
          "Rice"
        ],
        image: "https://static.vecteezy.com/system/resources/previews/002/189/681/non_2x/celebrate-akshaya-tritiya-background-free-vector.jpg"
      });
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Loading pooja details...</p>
        </div>
      </>
    );
  }

  if (!poojaDetails) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-red-500">Pooja not found!</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {poojaDetails.image && (
            <div className="relative h-64 w-full">
              <Image 
                src={poojaDetails.image} 
                alt={poojaDetails.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-orange-600 mb-4">{poojaDetails.title}</h1>
            <p className="text-gray-700 text-lg mb-6">{poojaDetails.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Details</h2>
                <div className="space-y-2">
                  <p><span className="font-medium">Duration:</span> {poojaDetails.duration}</p>
                  <p><span className="font-medium">Price:</span> ₹{poojaDetails.price}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="list-disc pl-5 space-y-1">
                  {poojaDetails.requirements.map((req, index) => (
                    <li key={index} className="text-gray-700">{req}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <button 
              className="bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg text-lg font-semibold transition-colors duration-300 w-full md:w-auto"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
