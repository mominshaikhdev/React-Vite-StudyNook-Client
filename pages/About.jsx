import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  FiBookOpen,
  FiShield,
  FiSearch,
  FiCalendar,
  FiUsers,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";
import useAuth from "../context/useAuth";
import useTheme from "../context/useTheme";

const TEAM = [
  { name: "Arif Hossain", role: "Lead Developer", initials: "AH" },
  { name: "Nadia Islam", role: "UI/UX Designer", initials: "NI" },
  { name: "Karim Uddin", role: "Backend Engineer", initials: "KU" },
];

const VALUES = [
  {
    icon: <FiSearch size={28} />,
    title: "Easy Discovery",
    desc: "Find the perfect study room in seconds with our smart search and filter system.",
  },
  {
    icon: <FiShield size={28} />,
    title: "Secure & Trusted",
    desc: "JWT-based authentication with HTTP-only cookies keeps your account safe at all times.",
  },
  {
    icon: <FiCalendar size={28} />,
    title: "Conflict-Free Booking",
    desc: "Our real-time conflict detection ensures no two bookings ever overlap on the same room.",
  },
  {
    icon: <FiUsers size={28} />,
    title: "Community-Powered",
    desc: "Room owners and students collaborate on a single platform to make studying better.",
  },
];

export default function About() {
  const { user } = useAuth();
  const { dark } = useTheme();

  return (
    <>
      <Helmet>
        <title>StudyNook – About</title>
      </Helmet>
      <div className="page-enter">
        {/* Hero */}
        <section
          className={`relative overflow-hidden py-20 transition-colors duration-300 ${
            dark
              ? "bg-gradient-to-br from-sky-900 via-sky-800 to-indigo-900 text-white"
              : "bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-900"
          }`}
        >
          {/* Background pattern */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: dark ? 0.1 : 0.06,
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230369a1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
          {/* Light mode orbs */}
          {!dark && (
            <>
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
            </>
          )}

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 border transition-colors duration-300 ${
                dark
                  ? "bg-white/10 border-white/20"
                  : "bg-sky-100/80 border-sky-200"
              }`}
            >
              <FiBookOpen
                className={`w-8 h-8 ${dark ? "text-sky-300" : "text-sky-600"}`}
              />
            </div>
            <h1
              className={`font-display text-4xl sm:text-5xl font-bold mb-5 transition-colors duration-300 ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              About{" "}
              <span className={dark ? "text-sky-300" : "text-sky-600"}>
                StudyNook
              </span>
            </h1>
            <p
              className={`text-lg md:text-xl max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
                dark ? "text-sky-100" : "text-slate-600"
              }`}
            >
              StudyNook is a full-stack web application where students and
              library users can list study rooms they control and any registered
              user can browse, search, and book those rooms for a specific date
              and time slot.
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">
                Our Mission
              </p>
              <h2 className="section-title mb-5">
                Connecting Students
                <br />
                with Study Spaces
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                We believe every student deserves a quiet, focused environment
                to study and grow. StudyNook bridges the gap between room owners
                — students and staff who control private spaces in university
                libraries — and learners who need them.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Our platform automatically prevents double-booking using
                time-conflict detection, allows room owners to manage their
                listings, and gives every user a dashboard to handle their own
                bookings — all secured with JWT authentication in HTTP-only
                cookies.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "500+", sub: "Students Registered" },
                { label: "120+", sub: "Study Rooms Listed" },
                { label: "1 800+", sub: "Bookings Made" },
                { label: "4.9★", sub: "Average Rating" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-100 dark:border-slate-700 shadow-sm"
                >
                  <p className="font-display text-3xl font-bold text-sky-700 dark:text-sky-400 mb-1">
                    {stat.label}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {stat.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-slate-100 dark:bg-slate-800/60 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">
                Why StudyNook
              </p>
              <h2 className="section-title">What We Stand For</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((v, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-900 rounded-2xl p-6 text-center shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition"
                >
                  <div className="w-14 h-14 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    {v.icon}
                  </div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm uppercase tracking-wider mb-2">
              The People
            </p>
            <h2 className="section-title">Meet the Team</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition w-64"
              >
                <div className="w-16 h-16 bg-sky-600 dark:bg-sky-700 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {member.initials}
                </div>
                <h3 className="font-display font-bold text-slate-900 dark:text-slate-100 text-lg">
                  {member.name}
                </h3>
                <p className="text-sky-600 dark:text-sky-400 text-sm font-medium mt-1">
                  {member.role}
                </p>
                <div className="flex justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, j) => (
                    <FiStar
                      key={j}
                      className="text-amber-400 w-3 h-3"
                      style={{ fill: "#fbbf24" }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section
          className={`py-14 border-t transition-colors duration-300 ${
            dark
              ? "bg-gradient-to-r from-slate-800 via-sky-900 to-indigo-950 border-white/10 text-white"
              : "bg-gradient-to-r from-sky-50 via-white to-indigo-50 border-sky-100 text-slate-900"
          }`}
        >
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className={`font-display text-3xl md:text-4xl font-bold mb-4 transition-colors duration-300 ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              Ready to find your study space?
            </h2>
            <p
              className={`mb-8 text-lg transition-colors duration-300 ${
                dark ? "text-sky-300" : "text-slate-600"
              }`}
            >
              Join hundreds of students already using StudyNook.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/rooms"
                className={`px-8 py-3.5 rounded-xl font-semibold transition-all inline-flex items-center gap-2 shadow-lg ${
                  dark
                    ? "bg-white text-sky-900 hover:bg-sky-50"
                    : "bg-sky-600 text-white hover:bg-sky-500 shadow-sky-200"
                }`}
              >
                Browse Rooms <FiArrowRight />
              </Link>
              {!user && (
                <Link
                  to="/register"
                  className={`px-8 py-3.5 rounded-xl font-semibold transition-all inline-flex items-center gap-2 border ${
                    dark
                      ? "bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                      : "bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-600 shadow-sm"
                  }`}
                >
                  Create Account
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
