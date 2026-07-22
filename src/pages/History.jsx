import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  RiHistoryLine,
  RiArrowLeftLine,
  RiUserLine,
  RiHeartPulseLine,
  RiLeafLine,
  RiCloseLine,
  RiRunLine,
  RiDropLine,
  RiAlertLine,
  RiCheckboxCircleLine,
  RiRobotLine,
  RiRefreshLine,
} from 'react-icons/ri';
import { thyroidApi } from '../services/thyroidApi';
import HistoryTable from '../components/HistoryTable';
import SearchBar from '../components/SearchBar';
import { PageLoader } from '../components/LoadingSpinner';

/* ─── Risk badge helper (shared) ─── */
function RiskBadge({ level }) {
  const l = level?.toLowerCase();
  if (l === 'high')
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
        <RiAlertLine /> High Risk
      </span>
    );
  if (l === 'medium')
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
        Medium Risk
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
      <RiCheckboxCircleLine /> Low Risk
    </span>
  );
}

/* ─── Full detail panel for a single record ─── */
function RecordDetail({ record, onBack }) {
  const navigate = useNavigate();
  const isHigh = record?.risk?.toLowerCase() === 'high';

  if (!record) return null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button + header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="btn-secondary py-2"
        >
          <RiArrowLeftLine /> Back to History
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
        {/* Coloured top bar */}
        <div className={`px-6 py-5 ${isHigh ? 'bg-gradient-to-r from-red-500 to-rose-500' : 'bg-gradient-to-r from-emerald-500 to-teal-500'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">{record.patient?.[0]?.toUpperCase()}</span>
              </div>
              <div>
                <p className="text-white/70 text-xs uppercase tracking-wide font-medium">Patient Record</p>
                <p className="text-white font-bold text-xl leading-tight">{record.patient}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                <span className="text-white text-sm font-semibold">{record.risk} Risk</span>
              </div>
              <button
                onClick={() => navigate(`/ai-assistant/${record.id}`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors text-white text-sm font-semibold"
              >
                <RiRobotLine /> AI Advice
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Patient info row */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <RiUserLine className="text-teal-600" />
              <span className="section-label">Patient Information</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
  { label: 'patient', value: record.patient },
  { label: 'Diagnosis', value: record.diagnosis },
  { label: 'T3', value: record.t3 },
  { label: 'T4', value: record.t4 },
].map(({ label, value }) => (
                <div key={label} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</div>
                  <div className="text-sm font-semibold text-slate-800">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <RiHeartPulseLine className="text-teal-600" />
              <span className="section-label">Reported Symptoms</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'fatigue', label: 'Fatigue' },
                { key: 'weightGain', label: 'Weight Gain' },
                { key: 'hairFall', label: 'Hair Fall' },
                { key: 'stress', label: 'Stress' },
                { key: 'sleepProblem', label: 'Sleep Problem' },
              ].map(({ key, label }) => (
                <span
                  key={key}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
                    record[key]
                      ? 'bg-red-50 text-red-600 border-red-100'
                      : 'bg-slate-50 text-slate-400 border-slate-100'
                  }`}
                >
                  {record[key]
                    ? <RiCheckboxCircleLine className="text-red-400" />
                    : <RiCloseLine className="text-slate-300" />
                  }
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Prediction */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <RiAlertLine className="text-teal-600" />
              <span className="section-label">Assessment Result</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50">
              <div className="flex-1">
                <div className="text-xs text-slate-500 mb-0.5">Prediction</div>
                <div className="text-base font-bold text-slate-800">{record.diagnosis}</div>
              </div>
              <RiskBadge level={record.risk} />
            </div>
          </div>

          {/* Exercise + Water */}
          {(record.exercise || record.water) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {record.exercise && (
                <div className="p-4 rounded-xl bg-teal-50 border border-teal-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-100 flex items-center justify-center">
                      <RiRunLine className="text-teal-600 text-sm" />
                    </div>
                    <span className="text-xs font-semibold text-teal-700 uppercase tracking-wide">Exercise</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700">{record.exercise}</p>
                </div>
              )}
              {record.water && (
                <div className="p-4 rounded-xl bg-sky-50 border border-sky-100">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
                      <RiDropLine className="text-sky-600 text-sm" />
                    </div>
                    <span className="text-xs font-semibold text-sky-700 uppercase tracking-wide">Hydration</span>
                  </div>
                  <p className="text-sm font-medium text-slate-700">{record.water}</p>
                </div>
              )}
            </div>
          )}

          {/* Foods */}
          {record.foodsToEat?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <RiLeafLine className="text-emerald-600" />
                <span className="section-label">Recommended Foods</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {record.foodsToEat.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                    <RiCheckboxCircleLine className="text-emerald-500" />{f}
                  </span>
                ))}
              </div>
            </div>
          )}
          {record.foodsToAvoid?.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <RiCloseLine className="text-red-500" />
                <span className="section-label">Foods to Avoid</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {record.foodsToAvoid.map((f, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-red-50 text-red-600 border border-red-100">
                    <RiCloseLine className="text-red-400" />{f}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Main History Page ─── */
export default function History({ viewMode }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  // Single record state for view mode
  const [singleRecord, setSingleRecord] = useState(null);
  const [singleLoading, setSingleLoading] = useState(false);
  const [singleError, setSingleError] = useState('');

  /* Fetch full history */
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await thyroidApi.getHistory();
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || 'Failed to load history. Please check your backend connection.');
    } finally {
      setLoading(false);
    }
  };

  /* If in view mode and we have an id, fetch single record */
  useEffect(() => {
    if (viewMode && id) {
      fetchSingleRecord(id);
    }
  }, [viewMode, id]);

  const fetchSingleRecord = async (recordId) => {
    setSingleLoading(true);
    setSingleError('');
    try {
      const data = await thyroidApi.getById(recordId);
      setSingleRecord(data);
    } catch (err) {
      setSingleError(err.message || 'Failed to load record.');
    } finally {
      setSingleLoading(false);
    }
  };

  /* Handle delete from table */
  const handleDelete = (deletedId) => {
    setRecords((prev) => prev.filter((r) => r.id !== deletedId));
  };

  /* Filtered records by search */
  const filteredRecords = useMemo(() => {
  if (!search.trim()) return records;

  const q = search.toLowerCase().trim();

  return records.filter(
    (r) =>
      r.patient?.toLowerCase().includes(q) ||
      r.diagnosis?.toLowerCase().includes(q) ||
      r.risk?.toLowerCase().includes(q)
  );
}, [records, search]);

  /* ── VIEW MODE: show single record ── */
  if (viewMode) {
    if (singleLoading) return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <PageLoader />
      </div>
    );
    if (singleError) return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ErrorState message={singleError} onRetry={() => fetchSingleRecord(id)} />
      </div>
    );
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <RecordDetail
          record={singleRecord}
          onBack={() => navigate('/history')}
        />
      </div>
    );
  }

  /* ── LIST MODE ── */
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">

      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <RiHistoryLine className="text-teal-600 text-lg" />
            <span className="section-label">Assessment Records</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
            Patient History
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            All thyroid assessments — view details, get AI advice, or remove records.
          </p>
        </div>

        {/* Stats pills */}
        {!loading && !error && (
          <div className="flex gap-2 flex-wrap">
            <div className="px-3 py-1.5 rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
              {records.length} Total
            </div>
            <div className="px-3 py-1.5 rounded-full bg-red-50 text-xs font-semibold text-red-600 border border-red-100">
              {records.filter((r) => r.risk?.toLowerCase() === 'high').length} High Risk
            </div>
            <div className="px-3 py-1.5 rounded-full bg-emerald-50 text-xs font-semibold text-emerald-700 border border-emerald-100">
              {records.filter((r) => r.risk?.toLowerCase() === 'low').length} Low Risk
            </div>
          </div>
        )}
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">

        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-slate-50 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="w-full sm:max-w-xs">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search by name, prediction, risk…"
            />
          </div>
          <button
            onClick={fetchHistory}
            disabled={loading}
            className="btn-secondary flex-shrink-0"
          >
            <RiRefreshLine className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* Body */}
        {loading ? (
          <div className="py-16">
            <PageLoader />
          </div>
        ) : error ? (
          <div className="py-8 px-6">
            <ErrorState message={error} onRetry={fetchHistory} />
          </div>
        ) : (
          <>
            <HistoryTable records={filteredRecords} onDelete={handleDelete} />

            {/* Footer count */}
            {filteredRecords.length > 0 && (
              <div className="px-5 py-3 border-t border-slate-50 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Showing {filteredRecords.length} of {records.length} records
                  {search && ` for "${search}"`}
                </span>
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="text-xs text-teal-600 hover:text-teal-700 font-medium"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Empty history CTA */}
      {!loading && !error && records.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 p-10 flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-4">
            <RiHistoryLine className="text-teal-400 text-2xl" />
          </div>
          <h3 className="text-base font-semibold text-slate-700 mb-1">No assessments yet</h3>
          <p className="text-sm text-slate-400 mb-5 max-w-xs">
            Run your first thyroid assessment from the Dashboard to see records here.
          </p>
          <Link to="/" className="btn-primary">
            Start Assessment
          </Link>
        </div>
      )}
    </div>
  );
}

/* ─── Error state component ─── */
function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-3">
        <RiAlertLine className="text-red-400 text-xl" />
      </div>
      <h3 className="text-sm font-semibold text-slate-700 mb-1">Failed to load history</h3>
      <p className="text-xs text-slate-400 mb-4 max-w-xs">{message}</p>
      <button onClick={onRetry} className="btn-primary text-sm">
        <RiRefreshLine /> Try Again
      </button>
    </div>
  );
}
