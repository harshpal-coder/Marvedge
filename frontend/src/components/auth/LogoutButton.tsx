"use client";
import { useUser } from "@/app/auth/userContext";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const { logout, user } = useUser();
  const router = useRouter();

  if (!user) return null;

  return (
    <button
      onClick={() => {
        logout();
        router.push("/");
      }}
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 font-medium"
    >
      Logout
    </button>
  );
}
