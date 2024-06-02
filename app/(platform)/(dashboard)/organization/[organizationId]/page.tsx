import { auth } from "@clerk/nextjs/server";

export default function OrganizationIdPage() {
  const { orgId } = auth();
  return <div>{orgId}</div>;
}
