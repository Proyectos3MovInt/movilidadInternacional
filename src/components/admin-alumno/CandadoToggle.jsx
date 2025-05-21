"use client";
import { useState } from "react";
import { CandadoIcon } from "@/components/Icons"; 

const CandadoToggle = ({ isLocked, onToggle }) => {
  return (
    <div onClick={onToggle} className="cursor-pointer w-8 h-8">
      <CandadoIcon isLocked={isLocked} />
    </div>
  );
};

export default CandadoToggle;
