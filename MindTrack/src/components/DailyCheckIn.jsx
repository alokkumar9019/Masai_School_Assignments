import { useState } from "react"

export default function DailyCheckIn({ onAdd }) {
  const [form, setForm] = useState({
    studyHours: "",
    breakTime: "",
    sleep: "",
    stress: "",
    focus: "",
    reflection: ""
  })

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    onAdd({ ...form, date: new Date().toISOString() })
    setForm({
      studyHours: "",
      breakTime: "",
      sleep: "",
      stress: "",
      focus: "",
      reflection: ""
    })
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded-lg space-y-4">
      <h2 className="text-xl font-semibold">Daily Check-In</h2>
      <div className="grid grid-cols-2 gap-4">
        <input name="studyHours" value={form.studyHours} onChange={handleChange} placeholder="Study Hours" className="border p-2 rounded" />
        <input name="breakTime" value={form.breakTime} onChange={handleChange} placeholder="Break Time (min)" className="border p-2 rounded" />
        <input name="sleep" value={form.sleep} onChange={handleChange} placeholder="Sleep Hours" className="border p-2 rounded" />
        <input name="stress" value={form.stress} onChange={handleChange} placeholder="Stress Level (1-10)" className="border p-2 rounded" />
        <input name="focus" value={form.focus} onChange={handleChange} placeholder="Focus Level (1-10)" className="border p-2 rounded" />
      </div>
      <textarea name="reflection" value={form.reflection} onChange={handleChange} placeholder="Reflection (Markdown supported)" className="w-full border p-2 rounded" />
      <button className="px-4 py-2 bg-green-600 text-white rounded-lg">Save</button>
    </form>
  )
}
