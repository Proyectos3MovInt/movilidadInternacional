"use client";

import MyCalendar from "@/utils/calendario/MyCalendar";
import MenuSuperior from "@/components/admin-dashboard/MenuSuperior";

export default function AdminCalendar() {
    return (
        <div className="flex flex-col items-center w-full bg-white min-h-screen">
            <MenuSuperior />
            <MyCalendar />
        </div>
    );
}