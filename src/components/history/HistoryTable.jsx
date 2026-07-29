import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  RiEyeLine, RiDeleteBinLine, RiRobotLine,
  RiAlertLine, RiCheckboxCircleLine, RiUserLine,
  RiLoader4Line
} from 'react-icons/ri';
import { thyroidApi } from '../../services/thyroidApi';

function RiskBadge({ level }) {
  const l = level?.toLowerCase();
  if (l === 'high')
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-600 border border-red-100">
        <RiAlertLine className="text-xs" /> High
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
      <RiCheckboxCircleLine className="text-xs" /> Low
    </span>
  );
}

function DeleteModal({ name, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-slide-up">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <RiDeleteBinLine className="text-red-500 text-xl" />
        </div>
        <h3 className="text-base font-bold text-slate-800 text-center">Delete Assessment</h3>
        <p className="text-sm text-slate-500 text-center mt-1.5">
          Remove the record for <span className="font-semibold text-slate-700">{name}</span>? This action cannot be undone.
        </p>
        <div className="flex gap-2 mt-5">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 btn-secondary py-2.5 justify-center"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
                       bg-red-500 text-white font-semibold text-sm
                       hover:bg-red-600 transition-colors duration-200
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? <RiLoader4Line className="animate-spin" /> : <RiDeleteBinLine />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function HistoryTable({ records, onDelete }) {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setDeleting(true);
    try {
      await thyroidApi.deleteById(deleteTarget.id);
      onDelete(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      alert(err.message || 'Failed to delete. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <RiUserLine className="text-slate-400 text-2xl" />
        </div>
        <h3 className="text-base font-semibold text-slate-700">No records found</h3>
        <p className="text-sm text-slate-400 mt-1">
          No assessments match your search. Try a different name or run a new assessment.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
  <tr className="border-b border-slate-100">
    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">#</th>

    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
      Patient
    </th>

    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
      Diagnosis
    </th>

    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
      Risk
    </th>

    <th className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
      Report Date
    </th>

    <th className="text-right px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
      Actions
    </th>
  </tr>
</thead>
          <tbody className="divide-y divide-slate-50">
            {records.map((rec, idx) => (
           <tr
  key={rec.id}
  className="group hover:bg-slate-50/70 transition-colors duration-150"
>
  <td className="px-4 py-3.5 text-sm text-slate-400 font-medium">
    {idx + 1}
  </td>

  {/* Patient */}
  <td className="px-4 py-3.5">
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center">
        <span className="text-teal-700 text-xs font-bold">
          {rec.patient?.[0]?.toUpperCase()}
        </span>
      </div>

      <span className="text-sm font-semibold text-slate-800">
        {rec.name}
      </span>
    </div>
  </td>

  {/* Diagnosis */}
  <td className="px-4 py-3.5 text-sm font-medium text-slate-700">
    {rec.prediction}
  </td>

  {/* Risk */}
  <td className="px-4 py-3.5">
    <RiskBadge level={rec.riskLevel} />
  </td>

  {/* Report Date */}
 <td className="px-4 py-3.5 text-sm text-slate-600">
  {rec.createdAt
    ? new Date(rec.createdAt).toLocaleDateString()
    : "-"}
</td>

  {/* Actions */}
  <td className="px-4 py-3.5">
    <div className="flex items-center justify-end gap-1.5">
      <button
        onClick={() => navigate(`/history/${rec.id}`)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
      >
        <RiEyeLine />
        View
      </button>

      <button
        onClick={() => navigate(`/ai-assistant/${rec.id}`)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
      >
        <RiRobotLine />
        AI Advice
      </button>

      <button
        onClick={() => setDeleteTarget(rec)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
      >
        <RiDeleteBinLine />
      </button>
    </div>
  </td>
</tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-100">
        {records.map((rec) => (
          <div key={rec.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center">
                  <span className="text-teal-700 text-sm font-bold">{rec.name?.[0]?.toUpperCase()}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{rec.patient}</div>
                  <div className="text-xs text-slate-500">{new Date(rec.reportDate).toLocaleDateString()}</div>
                </div>
              </div>
              <RiskBadge level={rec.riskLevel} />
            </div>
            <p className="text-xs font-medium text-slate-600 mb-3">{rec.prediction}</p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate(`/history/${rec.id}`)}
                className="flex-1 btn-secondary justify-center py-2 text-xs"
              >
                <RiEyeLine /> View
              </button>
              <button
                onClick={() => navigate(`/ai-assistant/${rec.id}`)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors"
              >
                <RiRobotLine /> AI Advice
              </button>
              <button
                onClick={() => setDeleteTarget(rec)}
                className="btn-danger"
              >
                <RiDeleteBinLine />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Modal */}
      {deleteTarget && (
        <DeleteModal
          name={deleteTarget.paitent}
          onConfirm={handleDeleteConfirm}
          onCancel={() => !deleting && setDeleteTarget(null)}
          loading={deleting}
        />
      )}
    </>
  );
}
