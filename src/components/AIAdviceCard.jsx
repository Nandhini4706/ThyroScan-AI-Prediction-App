import {
  RiRobotLine,
  RiHeartPulseLine,
  RiLeafLine,
  RiRunLine,
  RiLightbulbLine,
  RiCloseLine,
  RiSparklingLine,
  RiUserLine,
} from 'react-icons/ri';

/* ─── Section icon + colour map ─── */
const SECTION_CONFIG = {
  summary: {
    icon: RiHeartPulseLine,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    border: 'border-teal-100',
    label: 'Health Summary',
  },
  diet: {
    icon: RiLeafLine,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    label: 'Diet Recommendations',
  },
  avoid: {
    icon: RiCloseLine,
    color: 'text-red-500',
    bg: 'bg-red-50',
    border: 'border-red-100',
    label: 'Foods to Avoid',
  },
  lifestyle: {
    icon: RiLightbulbLine,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    label: 'Lifestyle Advice',
  },
  exercise: {
    icon: RiRunLine,
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    border: 'border-sky-100',
    label: 'Exercise Recommendations',
  },
};

/* ─── Parse raw AI text into labelled sections ─── */
function parseAdvice(raw) {
  if (!raw) return [];

  const text =
    typeof raw === "string"
      ? raw
      : raw.advice || "";

  const normalized = text.replace(/\r\n/g, "\n").trim();

  // Try to identify known section headings from the AI response
  const sectionPatterns = [
    { key: 'summary', patterns: /health\s+summary|overview|assessment|condition/i },
    { key: 'diet', patterns: /diet\s+rec|food.*recommend|nutrition|eat|dietary/i },
    { key: 'avoid', patterns: /avoid|foods?\s+to\s+avoid|restrict|limit/i },
    { key: 'lifestyle', patterns: /lifestyle|habit|daily|routine|tip/i },
    { key: 'exercise', patterns: /exercise|workout|physical|activity|fitness/i },
  ];

  // Split on lines that look like headings (all-caps words, numbered, markdown ##, or **bold**)
  const headingRegex = /^(?:#{1,3}\s*|[*_]{1,2}|(?:\d+[.)]\s+))(.+?)(?:[*_]{1,2})?:?\s*$/;
  const lines = normalized.split('\n');

  const sections = [];
  let current = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const headingMatch = trimmed.match(headingRegex);
    if (headingMatch) {
      const heading = headingMatch[1].replace(/[*_]/g, '').trim();
      // Find matching section key
      let matchedKey = null;
      for (const { key, patterns } of sectionPatterns) {
        if (patterns.test(heading)) {
          matchedKey = key;
          break;
        }
      }
      if (current) sections.push(current);
      current = { key: matchedKey || `section_${sections.length}`, heading, lines: [] };
    } else {
      if (!current) {
        // Text before any heading goes into summary
        current = { key: 'summary', heading: 'Health Summary', lines: [] };
      }
      // Clean markdown formatting from bullet content
      const cleaned = trimmed
        .replace(/^[-*•]\s+/, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/_(.*?)_/g, '$1');
      if (cleaned) current.lines.push(cleaned);
    }
  }
  if (current && current.lines.length > 0) sections.push(current);

  // If no sections were parsed, return whole text as one block
  if (sections.length === 0) {
    return [{
      key: 'summary',
      heading: 'AI Health Advice',
      lines: normalized.split('\n').filter(Boolean).map((l) =>
        l.replace(/^[-*•]\s+/, '').replace(/\*\*(.*?)\*\*/g, '$1').trim()
      ),
    }];
  }

  return sections;
}

/* ─── Single section block ─── */
function AdviceSection({ section }) {
  const config = SECTION_CONFIG[section.key] || {
    icon: RiSparklingLine,
    color: 'text-teal-600',
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    label: section.heading,
  };
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border ${config.border} overflow-hidden`}>
      <div className={`px-4 py-3 ${config.bg} flex items-center gap-2`}>
        <Icon className={`${config.color} text-base flex-shrink-0`} />
        <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>
          {config.label || section.heading}
        </span>
      </div>
      <div className="px-4 py-4 bg-white space-y-2">
        {section.lines.map((line, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
              section.key === 'avoid' ? 'bg-red-300' :
              section.key === 'diet'  ? 'bg-emerald-400' :
              'bg-teal-400'
            }`} />
            <p className="text-sm text-slate-700 leading-relaxed">{line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Skeleton loader while fetching ─── */
export function AIAdviceSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-24 bg-slate-100 rounded-2xl" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="rounded-xl overflow-hidden">
          <div className="h-10 bg-slate-100" />
          <div className="p-4 bg-white space-y-2">
            <div className="h-3 bg-slate-100 rounded w-4/5" />
            <div className="h-3 bg-slate-100 rounded w-3/5" />
            <div className="h-3 bg-slate-100 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Main AIAdviceCard component ─── */
export default function AIAdviceCard({ advice, record }) {
  const sections = parseAdvice(
    advice?.advice ?? advice
);

  return (
    <div className="space-y-5 animate-slide-up">
      {/* Patient context pill */}
      {record && (
  <div className="flex flex-wrap items-center gap-2.5 p-4 rounded-xl bg-slate-50 border border-slate-100">

    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
      <span className="text-teal-700 text-xs font-bold">
        {record.name?.[0]?.toUpperCase()}
      </span>
    </div>

    <div className="flex-1 min-w-0">
      <div className="text-xs text-slate-500">
        Advice generated for
      </div>

      <div className="text-sm font-semibold text-slate-800">
        {record.name}
      </div>

      <div className="text-xs text-slate-500 mt-1">
        Diagnosis : {record.prediction}
      </div>
    </div>

    <div
      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
        record.riskLevel?.toLowerCase() === 'high'
          ? 'bg-red-50 text-red-600 border border-red-100'
          : record.riskLevel?.toLowerCase() === 'medium'
          ? 'bg-yellow-50 text-yellow-700 border border-yellow-100'
          : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
      }`}
    >
      {record.riskLevel} Risk
    </div>

  </div>
)}
      {/* AI badge header */}
      <div className="flex items-center gap-3 px-1">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-sm">
          <RiRobotLine className="text-white text-lg" />
        </div>
        <div>
          <div className="text-sm font-bold text-slate-800">Gemini AI Recommendation</div>
          <div className="text-xs text-slate-500 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Personalised health advice
          </div>
        </div>
      </div>

      {/* Parsed sections */}
      <div className="space-y-3">
        {sections.map((section, i) => (
          <AdviceSection key={i} section={section} />
        ))}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
        <RiLightbulbLine className="text-amber-500 text-base mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-800 leading-relaxed">
          This AI-generated advice is for informational purposes only and does not constitute
          a medical diagnosis. Please consult a qualified healthcare professional before making
          any changes to your diet, lifestyle, or medical treatment.
        </p>
      </div>
    </div>
  );
}
