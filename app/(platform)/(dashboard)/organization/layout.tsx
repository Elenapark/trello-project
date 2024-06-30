import { Sidebar } from "../_components/Sidebar";

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="pt-20 md:pt-24 px-4 max-w-7xl 2xl:max-w-screen-xl mx-auto">
      <div className="flex gap-x-7">
        <div className="w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
}
