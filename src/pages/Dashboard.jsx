import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { thyroidApi } from "../services/thyroidApi";
import {
  RiHeartPulseLine,
  RiFileChartLine,
  RiRobot2Line,
  RiRestaurant2Line,
  RiArrowRightLine,
  RiShieldCheckLine,
} from "react-icons/ri";
import { useHealthProfile } from "../context/HealthProfileContext";
import { RiHistoryLine } from "react-icons/ri";
export default function Dashboard() {
  const [dailySummary, setDailySummary] = useState(null);
  const { profile } = useHealthProfile();
const [dashboard, setDashboard] = useState(null);
useEffect(() => {

    const loadDashboard = async () => {

        try {

            const data = await thyroidApi.getDashboard();

            setDashboard(data);
            const summary = await thyroidApi.getDailySummary();
setDailySummary(summary);

        } catch (err) {

            console.error(err);

        }

    };

    loadDashboard();

}, []);
const cards = [
  {
    title: "Patient",
    value: dashboard?.patientName || "--",
    icon: <RiHeartPulseLine className="text-3xl text-teal-600" />,
  },
  {
    title: "Diagnosis",
    value: dashboard?.diagnosis || "--",
    icon: <RiHeartPulseLine className="text-3xl text-green-600" />,
  },
  {
    title: "Risk Level",
    value: dashboard?.riskLevel || "--",
    icon: <RiShieldCheckLine className="text-3xl text-orange-500" />,
  },
  {
    title: "Health Score",
    value: `${dashboard?.healthScore || 0}%`,
    icon: <RiHeartPulseLine className="text-3xl text-red-500" />,
  },
];
  <div className="grid md:grid-cols-4 gap-6 mt-8">

  <div className="bg-white rounded-2xl border shadow-sm p-6">
    <h3 className="text-slate-500 text-sm">Reports</h3>
    <p className="text-3xl font-bold mt-2">
      {dashboard?.reports || 0}
    </p>
  </div>

  <div className="bg-white rounded-2xl border shadow-sm p-6">
    <h3 className="text-slate-500 text-sm">AI Chats</h3>
    <p className="text-3xl font-bold mt-2">
      {dashboard?.aiChats || 0}
    </p>
  </div>

  <div className="bg-white rounded-2xl border shadow-sm p-6">
    <h3 className="text-slate-500 text-sm">Calories</h3>
    <p className="text-3xl font-bold mt-2">
      {dashboard?.calories || 0}
    </p>
  </div>

  <div className="bg-white rounded-2xl border shadow-sm p-6">
    <h3 className="text-slate-500 text-sm">Water Intake</h3>
    <p className="text-3xl font-bold mt-2">
      {dashboard?.water || 0} L
    </p>
  </div>

</div>

  const actions = [
    {
      title: "Report Analyzer",
      icon: <RiFileChartLine />,
      link: "/report-analyzer",
    },
    {
      title: "AI Assistant",
      icon: <RiRobot2Line />,
      link: "/ai-assistant",
    },
    {
      title: "Diet Tracker",
      icon: <RiRestaurant2Line />,
      link: "/diet-tracker",
    },
    {
   title: "History",
   icon: <RiHistoryLine />,
   link: "/history"
},
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-slate-800">
          Welcome to ThyroScan AI 👋
        </h1>

        <p className="text-slate-500 mt-2">
          AI-powered thyroid health monitoring system.
        </p>
      </div>

      {/* Health Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm border p-6"
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-slate-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-3 text-slate-800">
                  {card.value}
                </h2>

              </div>

              {card.icon}

            </div>
          </div>

        ))}

      </div>
{/* Dashboard Stats */}
<div className="grid md:grid-cols-4 gap-6 mt-8">

  <div className="bg-white rounded-2xl border shadow-sm p-6">
    <h3 className="text-slate-500 text-sm">Reports</h3>
    <p className="text-3xl font-bold mt-2">
      {dashboard?.reports || 0}
    </p>
  </div>

  <div className="bg-white rounded-2xl border shadow-sm p-6">
    <h3 className="text-slate-500 text-sm">AI Chats</h3>
    <p className="text-3xl font-bold mt-2">
      {dashboard?.aiChats || 0}
    </p>
  </div>

  <div className="bg-white rounded-2xl border shadow-sm p-6">
    <h3 className="text-slate-500 text-sm">Calories</h3>
    <p className="text-3xl font-bold mt-2">
      {dashboard?.calories || 0}
    </p>
  </div>

  <div className="bg-white rounded-2xl border shadow-sm p-6">
    <h3 className="text-slate-500 text-sm">Water Intake</h3>
    <p className="text-3xl font-bold mt-2">
      {dashboard?.water || 0} L
    </p>
  </div>

</div>

{dailySummary && (
  <div className="bg-white rounded-2xl shadow-sm border p-6 mt-8">
    <h2 className="text-2xl font-bold text-slate-800 mb-4">
      🤖 AI Daily Health Summary
    </h2>

    <p className="text-lg">
      <strong>Health Score:</strong> {dailySummary.healthScore}/100
    </p>

    <p className="mt-4">
      {dailySummary.summary}
    </p>

    <div className="mt-4">
      <h3 className="font-semibold">
        Improvements
      </h3>

      <p>{dailySummary.improvements}</p>
    </div>

    <div className="mt-4">
      <h3 className="font-semibold">
        Tomorrow Recommendation
      </h3>

      <p>{dailySummary.tomorrowRecommendation}</p>
    </div>
  </div>
)}

      {/* Quick Actions */}
      <div className="mt-12">

        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {actions.map((action) => (

            <Link
              key={action.title}
              to={action.link}
              className="bg-white rounded-2xl border shadow-sm p-6 hover:shadow-lg transition"
            >

              <div className="flex justify-between items-center">

                <div>

                  <div className="text-3xl text-teal-600 mb-4">
                    {action.icon}
                  </div>

                  <h3 className="text-xl font-semibold">
                    {action.title}
                  </h3>

                </div>

                <RiArrowRightLine className="text-2xl text-slate-400" />

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}