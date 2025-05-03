"use client";
import React, { useState } from "react";
import "./createEventPopup.css";

export const CreateEventPopup = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [isAllDay, setIsAllDay] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [visibleIncoming, setVisibleIncoming] = useState(true);
  const [visibleOutgoing, setVisibleOutgoing] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el evento
    console.log({
      title,
      isAllDay,
      startTime,
      endTime,
      visibleIncoming,
      visibleOutgoing,
    });
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
            <label>
              <input
                type="checkbox"
                checked={isAllDay}
                onChange={(e) => setIsAllDay(e.target.checked)}
              />
              Todo el día
            </label>
          </div>

          {!isAllDay && (
            <div className="time-inputs">
              <div className="form-group">
                <label>Hora de inicio</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required={!isAllDay}
                />
              </div>
              <div className="form-group">
                <label>Hora de fin</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required={!isAllDay}
                />
              </div>
            </div>
          )}

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
