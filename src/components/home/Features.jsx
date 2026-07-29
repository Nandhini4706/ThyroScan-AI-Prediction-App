import {
  RiRobot2Line,
  RiFileSearchLine,
  RiHeartPulseLine,
  RiBarChartBoxLine,
  RiShieldCheckLine,
  RiUserHeartLine,
} from "react-icons/ri";

const features = [
  {
    icon: <RiRobot2Line className="text-5xl text-teal-600" />,
    title: "AI Prediction",
    desc: "Predict thyroid risk using advanced AI models.",
  },
  {
    icon: <RiFileSearchLine className="text-5xl text-teal-600" />,
    title: "Report Analyzer",
    desc: "Upload medical reports for AI-powered analysis.",
  },
  {
    icon: <RiHeartPulseLine className="text-5xl text-teal-600" />,
    title: "Nutrition Tracker",
    desc: "Receive personalized diet plans and nutrition tracking.",
  },
  {
    icon: <RiBarChartBoxLine className="text-5xl text-teal-600" />,
    title: "Health Dashboard",
    desc: "Track your thyroid health progress over time.",
  },
  {
    icon: <RiShieldCheckLine className="text-5xl text-teal-600" />,
    title: "Secure Data",
    desc: "Your medical data is protected and secure.",
  },
  {
    icon: <RiUserHeartLine className="text-5xl text-teal-600" />,
    title: "AI Assistant",
    desc: "Ask health-related questions anytime.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Our <span className="text-teal-600">Features</span>
          </h2>

          <p className="text-gray-600 mt-4">
            Everything you need to monitor your thyroid health in one place.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-8 hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >
              {feature.icon}

              <h3 className="text-2xl font-semibold mt-5">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {feature.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}