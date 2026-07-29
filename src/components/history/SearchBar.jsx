import { RiSearchLine, RiCloseLine } from 'react-icons/ri';

export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative">
      <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white
                   text-sm text-slate-700 placeholder-slate-400 font-medium
                   transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500
                   hover:border-slate-300"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-150"
          aria-label="Clear search"
        >
          <RiCloseLine className="text-base" />
        </button>
      )}
    </div>
  );
}
