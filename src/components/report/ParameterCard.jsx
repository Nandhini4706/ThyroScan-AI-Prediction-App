const ParameterCard = ({ patient }) => {

    if (!patient) return null;

    return (

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

            <h2 className="text-xl font-bold text-green-700 mb-4">
                🧪 Thyroid Parameters
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="border rounded-lg p-4">
                    <p className="text-gray-500">TSH</p>
                    <h3 className="text-2xl font-bold">
                        {patient.tsh}
                    </h3>
                </div>

                <div className="border rounded-lg p-4">
                    <p className="text-gray-500">T3</p>
                    <h3 className="text-2xl font-bold">
                        {patient.t3}
                    </h3>
                </div>

                <div className="border rounded-lg p-4">
                    <p className="text-gray-500">T4</p>
                    <h3 className="text-2xl font-bold">
                        {patient.t4}
                    </h3>
                </div>

            </div>

        </div>

    );

};

export default ParameterCard;