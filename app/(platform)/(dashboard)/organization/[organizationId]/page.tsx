import { OrganizationSwitcher } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default function OrganizationIdPage() {
  const { orgId } = auth();
  return (
    <>
      <div>
        <OrganizationSwitcher hidePersonal />
      </div>
    </>
  );
}
