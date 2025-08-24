"use client";
import React, { useState } from "react";
import { useUser } from "@/app/auth/userContext";
import ScreenRecorder from "@/components/ScreenRecorder";

interface Step {
  id: string;
  image?: string;
  description: string;
}

export default function NewTourPage() {
  const [title, setTitle] = useState("");
  const [steps, setSteps] = useState<Step[]>([]);
  const [stepDesc, setStepDesc] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const { user, token } = useUser();

  const addStep = () => {
    if (!stepDesc) return;
    setSteps([
      ...steps,
      { id: Date.now().toString(), image, description: stepDesc },
    ]);
    setStepDesc("");
    setImage(undefined);
  };

  const removeStep = (id: string) => {
    setSteps(steps.filter((s: Step) => s.id !== id));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:4000/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          title,
          steps,
          visibility: 'private', // or allow user to choose
        }),
      });
      if (res.ok) {
        alert('Tour created!');
        setTitle("");
        setSteps([]);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create tour');
      }
    } catch (err) {
      alert('Network error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 dark:from-[#0a0a0a] dark:to-[#171717] p-8 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Create New Product Tour</h1>
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#18181b] rounded-xl shadow-lg p-8 w-full max-w-xl flex flex-col gap-6 border border-gray-100 dark:border-gray-800">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Screen Recorder (optional)</label>
          <ScreenRecorder />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Tour Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#23232a] focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Add Step</label>
          <textarea
            value={stepDesc}
            onChange={e => setStepDesc(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-[#23232a] focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            placeholder="Describe this step..."
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
          <button type="button" onClick={addStep} className="px-4 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">Add Step</button>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-foreground">Steps</h3>
          <ul className="flex flex-col gap-3">
            {steps.map((step: Step, idx: number) => (
              <li key={step.id} className="flex items-center gap-4 bg-gray-50 dark:bg-[#23232a] p-3 rounded">
                <span className="font-bold text-blue-600">{idx + 1}.</span>
                {step.image && <img src={step.image} alt="step" className="w-12 h-12 object-cover rounded" />}
                <span className="flex-1">{step.description}</span>
                <button type="button" onClick={() => removeStep(step.id)} className="text-red-500 hover:underline">Remove</button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="w-full py-2 rounded bg-purple-600 text-white font-semibold hover:bg-purple-700 transition">Create Tour</button>
      </form>
    </div>
  );
}
