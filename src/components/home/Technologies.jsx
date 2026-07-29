import {
  RiReactjsLine,
  RiDatabase2Line,
  RiShieldCheckLine,
  RiRobot2Line,
  RiCodeBoxLine,
  RiCpuLine,
  RiBrainLine,
} from "react-icons/ri";

const technologies = [
  {
    icon: <RiReactjsLine className="text-6xl text-cyan-500" />,
    title: "React.js",
    desc: "Responsive frontend built with modern React."
  },
  {
  icon: <RiCodeBoxLine className="text-6xl text-red-500" />,
  title: "Spring Boot",
  desc: "Java backend with REST APIs and JWT authentication."
},
  {
    icon: <RiDatabase2Line className="text-6xl text-blue-600" />,
    title: "MySQL",
    desc: "Stores user accounts, assessments, and health data."
  },
  {
    icon: <RiRobot2Line className="text-6xl text-teal-600" />,
    title: "Gemini AI",
    desc: "Powers the AI chatbot for interactive health guidance and user assistance."
  },
  {
    icon: <RiBrainLine className="text-6xl text-teal-600" />,
    title: "Groq AI + Llama 3",
    desc: "Analyzes thyroid reports and generates AI-driven medical insights."
  },
  {
    icon: <RiShieldCheckLine className="text-6xl text-green-600" />,
    title: "Spring Security + JWT",
    desc: "Provides secure authentication and authorization."
  }
];

export default function Technology() {
  return (
    <section id="technologies" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">
            Technology <span className="text-teal-600">Stack</span>
          </h2>

          <p className="text-gray-600 mt-4">
            Built with modern technologies to deliver a secure and intelligent healthcare platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-2xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <div className="flex justify-center mb-5">
                {tech.icon}
              </div>

              <h3 className="text-2xl font-semibold">
                {tech.title}
              </h3>

              <p className="text-gray-600 mt-3">
                {tech.desc}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}