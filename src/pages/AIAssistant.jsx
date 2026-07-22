import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  RiRobotLine,
  RiHistoryLine,
  RiSparklingLine,
  RiArrowLeftLine,
  RiAlertLine,
  RiRefreshLine,
  RiUserLine,
  RiSearchLine,
  RiCheckboxCircleLine,
} from 'react-icons/ri';
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import { thyroidApi } from '../services/thyroidApi';
import AIAdviceCard, { AIAdviceSkeleton } from '../components/AIAdviceCard';
import { PageLoader } from '../components/LoadingSpinner';

/* ─── Risk badge ─── */
function RiskBadge({ level }) {
  const l = level?.toLowerCase();
  if (l === 'high')
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
        <RiAlertLine className="text-[10px]" />High
      </span>
    );
  if (l === 'medium')
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
        Medium
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
      <RiCheckboxCircleLine className="text-[10px]" />Low
    </span>
  );
}

/* ─── Select-record panel (when no id in URL) ─── */
function RecordSelector({ records, loading, error, onSelect, onRetry }) {
  const [search, setSearch] = useState('');

  const filtered = records.filter((r) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      r.patient?.toLowerCase().includes(q) ||
      r.diagnosis?.toLowerCase().includes(q) ||
      r.risk?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <RiHistoryLine className="text-teal-600" />
          <span className="section-label">Select a Record</span>
        </div>
        <p className="text-sm text-slate-500">
          Choose an assessment record to generate personalised Gemini AI advice.
        </p>
      </div>

      {loading && <PageLoader />}

      {error && (
        <div className="flex flex-col items-center py-8 text-center">
          <RiAlertLine className="text-red-400 text-2xl mb-2" />
          <p className="text-sm text-slate-600 mb-3">{error}</p>
          <button onClick={onRetry} className="btn-primary text-sm">
            <RiRefreshLine /> Try Again
          </button>
        </div>
      )}

      {!loading && !error && records.length === 0 && (
        <div className="flex flex-col items-center py-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
            <RiUserLine className="text-slate-400 text-xl" />
          </div>
          <p className="text-sm font-semibold text-slate-700 mb-1">No records found</p>
          <p className="text-xs text-slate-400 mb-4">Run an assessment first, then come back for AI advice.</p>
          <Link to="/" className="btn-primary text-sm">Start Assessment</Link>
        </div>
      )}

      {!loading && !error && records.length > 0 && (
        <>
          {/* Mini search */}
          <div className="relative">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search records…"
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700
                         placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500
                         transition-all duration-200"
            />
          </div>

          {/* Record list */}
          <div className="space-y-2">
            {filtered.length === 0 && (
              <p className="text-sm text-slate-400 text-center py-4">No records match "{search}".</p>
            )}
            {filtered.map((rec) => (
              <button
                key={rec.id}
                onClick={() => onSelect(rec.id)}
                className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-slate-100 bg-white
                           hover:border-teal-200 hover:bg-teal-50/30 transition-all duration-200 text-left group"
              >
                <div className="w-9 h-9 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center flex-shrink-0
                                group-hover:bg-teal-100 transition-colors">
                  <span className="text-teal-700 text-sm font-bold">{rec.name?.[0]?.toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800 truncate">{rec.patient}</div>
                  <div className="text-xs text-slate-500 truncate">{rec.prediction}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <RiskBadge level={rec.riskLevel} />
                  <RiSparklingLine className="text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm" />
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ─── Main AIAssistant page ─── */
export default function AIAssistant() {
  const { id } = useParams();
  const navigate = useNavigate();

  // List of all records (for selector panel)
  const [records, setRecords] = useState([]);
  const [recordsLoading, setRecordsLoading] = useState(true);
  const [recordsError, setRecordsError] = useState('');

  // The currently selected record's detail
  const [selectedRecord, setSelectedRecord] = useState(null);


  // AI advice state
  const [advice, setAdvice] = useState('');
  const [adviceLoading, setAdviceLoading] = useState(false);
  const [adviceError, setAdviceError] = useState('');

  const [messages, setMessages] = useState([]);
const [chatLoading, setChatLoading] = useState(false);

  /* Load all records for the selector */
  const loadRecords = useCallback(async () => {
    setRecordsLoading(true);
    setRecordsError('');
    try {
      const data = await thyroidApi.getHistory();
      setRecords(data);
    } catch (err) {
      setRecordsError(err.message || 'Failed to load records. Please try again.');
    } finally {
      setRecordsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  /* Load a record's detail + AI advice (single, correct definition) */
  const loadAdviceForId = useCallback(async (recordId) => {
    const existing = records.find((r) => String(r.id) === String(recordId));
    if (existing) {
      setSelectedRecord(existing);
    }

    setAdvice('');
    setAdviceError('');
    setAdviceLoading(true);

    try {
      let rec = existing;
      if (!rec) {
        rec = await thyroidApi.getById(recordId);
        setSelectedRecord(rec);
      }

      const result = await thyroidApi.getAiAdvice(recordId);
      console.log("Gemini Response:", result);
      setAdvice(result);

    } catch (err) {
      setAdviceError(err.message || 'Failed to load AI advice. Please try again.');
    } finally {
      setAdviceLoading(false);
    }
  }, [records]);

  /* When id changes (URL param), auto-load that record + advice */
  useEffect(() => {
  if (id) {
    setMessages([]);
    loadAdviceForId(id);
  }
}, [id, loadAdviceForId]);

  /* Selecting from the list navigates to /ai-assistant/:id */
  const handleSelect = (recordId) => {
    navigate(`/ai-assistant/${recordId}`);
  };

  /* Clear and go back to selector */
  const handleClear = () => {
    navigate('/ai-assistant');
    setSelectedRecord(null);
    setAdvice('');
    setAdviceError('');
  };

  const handleSendMessage = async (text) => {

  // User message
  const userMessage = {
    id: Date.now(),
    type: "user",
    message: text,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  setMessages((prev) => [...prev, userMessage]);

  setChatLoading(true);

  try {

    // Temporary AI response5

    const response = await thyroidApi.chatWithAI(id, text);

const aiMessage = {
  id: Date.now() + 1,
  type: "ai",
  message: response.advice,
  time: new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  }),
};

    setMessages((prev) => [...prev, aiMessage]);

  } catch (err) {
    console.error(err);
  } finally {
    setChatLoading(false);
  }
};

  /* ── LAYOUT ── */
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <RiRobotLine className="text-teal-600 text-lg" />
            <span className="section-label">Gemini AI</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            AI Health Assistant
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Personalised thyroid health recommendations powered by Google Gemini.
          </p>
        </div>

        {/* AI active indicator */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100">
          <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
          <span className="text-xs font-semibold text-teal-700">Gemini AI Active</span>
        </div>
      </div>

      {/* Two-column layout: left = selector panel, right = advice output */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">

        {/* ── LEFT: Record selector ── */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-card">
          <div className="px-5 py-4 border-b border-slate-50">
            <h2 className="text-sm font-bold text-slate-800">Assessment Records</h2>
            <p className="text-xs text-slate-500 mt-0.5">Select one to generate advice</p>
          </div>
          <div className="p-5">
            <RecordSelector
              records={records}
              loading={recordsLoading}
              error={recordsError}
              onSelect={handleSelect}
              onRetry={loadRecords}
            />
          </div>
        </div>

        <div className="lg:col-span-3">
  <div className="bg-white rounded-2xl border border-slate-100 shadow-card h-[760px] flex flex-col">

    {/* Chat Header */}
    <div className="border-b border-slate-100 p-5">
      <h2 className="text-lg font-bold text-slate-800">
        AI Health Assistant
      </h2>

      {selectedRecord ? (
        <p className="text-sm text-slate-500 mt-1">
          Chat with Gemini about{" "}
          <span className="font-semibold">
            {selectedRecord.name}
          </span>
        </p>
      ) : (
        <p className="text-sm text-slate-500 mt-1">
          Select an assessment to begin chatting.
        </p>
      )}
    </div>

    {/* Chat Body */}
<div className="flex-1 flex flex-col min-h-0">

  <div className="flex-1 overflow-y-auto min-h-0">
    <ChatMessages
      messages={messages}
      loading={chatLoading}
    />
  </div>

  <div className="flex-shrink-0">
    <ChatInput
      disabled={!id}
      onSend={handleSendMessage}
    />
  </div>

</div>

  </div>

  </div>
  </div>
  </div>
    );
  }
/* ─── Welcome state when no record is selected ─── */
function AIWelcome() {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-slate-200 min-h-[400px] flex flex-col items-center justify-center p-10 text-center">
      <div className="relative mb-5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-200">
          <RiRobotLine className="text-white text-3xl" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-white flex items-center justify-center">
          <span className="text-white text-[8px] font-bold">AI</span>
        </div>
      </div>
      <h3 className="text-base font-bold text-slate-800 mb-2">Ready for your query</h3>
      <p className="text-sm text-slate-500 leading-relaxed max-w-xs mb-6">
        Select any assessment record from the panel on the left to generate a personalised
        Gemini AI health recommendation.
      </p>
      <div className="grid grid-cols-1 gap-2.5 w-full max-w-xs text-left">
        {[
          { icon: RiSparklingLine, text: 'Personalised dietary guidance' },
          { icon: RiHistoryLine, text: 'Based on your symptom profile' },
          { icon: RiCheckboxCircleLine, text: 'Lifestyle & exercise recommendations' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50">
            <Icon className="text-teal-500 text-sm flex-shrink-0" />
            <span className="text-xs text-slate-600">{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}