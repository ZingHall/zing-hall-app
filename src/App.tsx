import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { ErrorBoundary } from "@/components/error-boundary";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RootLayout from "@/pages/root-layout";
import HomePage from "@/pages/home";
import Providers from "@/components/providers";
import SignInPage from "@/pages/auth/sign-in";
import SignUpPage from "@/pages/auth/sign-up";
import CreatorPage from "@/pages/creator";
import DashboardPage from "./pages/dashboard";
import ProfilePage from "./pages/profile";

function App() {
  const [greetMsg, setGreetMsg] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <Providers>
      <ErrorBoundary>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<HomePage />} />
              <Route path="auth">
                <Route path="signin" element={<SignInPage />} />
                <Route path="signup" element={<SignUpPage />} />
              </Route>
              <Route path="creator/:creatorId" element={<CreatorPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="dashboard" element={<DashboardPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </Providers>
  );
}

export default App;
