import PomodoroTimer from "@/components/PomodoroTimer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-100 to-orange-100 flex items-center justify-center p-4">
      <PomodoroTimer />
    </main>
  );
}
