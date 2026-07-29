import { RiRobot2Line, RiHeartPulseLine, RiFileSearchLine } from "react-icons/ri";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-900">
            About <span className="text-teal-600">ThyroScan AI</span>
          </h2>

          <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
            ThyroScan AI is an intelligent healthcare platform designed to
            assist users in assessing thyroid health using artificial
            intelligence, medical report analysis, and personalized
            nutrition guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-teal-50 rounded-2xl p-8 shadow hover:shadow-lg transition">
            <RiRobot2Line className="text-teal-600 text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-3">AI Prediction</h3>
            <p className="text-gray-600">
              Predict thyroid risk using intelligent assessment powered by AI.
            </p>
          </div>

          <div className="bg-teal-50 rounded-2xl p-8 shadow hover:shadow-lg transition">
            <RiFileSearchLine className="text-teal-600 text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Report Analysis</h3>
            <p className="text-gray-600">
              Upload thyroid reports and receive AI-driven health insights.
            </p>
          </div>

          <div className="bg-teal-50 rounded-2xl p-8 shadow hover:shadow-lg transition">
            <RiHeartPulseLine className="text-teal-600 text-5xl mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Health Tracking</h3>
            <p className="text-gray-600">
              Monitor nutrition, daily health, and progress in one place.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}