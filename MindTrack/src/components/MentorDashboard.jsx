export default function MentorDashboard({ logs }) {
  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold">Mentor Dashboard</h2>
      <div className="space-y-3 mt-4">
        {logs.map((log, i) => (
          <div key={i} className="border p-3 rounded">
            <p><strong>Date:</strong> {new Date(log.date).toLocaleDateString()}</p>
            <p><strong>Study Hours:</strong> {log.studyHours}</p>
            <p><strong>Reflection:</strong> {log.reflection}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
