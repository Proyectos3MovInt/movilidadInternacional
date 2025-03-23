import React, { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  //constantes para fechas
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();
  
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const daysArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  return (
    <div className="w-80 py-6 bg-white rounded-lg inline-flex flex-col justify-start items-center gap-4 overflow-hidden">
      <div className="self-stretch px-6 inline-flex justify-between items-center">
        <div className="text-center justify-center text-blue-600 text-base font-semibold font-['Montserrat'] leading-normal">
          {`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}
        </div>
        <div className="flex justify-start items-start gap-6">
          <div data-icon="arrow-left" className="w-4 h-4 relative overflow-hidden">
            <div className="w-2.5 h-1.5 left-[10.18px] top-[3px] absolute origin-top-left rotate-90 bg-zinc-400" />
          </div>
          <div data-icon="arrow-left" className="w-4 h-4 relative origin-top-left -rotate-180 overflow-hidden">
            <div className="w-2.5 h-1.5 left-[12px] top-[3px] absolute origin-top-left rotate-90 bg-zinc-400" />
          </div>
        </div>
      </div>
      <div className="w-64 h-0 outline outline-[0.80px] outline-offset-[-0.40px] outline-zinc-400"></div>
      <div className="self-stretch px-6 inline-flex justify-between items-start">
        {["L", "M", "X", "J", "V", "S", "D"].map((day, idx) => (
          <div key={idx} className="w-8 p-1 flex justify-start items-start gap-2.5">
            <div className="flex-1 text-center justify-start text-zinc-400 text-xs font-semibold font-['Montserrat'] leading-none">{day}</div>
          </div>
        ))}
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-4">
        {Array.from({ length: Math.ceil((firstDayOfMonth + daysInMonth) / 7) }).map((_, rowIdx) => (
          <div key={rowIdx} className="self-stretch px-6 inline-flex justify-between items-start">
            {Array.from({ length: 7 }).map((_, colIdx) => {
              const day = rowIdx * 7 + colIdx - firstDayOfMonth + 1;
              if (day < 1 || day > daysInMonth) return <div key={colIdx} className="w-6 h-6" />;
              return (
                <div key={colIdx} className="w-6 h-6 relative">
                  <div
                    onClick={() => handleDateClick(day)}
                    className={`w-6 h-6 left-0 top-0 absolute text-center justify-center text-sm font-normal font-['Montserrat'] uppercase ${
                      day === selectedDate ? 'bg-blue-600 text-white' : day === currentDay ? 'bg-blue-600 text-white' : 'text-slate-900'
                    }`}
                  >
                    {day}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
