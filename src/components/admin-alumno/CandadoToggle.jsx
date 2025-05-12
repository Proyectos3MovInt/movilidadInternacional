"use client";
import { useState } from "react";
import { CandadoIcon } from "@/components/Icons"; 

const CandadoToggle = () => {
  const [locked, setLocked] = useState(true);

  return (
    <div onClick={() => setLocked(!locked)} className="cursor-pointer w-8 h-8">
      <CandadoIcon isLocked={locked} />
    </div>
  );
};

export default CandadoToggle;
