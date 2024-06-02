import { OrgControl } from "./_components/org-control";

export default function OrganizationIdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <OrgControl />
      <div>{children}</div>
    </div>
  );
}
