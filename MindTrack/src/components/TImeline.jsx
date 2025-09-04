import jsPDF from "jspdf"

export default function Timeline({ logs }) {
  const downloadPDF = () => {
    const doc = new jsPDF()
    logs.forEach((log, i) => {
      doc.text(
        `${i + 1}. ${new Date(log.date).toLocaleDateString()} - Study: ${log.studyHours}h, Sleep: ${log.sleep}h, Reflection: ${log.reflection}`,
        10,
        10 + i * 10
      )
    })
    doc.save("MindTrack_Journal.pdf")
  }

  return (
    <div className="p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold">Timeline</h2>
      <div className="space-y-2 mt-4">
        {logs.map((log, i) => (
          <div key={i} className="border p-3 rounded">
            <p>{new Date(log.date).toLocaleDateString()}</p>
            <p>Study Hours: {log.studyHours}</p>
            <p>Reflection: {log.reflection}</p>
          </div>
        ))}
      </div>
      <button onClick={downloadPDF} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg">
        Download PDF
      </button>
    </div>
  )
}
