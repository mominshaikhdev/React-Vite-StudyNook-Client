import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FiSearch, FiFilter, FiX, FiBookOpen } from "react-icons/fi";
import RoomCard from "../components/RoomCard";
import LoadingSpinner from "../components/LoadingSpinner";
import api from "../utils/api";
import useTheme from "../context/useTheme";

export default function Rooms() {
  const { dark } = useTheme();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [amenityOptions, setAmenityOptions] = useState([]);

  useEffect(() => {
    api
      .get("/api/rooms/amenities")
      .then((res) => setAmenityOptions(res.data.amenities || []))
      .catch(() =>
        setAmenityOptions([
          "Whiteboard",
          "Projector",
          "Wi-Fi",
          "Power Outlets",
          "Quiet Zone",
          "Air Conditioning",
        ]),
      );
  }, []);

  const fetchRooms = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (selectedAmenities.length)
      params.set("amenities", selectedAmenities.join(","));

    api
      .get(`/api/rooms?${params.toString()}`)
      .then((res) => setRooms(res.data.rooms || res.data))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  }, [search, selectedAmenities]);

  useEffect(() => {
    const timer = setTimeout(fetchRooms, 400);
    return () => clearTimeout(timer);
  }, [fetchRooms]);

  const toggleAmenity = (a) => {
    setSelectedAmenities((prev) =>
      prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a],
    );
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedAmenities([]);
  };

  const hasFilters = search || selectedAmenities.length > 0;

  return (
    <>
      <Helmet>
        <title>StudyNook – Available Rooms</title>
      </Helmet>
      <div className="page-enter">
        {/* Header */}
        <div
          className={`relative overflow-hidden py-12 transition-colors duration-300 ${
            dark
              ? "bg-gradient-to-br from-sky-900 via-sky-800 to-indigo-900 text-white"
              : "bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-900"
          }`}
        >
          {!dark && (
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
          )}
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1
              className={`font-display text-3xl md:text-4xl font-bold mb-2 ${dark ? "text-white" : "text-slate-900"}`}
            >
              All Study Rooms
            </h1>
            <p className={dark ? "text-sky-200" : "text-slate-500"}>
              Find and book the perfect space for your study session.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by room name…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`btn-secondary shrink-0 ${showFilters ? "bg-sky-50" : ""}`}
            >
              <FiFilter /> Filters{" "}
              {selectedAmenities.length > 0 && `(${selectedAmenities.length})`}
            </button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="btn-secondary shrink-0 text-red-600 border-red-200 hover:bg-red-50"
              >
                <FiX /> Clear
              </button>
            )}
          </div>

          {/* Amenity Filter Chips */}
          {showFilters && (
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                Filter by Amenities:
              </p>
              <div className="flex flex-wrap gap-2">
                {amenityOptions.map((a) => (
                  <button
                    key={a}
                    onClick={() => toggleAmenity(a)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                      selectedAmenities.includes(a)
                        ? "bg-sky-700 text-white border-sky-700"
                        : "bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:border-sky-400 dark:hover:border-sky-500"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <LoadingSpinner />
          ) : rooms.length === 0 ? (
            <div className="text-center py-20">
              <FiBookOpen className="mx-auto mb-4 w-14 h-14 text-slate-300 dark:text-slate-600" />
              <h3 className="font-display text-xl font-bold text-slate-700 dark:text-slate-200 mb-1">
                No rooms found
              </h3>
              <p className="text-slate-400 dark:text-slate-500 text-sm">
                Try adjusting your search or clearing filters.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
                {rooms.length} room{rooms.length !== 1 ? "s" : ""} found
              </p>
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={{
                  animate: { transition: { staggerChildren: 0.07 } },
                }}
                initial="initial"
                animate="animate"
              >
                {rooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </motion.div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
