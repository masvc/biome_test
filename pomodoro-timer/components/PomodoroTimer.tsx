"use client";

import { useCallback, useEffect, useState } from "react";

type TimerMode = "work" | "break";

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>("work");
  const [sessions, setSessions] = useState(0);

  const workDuration = 25 * 60;
  const breakDuration = 5 * 60;

  const playNotificationSound = useCallback(() => {
    const audio = new Audio("/notification.mp3");
    audio.play().catch(() => {
      // 音声再生失敗時は無視
    });
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            playNotificationSound();
            if (mode === "work") {
              setSessions((prev) => prev + 1);
              setMode("break");
              setMinutes(5);
            } else {
              setMode("work");
              setMinutes(25);
            }
            setIsActive(false);
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prev) => prev - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, mode, playNotificationSound]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === "work") {
      setMinutes(25);
    } else {
      setMinutes(5);
    }
    setSeconds(0);
  };

  const switchMode = () => {
    setIsActive(false);
    if (mode === "work") {
      setMode("break");
      setMinutes(5);
    } else {
      setMode("work");
      setMinutes(25);
    }
    setSeconds(0);
  };

  const progress =
    mode === "work"
      ? ((workDuration - (minutes * 60 + seconds)) / workDuration) * 100
      : ((breakDuration - (minutes * 60 + seconds)) / breakDuration) * 100;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-md w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🍅 ポモドーロタイマー
        </h1>
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={switchMode}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              mode === "work"
                ? "bg-rose-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            作業
          </button>
          <button
            type="button"
            onClick={switchMode}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              mode === "break"
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            休憩
          </button>
        </div>
      </div>
      <div className="relative mb-8">
        <svg
          className="w-full h-64"
          viewBox="0 0 200 200"
          role="img"
          aria-label="ポモドーロタイマーの進捗"
        >
          <title>タイマー進捗表示</title>
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke={mode === "work" ? "#f43f5e" : "#10b981"}
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
            transform="rotate(-90 100 100)"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-bold text-gray-800">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
            <div className="text-sm text-gray-500 mt-2">
              {mode === "work" ? "集中タイム" : "休憩タイム"}
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={toggleTimer}
          className={`flex-1 py-4 rounded-xl font-semibold text-white transition-all transform hover:scale-105 ${
            isActive
              ? "bg-yellow-500 hover:bg-yellow-600"
              : mode === "work"
                ? "bg-rose-500 hover:bg-rose-600"
                : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isActive ? "⏸️ 一時停止" : "▶️ スタート"}
        </button>
        <button
          type="button"
          onClick={resetTimer}
          className="px-6 py-4 rounded-xl font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 transition-all transform hover:scale-105"
        >
          🔄 リセット
        </button>
      </div>
      <div className="text-center p-4 bg-gray-50 rounded-xl">
        <div className="text-sm text-gray-600 mb-1">完了セッション</div>
        <div className="text-3xl font-bold text-rose-500">{sessions}</div>
      </div>
    </div>
  );
}
