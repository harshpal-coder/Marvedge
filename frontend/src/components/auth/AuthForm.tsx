"use client";
import { useState } from "react";
import { useUser } from "@/app/auth/userContext";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  mode: "login" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser, setToken } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:4000/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      console.log("API response:", data);
      setLoading(false);
      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        if (data.token) setToken(data.token);
        if (data.user) setUser(data.user);
        router.push("/dashboard");
      }
    } catch (err) {
      setLoading(false);
      setError("Network error");
      console.error("Auth error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#18181b] rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6 border border-gray-100 dark:border-gray-800"
    >
      <h2 className="text-2xl font-bold text-center text-foreground mb-2">
        {mode === "login" ? "Sign In" : "Sign Up"}
      </h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#23232a] focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#23232a] focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm text-center">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Sign Up"}
      </button>
      <div className="text-center text-sm text-gray-500 mt-2">
        {mode === "login" ? (
          <>
            Don't have an account? <a href="/auth/signup" className="text-blue-600 hover:underline">Sign Up</a>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={e => {
                e.preventDefault();
                router.push('/auth/login');
              }}
            >
              Sign In
            </span>
          </>
        )}
      </div>
    </form>
  );
}
