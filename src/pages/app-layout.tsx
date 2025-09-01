import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { BottomNav } from "@/components/bottom-nav";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-16">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
