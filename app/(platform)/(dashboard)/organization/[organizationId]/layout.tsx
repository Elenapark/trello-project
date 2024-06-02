import React from "react";
import { OrgControl } from "./_components/org-control";

export default function OrganizationIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <OrgControl />
      <div>
        this is Organization **Id** Layout
        {children}
      </div>
    </div>
  );
}
