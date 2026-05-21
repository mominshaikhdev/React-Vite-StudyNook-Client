import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiShield,
  FiClock,
  FiStar,
  FiBookOpen,
  FiSearch,
} from "react-icons/fi";
import RoomCard from "../components/RoomCard";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../utils/api";
import useTheme from "../context/useTheme";

const STEPS = [
  {
    icon: <FiSearch size={28} />,
    title: "Search & Filter",
    desc: "Browse quiet, private study rooms by amenities, floor, and hourly rate.",
  },
  {
    icon: <FiClock size={28} />,
    title: "Pick a Time Slot",
    desc: "Choose your date, start and end time. We calculate the total cost instantly.",
  },
  {
    icon: <FiBookOpen size={28} />,
    title: "Confirm & Study",
    desc: "Book with one click. Manage your bookings from your personal dashboard.",
  },
];

const TESTIMONIALS = [
  {
    name: "Ayesha Rahman",
    role: "Computer Science, BUET",
    text: "StudyNook made finding a quiet room before finals completely stress-free. Booked in under 2 minutes!",
    rating: 5,
  },
  {
    name: "Rafiq Islam",
    role: "MBA Student, DU",
    text: "Finally a platform that shows real-time availability. No more wandering the library hunting for empty rooms.",
    rating: 5,
  },
  {
    name: "Sadia Akter",
    role: "Room Owner",
    text: "I list my library room between lectures and earn extra income. The dashboard makes managing bookings so easy.",
    rating: 5,
  },
];

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { dark } = useTheme();

  useEffect(() => {
    api
      .get("/api/rooms/latest")
      .then((res) => setRooms(res.data.rooms || []))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>StudyNook – Home</title>
      </Helmet>
      <div className="page-enter">
        {/* Hero */}
        <section
          className={`relative overflow-hidden transition-colors duration-300 ${
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

          {!dark && (
            <>
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl pointer-events-none" />
            </>
          )}

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm border transition-colors duration-300 ${
                dark
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-sky-100/80 border-sky-200 text-sky-700"
              }`}
            >
              <FiStar className="text-amber-400" /> Trusted by 500+ students
              across Bangladesh
            </div>

            <h1
              className={`font-display text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 transition-colors duration-300 ${
                dark ? "text-white" : "text-slate-900"
              }`}
            >
              Find Your Perfect
              <br />
              <span className={dark ? "text-sky-300" : "text-sky-600"}>
                Study Room
              </span>
            </h1>

            <p
              className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-colors duration-300 ${
                dark ? "text-sky-100" : "text-slate-600"
              }`}
            >
              Browse and book quiet, private study rooms in your library. List
              your own room and earn.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/rooms"
                className={`px-8 py-3.5 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2 shadow-lg ${
                  dark
                    ? "bg-white text-sky-900 hover:bg-sky-50"
                    : "bg-sky-600 text-white hover:bg-sky-500 shadow-sky-200"
                }`}
              >
                Explore Rooms <FiArrowRight />
              </Link>
              <Link
                to="/add-room"
                className={`px-8 py-3.5 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2 border ${
                  dark
                    ? "bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:border-sky-300 hover:text-sky-600 shadow-sm"
                }`}
              >
                List Your Room
              </Link>
            </div>
          </div>
        </section>

        {/* Latest Rooms */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm mb-1 uppercase tracking-wider">
                Just Added
              </p>
              <h2 className="section-title">Available Study Rooms</h2>
            </div>
            <Link to="/rooms" className="btn-secondary shrink-0">
              View All Rooms <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : rooms.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <FiBookOpen className="mx-auto mb-3 w-12 h-12 opacity-40" />
              <p className="text-lg font-medium">No rooms available yet.</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
              initial="initial"
              animate="animate"
            >
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </motion.div>
          )}
        </section>

        {/* How It Works */}
        <section className="bg-slate-50 dark:bg-slate-800/60 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm mb-1 uppercase tracking-wider">
                Simple Process
              </p>
              <h2 className="section-title">How It Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {STEPS.map((step, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow"
                >
                  <div className="w-14 h-14 bg-sky-100 dark:bg-sky-900/60 text-sky-600 dark:text-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm">
                    {step.icon}
                  </div>
                  <div className="text-xs font-bold text-sky-600 dark:text-sky-400 mb-2 tracking-widest">
                    STEP {i + 1}
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-300 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-white dark:bg-slate-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sky-600 dark:text-sky-400 font-semibold text-sm mb-1 uppercase tracking-wider">
                What Students Say
              </p>
              <h2 className="section-title">Loved by Learners</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={i}
                  className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <FiStar
                        key={j}
                        className="text-amber-400 w-4 h-4"
                        style={{ fill: "#fbbf24" }}
                      />
                    ))}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-5 italic">
                    "{t.text}"
                  </p>
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">
                      {t.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {t.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section
          className={`py-14 border-t transition-colors duration-300 ${
            dark
              ? "bg-gradient-to-r from-slate-800 via-sky-900 to-indigo-950 border-white/10 text-white"
              : "bg-gradient-to-r from-sky-50 via-white to-indigo-50 border-sky-100 text-slate-900"
          }`}
        >
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2
              className={`font-display text-3xl md:text-4xl font-bold mb-4 ${dark ? "text-white" : "text-slate-900"}`}
            >
              Own a quiet space?
            </h2>
            <p
              className={`mb-8 text-lg ${dark ? "text-sky-300" : "text-slate-600"}`}
            >
              List your study room on StudyNook and start earning from unused
              space.
            </p>
            <Link
              to="/add-room"
              className={`px-8 py-3.5 rounded-xl font-semibold transition-all inline-flex items-center gap-2 shadow-lg ${
                dark
                  ? "bg-sky-500 text-white hover:bg-sky-400"
                  : "bg-sky-600 text-white hover:bg-sky-500 shadow-sky-200"
              }`}
            >
              <FiShield /> List My Room
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
