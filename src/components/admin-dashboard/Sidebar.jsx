"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getAdminName } from "@/lib/adminFunctions";

const Sidebar = ({ setFiltroAño }) => {
  const [adminName, setAdminName] = useState("Nombre del Admin");

  useEffect(() => {
    const adminNameGetter = async () => {
      const admin_name = await getAdminName();
      setAdminName(admin_name);
    }
      adminNameGetter();
  }, []);

  return (
    <div className="w-1/5 bg-gray-200 p-6">
      <div className="mb-6 text-center">
        <div className="h-16 w-16 bg-gray-400 rounded-full mx-auto"></div>
        <p className="mt-2 font-semibold">{adminName}</p>
      </div>
      <nav>
        <ul className="space-y-4">
          <li className="bg-gray-300 p-3 rounded">Solicitudes</li>
          <li className="p-3">Incidencias</li>
          <li className="p-3">Universidades</li>
          <li className="p-3">Histórico</li>
          <ul className="pl-4 mt-2 space-y-1">
            <li>
              <Button onClick={() => setFiltroAño(null)} className="p-2 w-full text-center border rounded">
                Ver Todos
              </Button>
            </li>
            {[2025, 2024, 2023].map((year) => (
              <li key={year}>
                <Button onClick={() => setFiltroAño(year)} className="p-2 w-full text-center border rounded">
                  {year}
                </Button>
              </li>
            ))}
          </ul>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
