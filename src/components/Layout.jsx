import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout( user ) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4 overflow-y-auto">
        <Sidebar />
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col">
        <Header user={user} />
        <main className="p-6 overflow-y-auto flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}