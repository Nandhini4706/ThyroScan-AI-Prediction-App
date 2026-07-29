 import { useState, useRef, useCallback } from 'react';
 import {
  RiFileChartLine,
  RiUploadCloud2Line,
  RiFilePdf2Line,
  RiImageLine,
  RiCloseLine,
  RiAlertLine,
  RiCheckboxCircleLine,
  RiLoader4Line,
  RiSparklingLine,
  RiShieldCheckLine,
  RiRefreshLine,
 } from 'react-icons/ri';
import PatientCard from "../components/Report/PatientCard";
import ParameterCard from "../components/Report/ParameterCard";
import DiagnosisCard from "../components/Report/DiagnosisCard";
import DecisionTrace from "../components/Report/DecisionTrace";
import FoodCard from "../components/nutrition/FoodCard";
import MealPlan from "../components/nutrition/MealPlan";
import LifestyleCard from "../components/nutrition/LifestyleCard";
import { thyroidApi } from '../services/thyroidApi';

const ACCEPTED_TYPES = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
const ACCEPTED_EXT = '.pdf,.png,.jpg,.jpeg';
const MAX_SIZE_MB = 10;

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function FilePreviewIcon({ file }) {
  const isPdf = file.type === 'application/pdf';
  const isImage = file.type.startsWith('image/');
  const [previewUrl] = useState(() => (isImage ? URL.createObjectURL(file) : null));

  if (isImage && previewUrl) {
    return (
      <img
        src={previewUrl}
        alt={file.name}
        className="w-14 h-14 rounded-xl object-cover border border-slate-200 flex-shrink-0"
      />
    );
  }

  return (
    <div className="w-14 h-14 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0">
      <RiFilePdf2Line className="text-red-500 text-2xl" />
    </div>
  );
}

