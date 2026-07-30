const DecisionTrace = ({ trace }) => {

    if (!trace) return null;

    const steps = trace.split("\n");

    return (

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

            <h2 className="text-xl font-bold text-indigo-700 mb-4">
                📋 Clinical Decision Trace
            </h2>

            <ul className="space-y-2">

                {steps.map((step, index) => (

                    <li
                        key={index}
                        className="border-l-4 border-indigo-500 pl-3"
                    >
                        {step}
                    </li>

                ))}

            </ul>

        </div>

    );

};

export default DecisionTrace;