import { format, parseISO } from "date-fns"

export default function StreakHeatmap({ logs }) {
  const dates = logs.map(l => format(parseISO(l.date), "yyyy-MM-dd"))
  const streak = dates.length
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold">Streak & Heatmap</h2>
      <p>Current streak: {streak} days</p>
      <div className="grid grid-cols-7 gap-1 mt-2">
        {Array.from({ length: 30 }).map((_, i) => {
          const day = format(new Date(Date.now() - i * 86400000), "yyyy-MM-dd")
          const active = dates.includes(day)
          return (
            <div
              key={i}
              className={`w-6 h-6 ${active ? "bg-green-500" : "bg-gray-200"} rounded`}
            ></div>
          )
        })}
      </div>
    </div>
  )
}
