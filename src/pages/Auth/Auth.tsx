import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import { useMe } from "@/hooks/useMe";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  const { data: user } = useMe();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <main className="flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-semibold">FrontRow</h1>
        <section className="rounded-lg border p-6 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === "login"
                ? "Sign in to continue to your account."
                : "Enter your details to get started."}
            </p>
          </div>
          {mode === "login" ? (
            <Login onSwitchToRegister={() => setMode("register")} />
          ) : (
            <Register onSwitchToLogin={() => setMode("login")} />
          )}
        </section>
      </div>
    </main>
  );
};

export default Auth;
