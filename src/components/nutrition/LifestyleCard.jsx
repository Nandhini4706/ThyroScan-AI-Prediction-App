const LifestyleCard = ({ exercise, water, sleep }) => {

    return (

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

            <h2 className="text-xl font-bold text-blue-700 mb-4">
                🌿 Lifestyle Recommendations
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

                <div className="border rounded-lg p-4">
                    <h3 className="font-bold">🏃 Exercise</h3>
                    <p>{exercise}</p>
                </div>

                <div className="border rounded-lg p-4">
                    <h3 className="font-bold">💧 Water Intake</h3>
                    <p>{water}</p>
                </div>

                <div className="border rounded-lg p-4">
                    <h3 className="font-bold">😴 Sleep</h3>
                    <p>{sleep}</p>
                </div>

            </div>

        </div>

    );

};

export default LifestyleCard;