import FormattedText from "../common/FormattedText";

const DiagnosisCard = ({ diagnosis, riskLevel, healthSummary }) => {

    if (!diagnosis) return null;

    const riskColor =
        riskLevel === "High"
            ? "bg-red-100 text-red-700"
            : riskLevel === "Moderate"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-green-100 text-green-700";

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

            <h2 className="text-xl font-bold text-purple-700 mb-4">
                🩺 Diagnosis
            </h2>

            <h3 className="text-2xl font-bold mb-4">
                <FormattedText value={diagnosis} />
            </h3>

            {healthSummary && (
                <p className="mb-4 whitespace-pre-line text-slate-600">
                    <FormattedText value={healthSummary} />
                </p>
            )}

            <span
                className={`px-4 py-2 rounded-full font-semibold ${riskColor}`}
            >
                {riskLevel} Risk
            </span>

        </div>
    );
};

export default DiagnosisCard;