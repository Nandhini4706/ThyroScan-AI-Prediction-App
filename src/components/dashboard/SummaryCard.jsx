export default function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  color,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-md p-6 hover:shadow-xl transition duration-300">

      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <h1 className="text-3xl font-bold text-slate-800 mt-2">
        {value}
      </h1>

      <p className="text-gray-400 mt-2">
        {subtitle}
      </p>

    </div>
  );
}