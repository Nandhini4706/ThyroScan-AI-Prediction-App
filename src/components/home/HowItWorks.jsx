import {
  RiFileUploadLine,
  RiBrainLine,
  RiHeartPulseLine,
  RiLineChartLine,
} from "react-icons/ri";

const steps = [
  {
    icon: <RiFileUploadLine className="text-5xl text-teal-600" />,
    title: "Upload Report",
    desc: "Upload your thyroid blood report or enter your health details.",
  },
  {
    icon: <RiBrainLine className="text-5xl text-purple-600" />,
    title: "AI Analysis",
    desc: "Groq + Llama 3 analyze the report and identify important findings.",
  },
  {
    icon: <RiHeartPulseLine className="text-5xl text-pink-600" />,
    title: "Personalized Guidance",
    desc: "Receive nutrition suggestions and chat with the Gemini AI assistant.",
  },
  {
    icon: <RiLineChartLine className="text-5xl text-blue-600" />,
    title: "Track Progress",
    desc: "Monitor your thyroid health with dashboards and analytics.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            How <span className="text-teal-600">ThyroScan AI</span> Works
          </h2>

          <p className="text-gray-600 mt-4">
            A simple workflow powered by Artificial Intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 text-center hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center mb-5">
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}