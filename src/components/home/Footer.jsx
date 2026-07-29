import {
  RiGithubLine,
  RiLinkedinBoxLine,
  RiMailLine,
  RiHeartFill,
} from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300">

      <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-3 gap-10">

        {/* Brand */}

        <div>
          <h2 className="text-3xl font-bold text-white">
            ThyroScan AI
          </h2>

          <p className="mt-4 leading-7">
            AI-powered thyroid healthcare platform that combines
            intelligent report analysis, chatbot assistance,
            nutrition guidance, and health tracking.
          </p>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3">

            <li>
              <a href="#about" className="hover:text-teal-400">
                About
              </a>
            </li>

            <li>
              <a href="#features" className="hover:text-teal-400">
                Features
              </a>
            </li>

            <li>
              <a href="#technology" className="hover:text-teal-400">
                Technology
              </a>
            </li>

            <li>
              <a href="#contact" className="hover:text-teal-400">
                Contact
              </a>
            </li>

          </ul>
        </div>

        {/* Connect */}

        <div>
          <h3 className="text-xl font-semibold text-white mb-5">
            Connect
          </h3>

          <div className="flex gap-5">

            <a
              href="https://github.com/Nandhini4706"
              target="_blank"
              rel="noreferrer"
            >
              <RiGithubLine className="text-3xl hover:text-teal-400 transition" />
            </a>

            <a
              href="https://www.linkedin.com/in/nandhini-m-833b25294/"
              target="_blank"
              rel="noreferrer"
            >
              <RiLinkedinBoxLine className="text-3xl hover:text-teal-400 transition" />
            </a>

            <a href="mailto:nandhinimm4706@gmail.com">
              <RiMailLine className="text-3xl hover:text-teal-400 transition" />
            </a>

          </div>

        </div>

      </div>

      <div className="border-t border-slate-700 py-6 text-center">

        <p className="flex items-center justify-center gap-2">

          Built with
          <RiHeartFill className="text-red-500" />
          by <span className="font-semibold text-white">Nandhini</span>

        </p>

        <p className="text-sm mt-2">
          © {new Date().getFullYear()} ThyroScan AI. All rights reserved.
        </p>

      </div>

    </footer>
  );
}