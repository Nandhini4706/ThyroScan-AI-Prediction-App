import { useNavigate } from "react-router-dom";

export default function FeatureCard({
  title,
  description,
  icon,
  route,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(route)}
      className="cursor-pointer bg-white rounded-2xl p-6 shadow-md border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
    >
      <div className="text-5xl mb-5 text-teal-600">
        {icon}
      </div>

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="text-gray-600 mt-3">
        {description}
      </p>
    </div>
  );
}