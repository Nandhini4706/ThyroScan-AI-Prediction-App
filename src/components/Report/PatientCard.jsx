const PatientCard = ({ patient }) => {

    if (!patient) return null;

    return (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">

            <h2 className="text-xl font-bold text-blue-700 mb-4">
                👤 Patient Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                    <p className="text-gray-500">Name</p>
                    <p className="font-semibold">
                        {patient.patientName || "N/A"}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500">Age</p>
                    <p className="font-semibold">
                        {patient.age || "N/A"}
                    </p>
                </div>

                <div>
                    <p className="text-gray-500">Gender</p>
                    <p className="font-semibold">
                        {patient.gender || "N/A"}
                    </p>
                </div>

            </div>

        </div>
    );

};

export default PatientCard;