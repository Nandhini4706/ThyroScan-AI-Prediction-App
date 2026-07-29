export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-slate-800">
        Welcome to ThyroScan AI 👋
      </h1>

      <p className="text-slate-500 mt-2">
        Your personalized thyroid health dashboard.
      </p>

      <div className="grid md:grid-cols-4 gap-6 mt-10">
        <div className="rounded-2xl bg-white shadow p-6">
          <h3 className="font-semibold">Last Assessment</h3>
          <p className="text-3xl mt-3">--</p>
        </div>

        <div className="rounded-2xl bg-white shadow p-6">
          <h3 className="font-semibold">Reports</h3>
          <p className="text-3xl mt-3">0</p>
        </div>

        <div className="rounded-2xl bg-white shadow p-6">
          <h3 className="font-semibold">AI Chats</h3>
          <p className="text-3xl mt-3">0</p>
        </div>

        <div className="rounded-2xl bg-white shadow p-6">
          <h3 className="font-semibold">Diet Plans</h3>
          <p className="text-3xl mt-3">0</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold">
          Quick Actions
        </h2>
      </div>
    </div>
  );
}