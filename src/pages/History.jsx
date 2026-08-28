import { useEffect, useState } from "react";
import { thyroidApi } from "../services/thyroidApi";

export default function History() {

    const [history, setHistory] = useState([]);

  useEffect(() => {

    const loadHistory = async () => {

        try {

            const data =
    await thyroidApi.getFullHistory();

console.log("HISTORY DATA:", data);

setHistory(
    Array.isArray(data)
        ? data
        : []
);

        } catch (err) {

            console.error(err);

        }

    };

    loadHistory();

}, []);

    return (

        <div className="max-w-7xl mx-auto px-6 py-8">

            <h1 className="text-3xl font-bold mb-8">
                History
            </h1>


            {/* =========================
                REPORT HISTORY
            ========================= */}

            <div className="bg-white rounded-2xl shadow border p-6 mb-8">

                <h2 className="text-xl font-bold mb-4">
                    Report History
                </h2>

                {history.length === 0 ?  (
                    <p className="text-slate-500">
                        No reports found.
                    </p>

                ) : (

                    history.map((report) => (

                        <div
                            key={report.id}
                            className="border-b py-4"
                        >

                            <p>
                                <strong>Patient:</strong>{" "}
                                {report.patient}
                            </p>

                            <p>
                                <strong>Diagnosis:</strong>{" "}
                                {report.diagnosis}
                            </p>

                            <p>
                                <strong>Risk:</strong>{" "}
                                {report.risk}
                            </p>

                            <p>
                                <strong>TSH:</strong>{" "}
                                {report.tSH}
                            </p>

                            <p>
                                <strong>T3:</strong>{" "}
                                {report.t3}
                            </p>

                            <p>
                                <strong>T4:</strong>{" "}
                                {report.t4}
                            </p>

                            <p>
                                <strong>Date:</strong>{" "}
                                {report.reportDate}
                            </p>

                        </div>

                    ))

                )}

            </div>

        </div>

    );
}