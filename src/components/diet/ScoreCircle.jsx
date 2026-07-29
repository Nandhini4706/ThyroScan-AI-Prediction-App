export default function ScoreCircle({
  score = 85,
  title = "Today's Health Score",
}) {

  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference - (score / 100) * circumference;

  const getStatus = () => {
    if (score >= 90) return "Excellent 🌟";
    if (score >= 75) return "Good ✅";
    if (score >= 50) return "Needs Improvement ⚠";
    return "Poor ❌";
  };

  return (
    <div className="bg-white rounded-3xl shadow-md p-8 flex flex-col items-center">

      <svg height={radius * 2} width={radius * 2}>

        <circle
          stroke="#E5E7EB"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />

        <circle
          stroke="#14B8A6"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          style={{
            transition: "stroke-dashoffset 1s ease",
            transform: "rotate(-90deg)",
            transformOrigin: "50% 50%",
          }}
        />

        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy="8"
          fontSize="26"
          fontWeight="bold"
          fill="#0F172A"
        >
          {score}%
        </text>

      </svg>

      <h2 className="mt-4 text-xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="text-slate-500 mt-2">
        {getStatus()}
      </p>

    </div>
  );
}