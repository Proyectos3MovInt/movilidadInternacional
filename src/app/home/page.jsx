'use client';

import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  return (
    <div className="w-full h-screen px-16 py-12 bg-sky-100 flex flex-col justify-center items-center gap-8">
      {/* Fila 1: INCOMING y OUTGOING */}
      <div className="flex justify-center items-center gap-6">
        {/* INCOMING */}
        <div
          onClick={() => router.push("/admin-dashboard")}
          className="w-[860px] h-[540px] px-20 py-14 bg-gradient-to-l from-blue-600/0 to-blue-600/70 rounded-lg inline-flex justify-end items-start gap-2.5 cursor-pointer transition-transform hover:scale-105"
          style={{
            backgroundImage: "url('/images/incoming.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
        </div>

        {/* OUTGOING */}
        <div
          onClick={() => router.push("/outgoing")}
          className="w-[820px] h-[540px] px-20 py-14 bg-gradient-to-l from-blue-600/0 to-blue-600/70 rounded-lg inline-flex justify-start items-start gap-2.5 cursor-pointer transition-transform hover:scale-105"
          style={{
            backgroundImage: "url('/images/outgoing.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
        </div>
      </div>

      {/* Fila 2: UNIVERSIDADES y CALENDARIO */}
      <div className="flex justify-center items-center gap-6">
        {/* UNIVERSIDADES */}
        <div
          onClick={() => router.push("/universidades")}
          className="w-[1220px] h-80 px-20 py-8 bg-gradient-to-l from-blue-600/50 to-blue-600/0 rounded-lg inline-flex justify-start items-end cursor-pointer transition-transform hover:scale-105"
          style={{
            backgroundImage: "url('/images/universidades.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </div>

        {/* CALENDARIO */}
        <div
          onClick={() => router.push("/admin-calendar")}
          className="w-[440px] h-80 px-8 py-8 bg-gradient-to-l from-blue-600/70 to-blue-600/0 rounded-lg inline-flex justify-end items-end cursor-pointer transition-transform hover:scale-105"
          style={{
            backgroundImage: "url('/images/calendario.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default Home;
