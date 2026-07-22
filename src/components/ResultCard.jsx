import {
  RiAlertLine, RiCheckboxCircleLine, RiLeafLine,
  RiCloseLine, RiRunLine, RiDropLine, RiPulseLine, RiArrowRightLine
} from 'react-icons/ri';

function RiskBadge({ level }) {
  const isHigh = level?.toLowerCase() === 'high';
  const isMedium = level?.toLowerCase() === 'medium';

  if (isHigh) return <span className="badge-high"><RiAlertLine />High Risk</span>;
  if (isMedium) return <span className="badge-medium">Medium Risk</span>;
  return <span className="badge-low"><RiCheckboxCircleLine />Low Risk</span>;
}

function FoodChip({ label, type }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${
        type === 'eat'
          ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
          : 'bg-red-50 text-red-600 border-red-100'
      }`}
    >
      {type === 'eat' ? (
        <RiCheckboxCircleLine className="mr-1.5 text-emerald-500" />
      ) : (
        <RiCloseLine className="mr-1.5 text-red-400" />
      )}
      {label}
    </span>
  );
}

export default function ResultCard({ result }) {
  if (!result) return null;
  console.log("RESULT =", result);

  const isHighRisk = result.riskLevel?.toLowerCase() === 'high';

  return (
    <div className={`rounded-2xl border overflow-hidden animate-slide-up ${
      isHighRisk
        ? 'border-red-100 bg-gradient-to-br from-white to-red-50/30'
        : 'border-emerald-100 bg-gradient-to-br from-white to-emerald-50/30'
    }`} style={{ boxShadow: isHighRisk ? '0 20px 60px rgba(239,68,68,0.08)' : '0 20px 60px rgba(16,185,129,0.08)' }}>

      {/* Risk Banner */}
      <div className={`px-6 py-5 ${
        isHighRisk
          ? 'bg-gradient-to-r from-red-500 to-rose-500'
          : 'bg-gradient-to-r from-emerald-500 to-teal-500'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isHighRisk ? (
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <RiAlertLine className="text-white text-xl" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <RiCheckboxCircleLine className="text-white text-xl" />
              </div>
            )}
            <div>
              <p className="text-white/80 text-xs font-medium uppercase tracking-wider">Assessment Result</p>
              <p className="text-white font-bold text-lg leading-tight mt-0.5">{result.prediction}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              <span className="text-white font-bold text-sm">{result.riskLevel} Risk</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        {/* Vital Recommendations */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center">
                <RiRunLine className="text-teal-600 text-sm" />
              </div>
              <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Exercise</span>
            </div>
            <p className="text-sm font-medium text-slate-700 leading-snug">{result.exercise}</p>
          </div>
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-100">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
                <RiDropLine className="text-sky-600 text-sm" />
              </div>
              <span className="text-xs font-semibold text-sky-700 uppercase tracking-wide">Hydration</span>
            </div>
            <p className="text-sm font-medium text-slate-700 leading-snug">{result.waterIntake}</p>
          </div>
        </div>

        {/* Foods to Eat */}
        {result.foodsToEat?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <RiLeafLine className="text-emerald-600 text-base" />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Recommended Foods</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.foodsToEat.map((food, i) => (
                <FoodChip key={i} label={food} type="eat" />
              ))}
            </div>
          </div>
        )}

        {/* Foods to Avoid */}
        {result.foodsToAvoid?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <RiCloseLine className="text-red-500 text-base" />
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Foods to Avoid</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.foodsToAvoid.map((food, i) => (
                <FoodChip key={i} label={food} type="avoid" />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className={`p-4 rounded-xl border ${
          isHighRisk ? 'bg-red-50/50 border-red-100' : 'bg-emerald-50/50 border-emerald-100'
        }`}>
          <div className="flex items-start gap-3">
            <RiPulseLine className={`text-lg mt-0.5 flex-shrink-0 ${isHighRisk ? 'text-red-500' : 'text-emerald-600'}`} />
            <div>
              <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${isHighRisk ? 'text-red-700' : 'text-emerald-700'}`}>
                Clinical Note
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isHighRisk
                  ? 'These indicators suggest elevated risk. Please consult an endocrinologist for a formal thyroid panel (TSH, T3, T4) and clinical evaluation.'
                  : 'Your indicators appear within a manageable range. Continue healthy lifestyle habits and schedule regular thyroid screening as preventive care.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
