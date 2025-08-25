
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import LogoutButton from "@/components/auth/LogoutButton";
import { useUser } from "@/app/auth/userContext";
import ProtectedRoute from "./ProtectedRoute";

interface Tour {
  id: string;
  title: string;
  steps: number | { id: string; description: string }[];
  visibility: "public" | "private";
  createdAt: string;
  views: number;
}




export default function DashboardPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const { user, token } = useUser();


  useEffect(() => {
    // Use deployed backend in production, localhost in development
    // Always use deployed backend in production, localhost only for local dev
    let backendUrl = 'https://marvedge-backend.onrender.com/api/tours';
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      backendUrl = 'http://localhost:4000/api/tours';
    }
    fetch(backendUrl, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTours(data.map((tour) => ({
            ...tour,
            id: tour.id || tour._id || tour._doc?._id || Math.random().toString(36),
          })));
        } else {
          setTours([]);
        }
      })
      .catch(() => setTours([]));
  }, [token]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-[#0a0a0a] dark:to-[#171717] p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-foreground">Your Product Tours</h1>
          <div className="flex items-center gap-4">
            {user && <span className="text-gray-700 dark:text-gray-200 font-medium">{user.email}</span>}
            <LogoutButton />
          </div>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {tours.map((tour) => (
            <div key={tour.id} className="bg-white dark:bg-[#18181b] rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-800 flex flex-col gap-2">
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg text-foreground">{tour.title}</h2>
                <span className={`px-2 py-1 rounded text-xs font-medium ${tour.visibility === "public" ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-700"}`}>
                  {tour.visibility}
                </span>
              </div>
              <div className="text-gray-500 text-sm mb-1">
                {Array.isArray(tour.steps) ? tour.steps.length : tour.steps} steps
              </div>
              <div className="text-gray-400 text-xs mb-2">Created: {tour.createdAt}</div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 5c-7 0-9 7-9 7s2 7 9 7 9-7 9-7-2-7-9-7zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" stroke="#6366F1" strokeWidth="1.5"/></svg>
                {tour.views} views
              </div>
              <div className="flex gap-2 mt-4">
                <Link href={`/dashboard/tour/${tour.id}`} className="inline-block px-4 py-2 rounded bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition">View/Edit</Link>
                <button
                  onClick={async () => {
                    if (!window.confirm('Are you sure you want to delete this tour?')) return;
                    try {
                      const res = await fetch(`http://localhost:4000/api/tours/${tour.id}`, {
                        method: 'DELETE',
                        headers: {
                          ...(token ? { Authorization: `Bearer ${token}` } : {}),
                        },
                      });
                      if (res.ok) {
                        setTours(tours.filter(t => t.id !== tour.id));
                      } else {
                        const data = await res.json();
                        alert(data.error || 'Failed to delete tour');
                      }
                    } catch (err) {
                        alert('Network error');
                    }
                  }}
                  className="inline-block px-4 py-2 rounded bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/dashboard/tour/new" className="inline-block px-6 py-3 rounded-full bg-purple-600 text-white font-semibold shadow-lg hover:bg-purple-700 transition">+ Create New Tour</Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