export default function ReportAnalyzer() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);

  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  const validateFile = (candidate) => {
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      return 'Unsupported file type. Please upload a PDF, PNG, or JPEG file.';
    }
    if (candidate.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File is too large. Maximum size is ${MAX_SIZE_MB} MB.`;
    }
    return '';
  };

  const handleFileSelect = (selected) => {
    if (!selected) return;
    const validationError = validateFile(selected);
    if (validationError) {
      setError(validationError);
      setFile(null);
      return;
    }
    setError('');
    setSuccess(false);
    setAiResponse(null);
    setFile(selected);
  };

  const handleInputChange = (e) => {
    handleFileSelect(e.target.files?.[0]);
    e.target.value = ''; // allow re-selecting the same file later
  };

  /* ── Drag and drop handlers ── */
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragging(false);
    const dropped = e.dataTransfer.files?.[0];
    handleFileSelect(dropped);
  }, []);

  const handleRemoveFile = () => {
    setFile(null);
    setError('');
    setSuccess(false);
    setAiResponse(null);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  /* ── Submit to backend ── */
  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a file before analyzing.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const result = await thyroidApi.analyzeReport(file);
      setAiResponse(result);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to analyze report. Please check your backend connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setError('');
    setSuccess(false);
    setAiResponse(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">

      {/* Page header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <RiFileChartLine className="text-teal-600 text-lg" />
          <span className="section-label">Document Intelligence</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
          Report Analyzer
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Upload a thyroid lab report (PDF or image) and let AI extract and analyse the results.
        </p>
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-card">
        <div className="px-6 py-5 border-b border-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center">
              <RiUploadCloud2Line className="text-teal-600 text-lg" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">Upload Lab Report</h2>
              <p className="text-xs text-slate-500 mt-0.5">Accepted formats: PDF, PNG, JPG — max {MAX_SIZE_MB}MB</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">

          {/* Hidden native input */}
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_EXT}
            onChange={handleInputChange}
            className="hidden"
          />

          {/* Drop zone (shown when no file selected) */}
          {!file && (
            <div
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
              className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer
                          flex flex-col items-center justify-center text-center py-14 px-6
                          ${isDragging
                            ? 'border-teal-400 bg-teal-50/60 scale-[1.01]'
                            : 'border-slate-200 bg-slate-50/50 hover:border-teal-300 hover:bg-teal-50/30'
                          }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-200
                                ${isDragging ? 'bg-teal-100' : 'bg-white border border-slate-100'}`}>
                <RiUploadCloud2Line className={`text-3xl transition-colors duration-200 ${isDragging ? 'text-teal-600' : 'text-teal-500'}`} />
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-1">
                {isDragging ? 'Drop your file here' : 'Drag & drop your report here'}
              </p>
              <p className="text-xs text-slate-400 mb-4">or click to browse from your device</p>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-500">
                  <RiFilePdf2Line className="text-red-400" /> PDF
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-500">
                  <RiImageLine className="text-sky-400" /> PNG / JPG
                </span>
              </div>
            </div>
          )}

          {/* File preview (shown when file selected) */}
          {file && (
            <div className="rounded-2xl border border-teal-100 bg-teal-50/40 p-4 flex items-center gap-4 animate-slide-up">
              <FilePreviewIcon file={file} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{file.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{formatFileSize(file.size)}</p>
                {!loading && !success && (
                  <span className="inline-flex items-center gap-1 mt-1.5 text-xs font-medium text-teal-600">
                    <RiCheckboxCircleLine /> Ready to analyze
                  </span>
                )}
              </div>
              {!loading && (
                <button
                  onClick={handleRemoveFile}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors duration-150 flex-shrink-0"
                  aria-label="Remove file"
                  title="Remove file"
                >
                  <RiCloseLine className="text-lg" />
                </button>
              )}
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-100">
              <RiAlertLine className="text-red-500 mt-0.5 text-base flex-shrink-0" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Success state (until backend logic exists, just confirms upload went through) */}
          {success && !error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-100">
              <RiCheckboxCircleLine className="text-emerald-500 mt-0.5 text-base flex-shrink-0" />
              <p className="text-sm text-emerald-700 font-medium">
                Report uploaded and processed successfully.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="btn-primary flex-1 py-3.5 text-base"
            >
              {loading ? (
                <>
                  <RiLoader4Line className="text-lg animate-spin" />
                  Analyzing Report...
                </>
              ) : (
                <>
                  <RiSparklingLine className="text-lg" />
                  Analyze Report
                </>
              )}
            </button>
            {(file || success) && !loading && (
              <button onClick={handleReset} className="btn-secondary px-5">
                <RiRefreshLine /> Reset
              </button>
            )}
          </div>
        </div>
      </div>

     {/* Raw AI response placeholder — backend logic (OCR / extraction / AI) not yet implemented */}
{aiResponse && (

<div className="space-y-6 animate-slide-up">

    <PatientCard
        patient={aiResponse.patientReport}
    />

    <ParameterCard
        patient={aiResponse.patientReport}
    />

    <DiagnosisCard
        diagnosis={aiResponse.diagnosis}
        riskLevel={aiResponse.riskLevel}
    />

    <DecisionTrace
        trace={aiResponse.decisionTrace}
    />

    <FoodCard
        title="🥗 Foods To Eat"
        foods={aiResponse.foodsToEat}
        type="good"
    />

    <FoodCard
        title="🚫 Foods To Avoid"
        foods={aiResponse.foodsToAvoid}
        type="bad"
    />

    <MealPlan
        mealPlan={aiResponse.mealPlan}
    />

    <LifestyleCard
        exercise={aiResponse.exercise}
        water={aiResponse.water}
        sleep={aiResponse.sleep}
    />

</div>

)}

      {/* Info strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: RiShieldCheckLine,
            title: 'Secure Upload',
            desc: 'Your report is sent directly to your backend and is not stored by any third party.',
          },
          {
            icon: RiFileChartLine,
            title: 'Multi-Format Support',
            desc: 'Upload scanned PDFs or photographed lab reports — both are accepted for analysis.',
          },
          {
            icon: RiSparklingLine,
            title: 'AI-Assisted Insights',
            desc: 'Extraction and interpretation are powered by your configured AI pipeline on the backend.',
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center mb-3">
              <Icon className="text-teal-600 text-base" />
            </div>
            <h3 className="text-sm font-semibold text-slate-800 mb-1">{title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}