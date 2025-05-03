"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getCalendarEvents } from "@/lib/adminFunctions";
import { CreateEventBtn } from "@/components/admin-calendar/CreateEventBtn";

function MyCalendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Colores para eventos (mejor usar clases completas de Tailwind)
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

      if (!data) {
        throw new Error("No se recibieron datos");
      }

      const formattedEvents = data.map((event, index) => ({
        title: event.title,
        date: event.date,
        className: eventClasses[index % eventClasses.length],
        extendedProps: {
          // Puedes añadir más datos del evento aquí si los necesitas
          rawData: event,
        },
      }));
      console.log(formattedEvents);
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
  }, []);

  const handleDateClick = (arg) => {
    console.log("Fecha clickeada:", arg.dateStr);
    // Puedes implementar creación de eventos aquí
  };

  const handleEventClick = (info) => {
    alert(
      `Evento: ${
        info.event.title
      }\nFecha: ${info.event.start?.toLocaleDateString("es-ES")}`
    );
  };

  const refreshEvents = () => {
    fetchEvents();
  };

  return (
    <div className="p-2 md:p-5 max-w-full md:max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-3 text-gray-600">Cargando eventos...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={refreshEvents}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <button
              onClick={refreshEvents}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded text-sm"
            >
              Actualizar Eventos
            </button>
            <CreateEventBtn></CreateEventBtn>
          </div>

          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={events}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            locale="es"
            height="auto"
            aspectRatio={1.5}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek,dayGridDay",
            }}
            buttonText={{
              today: "Hoy",
              month: "Mes",
              week: "Semana",
              day: "Día",
            }}
            dayHeaderClassNames="bg-gray-100 text-gray-800 font-medium"
            dayCellClassNames="hover:bg-gray-50"
            eventClassNames="cursor-pointer rounded-lg shadow-sm px-2 py-1"
          />
        </>
      )}
    </div>
  );
}

export default MyCalendar;
