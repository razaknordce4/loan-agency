import { ChevronDown } from 'lucide-react';

export function ToggleGroup({ label, options, value, onChange }) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              value === option
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export function InputField({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-700 font-medium"
      />
    </div>
  );
}

export function TextAreaField({ label, value, onChange, placeholder = "" }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all placeholder:text-slate-700 font-medium resize-none"
      />
    </div>
  );
}

export function SectionHeader({ icon: Icon, title, description }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className="bg-indigo-500/10 p-3 rounded-2xl">
        <Icon className="h-6 w-6 text-indigo-400" />
      </div>
      <div>
        <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none mb-1">{title}</h3>
        <p className="text-xs text-slate-500 font-medium">{description}</p>
      </div>
    </div>
  );
}

export function SelectField({ label, options, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-medium appearance-none cursor-pointer pr-10"
        >
          <option value="" className="bg-slate-900 text-slate-500">Select an option...</option>
          {options.map((option) => (
            <option key={option} value={option} className="bg-slate-900">
              {option}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}
