export default function Insights({ logs }) {
  if (logs.length < 7) return null;
  const sleepAvg =
    logs.reduce((a, b) => a + Number(b.sleep || 0), 0) / logs.length;
  const breakAvg =
    logs.reduce((a, b) => a + Number(b.breakTime || 0), 0) / logs.length;
  const stressAvg =
    logs.reduce((a, b) => a + Number(b.stress || 0), 0) / logs.length;
  return (
    <div className="p-4 bg-white shadow rounded-lg space-y-2">
      <h2 className="text-xl font-semibold">Insights</h2>
      {sleepAvg >= 8 && <p>You focus better after 8+ hours of sleep.</p>}
      {breakAvg > 30 && stressAvg <= 5 && (
        <p>Longer breaks seem to reduce stress levels.</p>
      )}
      {logs.length >= 7 && (
        <p>Keep up your streak, consistency builds success!</p>
      )}
    </div>
  );
}
