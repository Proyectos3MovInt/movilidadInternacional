"use client";
import { useState } from "react";
import "./createEventPopup.css";
import { createCalendarEvent } from "@/lib/adminFunctions";

export const CreateEventPopup = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [allDay, setAllDay] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [visibleIncoming, setVisibleIncoming] = useState(true);
  const [visibleOutgoing, setVisibleOutgoing] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let start, end;
  
    if (allDay) {
      start = `${date}T00:00`;
      end = `${date}T23:59`;
    } else {
      start = `${date}T${startTime}`;
      end = `${date}T${endTime}`;
    }
  
    // Crear el objeto del evento
    const newEvent = {
      title,
      date,
      start,
      end,
      allDay,
      visibleIncoming,
      visibleOutgoing,
    };
  
    await createCalendarEvent(newEvent);
  
    // Cerrar popup
    onClose();
  };
  

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Crear Nuevo Evento</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título del Evento</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Fecha del Evento</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {!allDay && (
            <div className="time-inputs">
              <div className="form-group">
                <label>Hora de inicio</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required={!allDay}
                />
              </div>
              <div className="form-group">
                <label>Hora de fin</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required={!allDay}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={allDay}
                onChange={(e) => setAllDay(e.target.checked)}
              />
              Todo el día
            </label>
          </div>

          <div className="visibility-section">
            <label>Visible para:</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={visibleIncoming}
                  onChange={(e) => setVisibleIncoming(e.target.checked)}
                />
                Incoming
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={visibleOutgoing}
                  onChange={(e) => setVisibleOutgoing(e.target.checked)}
                />
                Outgoing
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="save-btn">
              Guardar Evento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
