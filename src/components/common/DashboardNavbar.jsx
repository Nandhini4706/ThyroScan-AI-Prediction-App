import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RiPulseLine, RiDashboardLine, RiHistoryLine, RiRobotLine, RiMenuLine, RiCloseLine, RiFileChartLine, RiHeartPulseLine } from 'react-icons/ri';
import LogoutButton from "./LogoutButton";

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: RiDashboardLine },
  { to: "/assessment", label: "Assessment", icon: RiPulseLine },
  { to: "/history", label: "History", icon: RiHistoryLine },
  { to: "/ai-assistant", label: "AI Assistant", icon: RiRobotLine },
  { to: "/report-analyzer", label: "Report Analyzer", icon: RiFileChartLine },
  { to: "/diet-tracker", label: "Diet Tracker", icon: RiHeartPulseLine },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
            : 'bg-white/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center group-hover:bg-teal-700 transition-colors duration-200">
                <RiPulseLine className="text-white text-lg" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold text-slate-800 tracking-tight">ThyroScan</span>
                <span className="text-[10px] font-medium text-teal-600 tracking-wider uppercase">AI Platform</span>
              </div>
            </NavLink>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-teal-50 text-teal-700'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`text-base ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                      {label}
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* Right side desktop */}
            <div className="hidden md:flex items-center gap-3">
  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    <span className="text-xs font-medium text-emerald-700">
      System Active
    </span>
  </div>

  <LogoutButton />
</div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <RiCloseLine className="text-xl" /> : <RiMenuLine className="text-xl" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-16 left-0 right-0 z-40 md:hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-lg mx-3 mt-1 rounded-2xl overflow-hidden">
          <div className="p-3 space-y-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-teal-50 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`text-lg ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
          <div className="px-4 py-3 border-t border-slate-100 space-y-3">

  <div className="flex items-center gap-2">
    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    <span className="text-xs font-medium text-slate-500">
      AI System Active
    </span>
  </div>

  <LogoutButton />

</div>
        </div>
      </div>
    </>
  );
}
