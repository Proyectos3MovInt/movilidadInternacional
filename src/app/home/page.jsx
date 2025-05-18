"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="w-full h-screen bg-sky-100 flex flex-col gap-4 md:gap-6 px-4 md:px-16 py-4">
      {/* Fila 1: INCOMING y OUTGOING (ocupa 50%) */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 w-full flex-grow basis-1/2">
      {/* OUTGOING */}
        <div
          onClick={() => router.push("/admin-dashboard")}
          className="w-full md:w-[820px] h-full px-6 md:px-20 py-6 md:py-14 bg-gradient-to-l from-blue-600/0 to-blue-600/70 rounded-lg inline-flex justify-start items-start cursor-pointer transition-transform hover:scale-105"
          style={{
            backgroundImage: "url('/images/outgoing.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }}
        ></div>
        {/* INCOMING */}
        <div
          onClick={() => router.push("/alumnos-incoming")}
          className="w-full md:w-[860px] h-full px-6 md:px-20 py-6 md:py-14 bg-gradient-to-l from-blue-600/0 to-blue-600/70 rounded-lg inline-flex justify-end items-start cursor-pointer transition-transform hover:scale-105"
          style={{
            backgroundImage: "url('/images/incoming.png')",
            backgroundSize: "cover",
            backgroundPosition: "center 20%",
          }}
        ></div>
      </div>

      {/* Fila 2: UNIVERSIDADES y CALENDARIO (ocupa 50%) */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 w-full flex-grow basis-1/2">
        {/* UNIVERSIDADES */}
        <div
          onClick={() => router.push("/universidades")}
          className="w-full md:w-[1220px] h-full px-6 md:px-20 py-6 md:py-8 bg-gradient-to-l from-blue-600/50 to-blue-600/0 rounded-lg inline-flex justify-start items-end cursor-pointer transition-transform hover:scale-105"
          style={{
            backgroundImage: "url('/images/universidades.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* CALENDARIO */}
        <div
          onClick={() => router.push("/admin-calendar")}
          className="w-full md:w-[440px] h-full px-6 md:px-8 py-6 md:py-8 bg-gradient-to-l from-blue-600/70 to-blue-600/0 rounded-lg inline-flex justify-end items-end cursor-pointer transition-transform hover:scale-105"
          style={{
            backgroundImage: "url('/images/calendario.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Home;
