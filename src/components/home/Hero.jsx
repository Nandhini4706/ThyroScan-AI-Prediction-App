import { Link } from "react-router-dom";
import {
  RiArrowRightLine,
  RiShieldCheckLine,
  RiRobot2Line,
  RiHeartPulseLine,
} from "react-icons/ri";
import heroImage from "../../assets/hero.png";
export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen pt-20 bg-gradient-to-br from-teal-50 via-white to-cyan-50 flex items-center"
    >
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-14 items-center">

        {/* Left Section */}
        <div>

          <span className="inline-block px-4 py-2 rounded-full bg-teal-100 text-teal-700 font-semibold mb-6">
            AI Powered Healthcare
          </span>

          <h1 className="text-6xl font-extrabold text-slate-900 leading-tight">

            Personalized

            <span className="text-teal-600">
              {" "}AI-Powered{" "}
            </span>

            Thyroid Health Platform

          </h1>

          <p className="text-gray-600 text-lg mt-8 leading-8">

            Empowering smarter thyroid care through artificial
            intelligence, personalized health insights,
            report analysis and continuous monitoring.

          </p>

          <div className="flex gap-5 mt-10">

            <Link
              to="/register"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition"
            >
              Get Started
              <RiArrowRightLine />
            </Link>

            <Link
              to="/login"
              className="border border-teal-600 text-teal-600 px-8 py-4 rounded-xl font-semibold hover:bg-teal-50 transition"
            >
              Login
            </Link>

          </div>

          {/* Highlights */}

          <div className="grid grid-cols-2 gap-6 mt-14">

            <div className="flex items-center gap-3">
              <RiRobot2Line
                className="text-teal-600"
                size={28}
              />
              <span>AI Prediction</span>
            </div>

            <div className="flex items-center gap-3">
              <RiHeartPulseLine
                className="text-teal-600"
                size={28}
              />
              <span>Health Monitoring</span>
            </div>

            <div className="flex items-center gap-3">
              <RiShieldCheckLine
                className="text-teal-600"
                size={28}
              />
              <span>Secure Platform</span>
            </div>

            <div className="flex items-center gap-3">
              <RiRobot2Line
                className="text-teal-600"
                size={28}
              />
              <span>AI Nutrition</span>
            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="flex justify-center">
<img
  src={heroImage}
  alt="ThyroScan AI"
  className="w-full max-w-3xl object-contain"
/>

        </div>

      </div>
    </section>
  );
}