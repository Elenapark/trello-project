import NavbarPage from "./_components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarPage />
      {children}
    </div>
  );
}
