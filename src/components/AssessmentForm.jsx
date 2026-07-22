import { useState } from 'react';
import {
  RiUserLine, RiHeartPulseLine, RiLoader4Line,
  RiFlashlightLine, RiArrowRightLine
} from 'react-icons/ri';
import { thyroidApi } from '../services/thyroidApi';

const initialForm = {
  name: '',
  gender: '',
  age: '',
  heartRate: '',
  fatigue: false,
  weightGain: false,
  hairFall: false,
  stress: false,
  sleepProblem: false,
};

const symptoms = [
  { key: 'fatigue', label: 'Fatigue', description: 'Persistent tiredness or lack of energy' },
  { key: 'weightGain', label: 'Weight Gain', description: 'Unexplained increase in body weight' },
  { key: 'hairFall', label: 'Hair Fall', description: 'Excessive hair thinning or loss' },
  { key: 'stress', label: 'Stress', description: 'Chronic stress or anxiety patterns' },
  { key: 'sleepProblem', label: 'Sleep Problems', description: 'Difficulty falling or staying asleep' },
];

function ToggleSwitch({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all duration-200 text-left group ${
        checked
          ? 'bg-teal-50 border-teal-200'
          : 'bg-slate-50 border-slate-100 hover:border-slate-200 hover:bg-white'
      }`}
    >
      <div className="flex-1 min-w-0 mr-3">
        <div className={`text-sm font-semibold transition-colors ${checked ? 'text-teal-800' : 'text-slate-700'}`}>
          {label}
        </div>
        <div className={`text-xs mt-0.5 transition-colors ${checked ? 'text-teal-600' : 'text-slate-400'}`}>
          {description}
        </div>
      </div>
      <div
        className={`relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 ${
          checked ? 'bg-teal-600' : 'bg-slate-200'
        }`}
        role="switch"
        aria-checked={checked}
        aria-label={label}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </div>
    </button>
  );
}

export default function AssessmentForm({ onResult }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateField = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));

  const validate = () => {
    if (!form.name.trim()) return 'Please enter a valid name.';
    if (!form.gender) return 'Please select a gender.';
    const age = Number(form.age);
    if (!form.age || age < 1 || age > 120) return 'Please enter a valid age (1–120).';
    const hr = Number(form.heartRate);
    if (!form.heartRate || hr < 30 || hr > 220) return 'Please enter a valid heart rate (30–220 bpm).';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: form.name.trim(),
        gender: form.gender,
        age: Number(form.age),
        heartRate: Number(form.heartRate),
        fatigue: form.fatigue,
        weightGain: form.weightGain,
        hairFall: form.hairFall,
        stress: form.stress,
        sleepProblem: form.sleepProblem,
      };
      const result = await thyroidApi.predict(payload);
      onResult(result);
    } catch (err) {
      setError(err.message || 'Failed to complete assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Patient Information */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <RiUserLine className="text-teal-600 text-base" />
          <span className="section-label">Patient Information</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="e.g. Ravi Sharma"
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Gender</label>
            <select
              value={form.gender}
              onChange={(e) => updateField('gender', e.target.value)}
              className="form-input appearance-none cursor-pointer"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Age</label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => updateField('age', e.target.value)}
              placeholder="e.g. 32"
              min={1}
              max={120}
              className="form-input"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">
              Heart Rate <span className="font-normal text-slate-400">(bpm)</span>
            </label>
            <div className="relative">
              <input
                type="number"
                value={form.heartRate}
                onChange={(e) => updateField('heartRate', e.target.value)}
                placeholder="e.g. 78"
                min={30}
                max={220}
                className="form-input pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-medium">bpm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <RiHeartPulseLine className="text-teal-600 text-base" />
          <span className="section-label">Symptom Assessment</span>
          <span className="ml-auto text-xs text-slate-400">
            {symptoms.filter((s) => form[s.key]).length}/{symptoms.length} selected
          </span>
        </div>
        <div className="space-y-2">
          {symptoms.map(({ key, label, description }) => (
            <ToggleSwitch
              key={key}
              checked={form[key]}
              onChange={(val) => updateField(key, val)}
              label={label}
              description={description}
            />
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-100">
          <span className="text-red-500 mt-0.5 text-base flex-shrink-0">⚠</span>
          <p className="text-sm text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full py-3.5 text-base"
      >
        {loading ? (
          <>
            <RiLoader4Line className="text-lg animate-spin" />
            Analyzing Assessment...
          </>
        ) : (
          <>
            <RiFlashlightLine className="text-lg" />
            Run AI Assessment
            <RiArrowRightLine className="text-lg" />
          </>
        )}
      </button>
    </form>
  );
}
