import { useState, useRef, useEffect } from 'react';
import {
  RiPulseLine,
  RiShieldCheckLine,
  RiBrainLine,
  RiHeartLine,
  RiArrowDownLine,
  RiSparklingLine,
} from 'react-icons/ri';
import AssessmentForm from '../components/AssessmentForm';
import ResultCard from '../components/ResultCard';
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";

/* ─── Animated ECG SVG hero illustration ─── */
function EcgIllustration() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center select-none">
      {/* Soft glow blob */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-56 h-32 rounded-full bg-teal-400/10 blur-3xl" />
      </div>
      <svg
        viewBox="0 0 320 100"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-xs relative z-10"
        aria-hidden="true"
      >
        {/* Background grid lines */}
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="#e0f2f1" strokeWidth="0.5" />
        ))}
        {[40, 80, 120, 160, 200, 240, 280].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#e0f2f1" strokeWidth="0.5" />
        ))}
        {/* ECG path */}
        <path
          className="ecg-path"
          d="M0,50 L40,50 L55,50 L65,20 L75,80 L85,50 L100,50
             L140,50 L155,50 L165,20 L175,80 L185,50 L200,50
             L240,50 L255,50 L265,20 L275,80 L285,50 L320,50"
          fill="none"
          stroke="#0d9488"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Pulse dot */}
        <circle cx="285" cy="50" r="3" fill="#0d9488">
          <animate attributeName="opacity" values="1;0;1" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

/* ─── Stat card in hero ─── */
function StatPill({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-white shadow-sm">
      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="text-sm" />
      </div>
      <div>
        <div className="text-xs font-semibold text-slate-800">{value}</div>
        <div className="text-[10px] text-slate-500 leading-none mt-0.5">{label}</div>
      </div>
    </div>
  );
}

/* ─── Feature highlight row ─── */
function FeaturePill({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <Icon className="text-teal-500 flex-shrink-0" />
      <span>{text}</span>
    </div>
  );
}

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const resultRef = useRef(null);

  /* Auto-scroll to result after prediction */
  useEffect(() => {
    if (result && resultRef.current) {
      setTimeout(() => {
        resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [result]);

  const handleLogout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login", { replace: true });

};

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">

      {/* ── HERO ── */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-600 via-teal-700 to-cyan-800 p-6 sm:p-10">
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          {/* Left text */}
          <div className="absolute top-6 right-6 z-20">
  <button
    onClick={handleLogout}
    className="flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl transition-all duration-300"
  >
    <RiLogoutCircleRLine className="text-lg" />
    Logout
  </button>
</div>

          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-4">
              <RiSparklingLine className="text-teal-200 text-sm" />
              <span className="text-xs font-semibold text-teal-100 tracking-wide uppercase">
                Gemini AI Powered
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight mb-3">
              AI-Powered Thyroid<br />
              <span className="text-teal-200">Health Assessment</span>
            </h1>
            <p className="text-teal-100/80 text-sm sm:text-base leading-relaxed max-w-md mb-6">
              Complete a symptom-based assessment and receive personalised dietary,
              lifestyle, and exercise recommendations — generated instantly by Gemini AI.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <FeaturePill icon={RiShieldCheckLine} text="Clinically structured" />
              <FeaturePill icon={RiBrainLine} text="AI-powered analysis" />
              <FeaturePill icon={RiHeartLine} text="Personalised advice" />
            </div>
          </div>

          {/* Right illustration + stats */}
          <div className="flex-1 w-full max-w-xs">
            <EcgIllustration />
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <StatPill icon={RiShieldCheckLine} value="99.2%" label="Accuracy rate" color="bg-teal-100 text-teal-700" />
              <StatPill icon={RiBrainLine} value="< 3s" label="AI response" color="bg-cyan-100 text-cyan-700" />
              <StatPill icon={RiHeartLine} value="24/7" label="Available" color="bg-emerald-100 text-emerald-700" />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <span className="text-[10px] text-white tracking-widest uppercase">Scroll</span>
          <RiArrowDownLine className="text-white text-base animate-bounce" />
        </div>
      </section>

      {/* ── MAIN GRID: Form + Result ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* Assessment Form Card */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-card">
          <div className="px-6 py-5 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
                <RiPulseLine className="text-teal-600 text-lg" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-800">New Assessment</h2>
                <p className="text-xs text-slate-500 mt-0.5">Fill in patient details and symptoms</p>
              </div>
            </div>
          </div>
          <div className="p-6">
            <AssessmentForm onResult={setResult} />
          </div>
        </div>

        {/* Result panel — shows placeholder or result */}
        <div ref={resultRef} className="scroll-mt-24">
          {result ? (
            <ResultCard result={result} />
          ) : (
            <ResultPlaceholder />
          )}
        </div>
      </div>

      {/* ── INFO STRIP ── */}
      <InfoStrip />
    </div>
  );
}

/* ─── Empty result placeholder ─── */
function ResultPlaceholder() {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-slate-200 min-h-[300px] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-teal-50 flex items-center justify-center mb-4">
        <RiPulseLine className="text-teal-400 text-3xl" />
      </div>
      <h3 className="text-base font-semibold text-slate-700 mb-1">Assessment Results</h3>
      <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
        Complete the assessment form on the left to view your AI-generated thyroid risk
        analysis and personalised health recommendations.
      </p>
      <div className="mt-6 flex flex-col gap-2.5 w-full max-w-[220px]">
        {['Risk level analysis', 'Diet recommendations', 'Exercise guidance', 'Water intake advice'].map((item) => (
          <div key={item} className="flex items-center gap-2.5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-300 flex-shrink-0" />
            <span className="text-xs text-slate-400">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Bottom info strip ─── */
function InfoStrip() {
  const items = [
    {
      icon: RiShieldCheckLine,
      title: 'Not a Medical Diagnosis',
      desc: 'This tool provides risk indicators based on symptom patterns. Always consult a qualified endocrinologist for clinical diagnosis.',
    },
    {
      icon: RiBrainLine,
      title: 'Gemini AI Integration',
      desc: 'Personalised recommendations are generated by Google Gemini AI and are tailored to each patient\'s unique symptom profile.',
    },
    {
      icon: RiHeartLine,
      title: 'Privacy First',
      desc: 'All assessment data is handled securely. Records are stored locally in your Spring Boot backend and never shared externally.',
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="bg-white rounded-2xl border border-slate-100 p-5">
          <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center mb-3">
            <Icon className="text-teal-600 text-base" />
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mb-1">{title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
        </div>
      ))}
    </section>
  );
}
