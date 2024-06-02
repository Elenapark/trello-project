import React from "react";
import { Sidebar } from "../_components/Sidebar";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-lime-200 pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto border-2 border-red-400">
      this is OrganizationLayout
      <div className=" bg-orange-500 flex gap-x-7">
        <div className="bg-blue-300 w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </div>
  );
}
