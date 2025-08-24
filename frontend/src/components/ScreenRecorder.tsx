"use client";
import { useRef, useState } from "react";

export default function ScreenRecorder() {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<BlobPart[]>([]);

  const startRecording = async () => {
    const stream = await (navigator.mediaDevices as any).getDisplayMedia({ video: true });
    mediaRecorder.current = new MediaRecorder(stream);
    chunks.current = [];
    mediaRecorder.current.ondataavailable = e => chunks.current.push(e.data);
    mediaRecorder.current.onstop = () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });
      setVideoURL(URL.createObjectURL(blob));
    };
    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        {!recording ? (
          <button onClick={startRecording} className="px-4 py-2 bg-blue-600 text-white rounded">Start Screen Recording</button>
        ) : (
          <button onClick={stopRecording} className="px-4 py-2 bg-red-600 text-white rounded">Stop Recording</button>
        )}
      </div>
      {videoURL && (
        <video src={videoURL} controls className="w-full max-w-md rounded shadow" />
      )}
    </div>
  );
}
