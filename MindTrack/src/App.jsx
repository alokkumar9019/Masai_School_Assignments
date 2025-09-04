import { useState, useEffect } from "react"
import DailyCheckIn from "./components/DailyCheckIn"
import Insights from "./components/Insights"
import StreakHeatmap from "./components/StreakHeatMap"
import MentorDashboard from "./components/MentorDashboard"
import Timeline from "./components/TImeline"

export default function App() {
  const [logs, setLogs] = useState(() => JSON.parse(localStorage.getItem("logs")) || [])
  const [mentorMode, setMentorMode] = useState(false)

  useEffect(() => {
    localStorage.setItem("logs", JSON.stringify(logs))
  }, [logs])

  const addLog = log => setLogs([...logs, log])
  const toggleMode = () => setMentorMode(!mentorMode)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">MindTrack</h1>
        <button
          onClick={toggleMode}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {mentorMode ? "Switch to Student" : "Switch to Mentor"}
        </button>
      </div>
      {!mentorMode ? (
        <div className="space-y-6">
          <DailyCheckIn onAdd={addLog} />
          <StreakHeatmap logs={logs} />
          <Insights logs={logs} />
          <Timeline logs={logs} />
        </div>
      ) : (
        <MentorDashboard logs={logs} />
      )}
    </div>
  )
}
