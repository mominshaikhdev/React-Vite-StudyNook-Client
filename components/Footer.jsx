import { Link } from "react-router-dom";
import {
  FiBookOpen,
  FiFacebook,
  FiLinkedin,
  FiInstagram,
  FiMail,
  FiPhone,
  FiArrowUpRight,
} from "react-icons/fi";

function XIcon({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const usefulLinks = [
  { to: "/", label: "Home" },
  { to: "/rooms", label: "All Rooms" },
  { to: "/about", label: "About" },
];

export default function Footer() {
  return (
    <footer
      className="
      bg-gradient-to-b from-slate-50 to-white
      dark:bg-none dark:bg-slate-950
      text-slate-600 dark:text-slate-400
      mt-auto border-t border-slate-200 dark:border-slate-800
      transition-colors duration-300
    "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-sky-500 transition-colors">
                <FiBookOpen className="text-white w-4 h-4" />
              </div>
              <span className="font-display text-xl font-bold text-slate-900 dark:text-white">
                Study
                <span className="text-sky-600 dark:text-sky-400">Nook</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-500 leading-relaxed max-w-xs">
              Your platform for booking quiet, private study rooms in university
              libraries. List your room and earn.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h4 className="text-slate-800 dark:text-white font-semibold mb-5 text-xs uppercase tracking-widest flex items-center gap-2">
              Useful Links
            </h4>
            <ul className="space-y-1">
              {usefulLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="
                      group inline-flex items-center gap-1.5 text-sm
                      text-slate-500 dark:text-slate-400
                      hover:text-sky-600 dark:hover:text-sky-400
                      py-1.5 pr-2 rounded
                      relative
                      transition-colors duration-200
                    "
                  >
                    <span
                      className="
                      absolute left-0 top-1/2 -translate-y-1/2
                      w-0 group-hover:w-1.5 h-1.5
                      rounded-full bg-sky-500
                      transition-all duration-200
                    "
                    />
                    <span className="pl-0 group-hover:pl-3 transition-all duration-200">
                      {link.label}
                    </span>
                    <FiArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 text-sky-500"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-slate-800 dark:text-white font-semibold mb-5 text-xs uppercase tracking-widest flex items-center gap-2">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@studynook.app"
                  className="group flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
                >
                  <span className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-900/40 border border-sky-100 dark:border-sky-800 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:border-sky-600 transition-all duration-200">
                    <FiMail className="text-sky-600 dark:text-sky-400 group-hover:text-white w-3.5 h-3.5 transition-colors duration-200" />
                  </span>
                  support@studynook.app
                </a>
              </li>
              <li>
                <a
                  href="tel:+8801234567890"
                  className="group flex items-center gap-2.5 text-sm text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors duration-200"
                >
                  <span className="w-7 h-7 rounded-lg bg-sky-50 dark:bg-sky-900/40 border border-sky-100 dark:border-sky-800 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:border-sky-600 transition-all duration-200">
                    <FiPhone className="text-sky-600 dark:text-sky-400 group-hover:text-white w-3.5 h-3.5 transition-colors duration-200" />
                  </span>
                  +880 123 456 7890
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-slate-800 dark:text-white font-semibold mb-5 text-xs uppercase tracking-widest flex items-center gap-2">
              Follow Us
            </h4>
            <div className="flex items-center gap-2.5">
              {[
                {
                  icon: <FiFacebook size={15} />,
                  href: "#",
                  label: "Facebook",
                },
                { icon: <XIcon size={14} />, href: "#", label: "X" },
                {
                  icon: <FiLinkedin size={15} />,
                  href: "#",
                  label: "LinkedIn",
                },
                {
                  icon: <FiInstagram size={15} />,
                  href: "#",
                  label: "Instagram",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="
                    w-9 h-9 rounded-xl
                    bg-white dark:bg-slate-800
                    border border-slate-200 dark:border-slate-700
                    shadow-sm
                    flex items-center justify-center
                    text-slate-500 dark:text-slate-400
                    hover:bg-sky-600 hover:text-white hover:border-sky-600 hover:shadow-sky-200 hover:shadow-md
                    dark:hover:bg-sky-600 dark:hover:border-sky-600
                    transition-all duration-200
                  "
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-slate-600">
            © {new Date().getFullYear()} StudyNook. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs text-slate-400 dark:text-slate-600 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="w-px h-3 bg-slate-300 dark:bg-slate-700" />
            <a
              href="#"
              className="text-xs text-slate-400 dark:text-slate-600 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
