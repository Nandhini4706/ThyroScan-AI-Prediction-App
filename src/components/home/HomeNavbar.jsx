import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { RiMenuLine, RiCloseLine, RiPulseLine } from "react-icons/ri";

export default function HomeNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Features", href: "#features" },
    { name: "Technologies", href: "#technologies" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
              <RiPulseLine className="text-white text-xl" />
            </div>

            <div>
              <h1 className="font-bold text-slate-800 text-lg">
                ThyroScan AI
              </h1>

              <p className="text-xs text-teal-600 font-medium">
                Personalized Healthcare
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">

            {links.map((item) => (
             <a
  href={item.href}
  className="font-medium text-slate-700 hover:text-teal-600 transition"
>
  {item.name}
</a>
            ))}

          </div>

          <div className="hidden md:flex gap-4">

            <Link
              to="/login"
              className="px-5 py-2 rounded-xl border border-teal-600 text-teal-600 transition-all duration-300 hover:bg-teal-50 hover:scale-105"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2 rounded-xl bg-teal-600 text-white transition-all duration-300 hover:bg-teal-700 hover:scale-105"
            >
              Get Started
            </Link>

          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <RiCloseLine size={28} />
            ) : (
              <RiMenuLine size={28} />
            )}
          </button>

        </div>

        {menuOpen && (
          <div className="md:hidden pb-5 space-y-4">

            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-slate-700"
              >
                {item.name}
              </a>
            ))}

            <Link
              to="/login"
              className="block"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="block text-teal-600 font-semibold"
            >
              Get Started
            </Link>

          </div>
        )}

      </div>
    </nav>
  );
}