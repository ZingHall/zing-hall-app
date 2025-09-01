import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Outlet />
    </div>
  );
}
