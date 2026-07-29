import {
  RiShieldCheckLine,
  RiFlashlightLine,
  RiRobot2Line,
  RiUserHeartLine,
} from "react-icons/ri";

const reasons = [
  {
    icon: <RiRobot2Line className="text-5xl text-teal-600" />,
    title: "AI-Powered Healthcare",
    desc: "Uses Groq + Llama 3 for report analysis and Gemini AI for intelligent health assistance.",
  },
  {
    icon: <RiShieldCheckLine className="text-5xl text-green-600" />,
    title: "Secure & Private",
    desc: "JWT authentication and secure data handling protect your health information.",
  },
  {
    icon: <RiFlashlightLine className="text-5xl text-yellow-500" />,
    title: "Fast Insights",
    desc: "Receive AI-powered thyroid analysis and personalized recommendations within seconds.",
  },
  {
    icon: <RiUserHeartLine className="text-5xl text-pink-500" />,
    title: "Personalized Care",
    desc: "Get customized nutrition guidance, chatbot support, and health tracking tailored to your needs.",
  },
];

export default function WhyChoose() {
  return (
    <section className="py-24 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Why Choose ThyroScan AI?
          </h2>

          <p className="mt-4 text-lg text-teal-100">
            Smart, secure, and AI-driven thyroid healthcare in one platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {reasons.map((item, index) => (
            <div
              key={index}
              className="bg-white text-gray-800 rounded-2xl p-8 shadow-lg hover:-translate-y-2 transition duration-300"
            >
              <div className="flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-center">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-3 text-center">
                {item.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}