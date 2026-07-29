export default function LoadingSpinner({ size = 'md', text = 'Loading...' }) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-2 border-teal-100" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-teal-600 animate-spin" />
      </div>
      {text && <p className="text-sm text-slate-500 font-medium">{text}</p>}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-12 h-12 relative mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-teal-100" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-teal-600 animate-spin" />
        </div>
        <p className="text-sm font-medium text-slate-600">Loading assessment data...</p>
        <p className="text-xs text-slate-400 mt-1">Please wait</p>
      </div>
    </div>
  );
}

export function InlineLoader({ text = 'Processing...' }) {
  return (
    <div className="flex items-center gap-2 text-teal-600">
      <div className="w-4 h-4 relative">
        <div className="absolute inset-0 rounded-full border border-teal-200" />
        <div className="absolute inset-0 rounded-full border border-transparent border-t-teal-600 animate-spin" />
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}
