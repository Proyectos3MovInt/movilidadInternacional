"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getCalendarEvents } from "@/lib/adminFunctions";

function MiniCalendar({ showIncoming = false, showOutgoing = false }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const eventClasses = [
    "bg-blue-500 hover:bg-blue-600 text-white",
    "bg-green-500 hover:bg-green-600 text-white",
    "bg-purple-500 hover:bg-purple-600 text-white",
    "bg-red-500 hover:bg-red-600 text-white",
    "bg-yellow-500 hover:bg-yellow-600 text-gray-800",
    "bg-indigo-500 hover:bg-indigo-600 text-white",
  ];

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCalendarEvents();
      if (!data) throw new Error("No se recibieron datos");

      const filteredData = data.filter((event) => {
        if (showIncoming && event.visibleIncoming) return true;
        if (showOutgoing && event.visibleOutgoing) return true;
        return false;
      });

      const formattedEvents = filteredData.map((event, index) => ({
        title: event.title,
        date: event.date,
        className: eventClasses[index % eventClasses.length],
        extendedProps: {
          rawData: event,
        },
      }));

      setEvents(formattedEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
      setError("Error al cargar los eventos. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [showIncoming, showOutgoing]);

  const handleDateClick = (arg) => {
    console.log("Fecha clickeada:", arg.dateStr);
  };

  const handleEventClick = (info) => {
    alert(
      `Evento: ${info.event.title}\nFecha: ${info.event.start?.toLocaleDateString("es-ES")}`
    );
  };

  return (
    <div className="p-2 max-w-sm mx-auto bg-white rounded shadow">
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">Cargando...</p>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-red-500 text-sm mb-2">{error}</p>
          <button
            onClick={fetchEvents}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          locale="es"
          height={400}
          aspectRatio={0.8}
          headerToolbar={{
            left: "",
            center: "title",
            right: "",
          }}
          titleFormat={{ year: "numeric", month: "long" }}
          dayHeaderClassNames="bg-blue-600 text-white text-xs uppercase font-medium"
          dayCellClassNames="hover:bg-gray-50 text-xs"
          eventClassNames="cursor-pointer rounded-sm shadow-sm px-1 py-0.5 text-xs"
        />
      )}
    </div>
  );
}

export default MiniCalendar;
