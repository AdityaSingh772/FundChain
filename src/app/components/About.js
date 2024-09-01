import Image from 'next/image';
import React from 'react';

export default function About() {
  return (
    <div className="h-[190vh] w-[100vw] flex flex-col font-roboto items-center">
      {/* Image and text container */}
      <div className="h-[90vh] w-full flex">
        {/* Image container */}
        <div className="w-1/2 h-full flex justify-center items-center">
            <Image src="/bg1.jpg" // 
            alt="Background Image"
            // height={500}
            // width={500}
            width={850}
            height={850}
            objectFit="cover"/>
        </div>

        {/* Text container */}
        <div className="w-1/2 flex flex-col justify-center items-start p-8">
            <div className="flex flex-1 flex-col justify-center items-center gap-5 px-4">
        <p className="text-5xl md:text-5xl font-bold text-pretty text-slate-600">
        Decentralized Crowdfunding Platform for Startups
        </p>
        <p className="text-xl md:text-3xl font-medium text-pretty text-slate-400">
        Our decentralized crowdfunding platform empowers startups by leveraging blockchain technology to offer secure, transparent, and innovative fundraising solutions. Built to foster trust and engagement, the platform provides a seamless experience for both startups and backers. 
        </p>
        </div>
        </div>
      </div>

      {/* Another image section */}
      <div className="h-[100vh] w-full flex items-center justify-center bg-gray-200">
        <img
          src="/additional-image-source.jpg" // Replace with the actual image path from the 'public' folder
          alt="Additional explanation"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
