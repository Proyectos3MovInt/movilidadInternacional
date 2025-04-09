"use client";
import { useState, useEffect } from "react";

export default function Dropdown({ solicitudesData, selectedFields, setSelectedFields }) {
    // Para evitar hidratation failed isclient
    const [isClient, setIsClient] = useState(true);
    if (!isClient) return null;


    const [isOpen, setIsOpen] = useState(false);
    const defaultFields = ["nombre", "universidadDestino", "grado", "ano", "notaMedia"];
    const [fields, setFields] = useState([]);


    useEffect(() => {
        if (solicitudesData.length > 0) {
            const newFields = Object.keys(solicitudesData[0]);
            setFields(newFields);
            setSelectedFields(
                Object.fromEntries(newFields.map((field) => [field, defaultFields.includes(field)]))
            );
        }
    }, [solicitudesData, setSelectedFields]);

    const toggleField = (field) => {
        setSelectedFields((prev) => ({
            ...prev,
            [field]: !prev[field],
        }));
    };

    return (
        <div className="relative">
            <button
                type="button"
                className="inline-flex items-center gap-x-1 text-sm font-semibold text-gray-900"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span>Campos</span>
                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute mt-2 w-48 bg-white border rounded-md shadow-lg">
                    <ul className="py-2 text-sm text-gray-700">
                        {fields.map((field, index) => (
                            <li key={index} className="px-4 py-2 flex items-center gap-2 hover:bg-gray-100">
                                <input
                                    type="checkbox"
                                    checked={selectedFields[field] || false}
                                    onChange={() => toggleField(field)}
                                    className="form-checkbox"
                                />
                                <span>{field}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}