import { useEffect, useState } from "react";
import { thyroidApi } from "../services/thyroidApi";

export default function History() {

    const [history, setHistory] = useState(null);

    useEffect(() => {

        const loadHistory = async () => {

            try {

                const data = await thyroidApi.getFullHistory();

                setHistory(data);

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

            {/* Reports */}

            <div className="bg-white rounded-2xl shadow border p-6 mb-8">

                <h2 className="text-xl font-bold mb-4">
                    Report History
                </h2>
{history?.reports?.length === 0 ? (

    <p className="text-slate-500">
        No reports found.
    </p>

) : (

    history?.reports?.map(report => (

        <div
            key={report.id}
            className="border-b py-3"
        >

            <p>{report.name}</p>

            <p>{report.prediction}</p>

            <p>{report.riskLevel}</p>

        </div>

    ))

)}

            </div>

            {/* Diet */}

            <div className="bg-white rounded-2xl shadow border p-6">

                <h2 className="text-xl font-bold mb-4">
                    Diet History
                </h2>

                {history?.diets?.length === 0 ? (

    <p className="text-slate-500">
        No diet history found.
    </p>

) : (

    history?.diets?.map(diet => (

        <div
            key={diet.id}
            className="border-b py-3"
        >

            <p>{diet.foodName}</p>

            <p>{diet.calories} kcal</p>

            <p>{diet.date}</p>

        </div>

    ))

)}

            </div>

        </div>
    );
}