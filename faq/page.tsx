"use client";

import { FaPlus } from "react-icons/fa6";
import Navbar from "@/components/Navbar"; // Make sure path is correct

export default function Faqs() {
  return (
    <>
      <Navbar />

      <div className="max-w-screen-xl mx-auto mt-16 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-[48px] text-[#333333] font-bold mb-4">
          Questions Looks Here
        </h1>

        <p className="text-[16px] font-normal mb-8 text-[#4F4F4F]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 mb-24 text-left">
          <div>
            {[
              "What types of chairs do you offer?",
              "Do your chairs come with a warranty?",
              "Can I try a chair before purchasing?",
            ].map((q, index) => (
              <div key={index} className="bg-[#F7F7F7] p-6 rounded-lg mb-6">
                <h3 className="text-[18px] pt-4 font-bold flex justify-between items-start">
                  {q}
                  <FaPlus />
                </h3>
                <p className="mt-4 text-[16px] font-bold text-[#4F4F4F]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  quis modi ullam amet debitis libero veritatis enim repellat
                  optio natus eum delectus deserunt, odit expedita eos molestiae
                  ipsa totam quidem?
                </p>
              </div>
            ))}
          </div>

          <div>
            {[
              "How can we get in touch with you?",
              "What will be delivered? And When?",
              "How do I clean and maintain my Comforty chair?",
            ].map((q, index) => (
              <div key={index} className="bg-[#F7F7F7] p-6 rounded-lg mb-6">
                <h3 className="text-[18px] pt-4 font-bold flex justify-between items-start">
                  {q}
                  <FaPlus />
                </h3>
                <p className="mt-4 text-[16px] font-bold text-[#4F4F4F]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                  quis modi ullam amet debitis libero veritatis enim repellat
                  optio natus eum delectus deserunt, odit expedita eos molestiae
                  ipsa totam quidem?
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
