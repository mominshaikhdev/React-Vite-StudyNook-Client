import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUsers, FiLayers, FiDollarSign, FiArrowRight } from "react-icons/fi";

export default function RoomCard({ room }) {
  const {
    _id,
    name,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities = [],
  } = room;
  const shortDesc =
    description?.length > 100 ? description.slice(0, 100) + "…" : description;
  const shownAmenities = amenities.slice(0, 3);
  const extra = amenities.length - 3;

  return (
    <motion.div
      className="card flex flex-col h-full group"
      whileHover={{
        y: -6,
        boxShadow: "0 20px 40px -8px rgba(0,0,0,0.15)",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <div className="relative overflow-hidden h-48 shrink-0">
        <motion.img
          src={
            image ||
            "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=600&q=80"
          }
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=600&q=80";
          }}
        />
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-bold text-sky-700 dark:text-sky-400 shadow">
          ${hourlyRate}/hr
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100 mb-1 line-clamp-1">
          {name}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-3 line-clamp-2 flex-1">
          {shortDesc}
        </p>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mb-3">
          <span className="flex items-center gap-1">
            <FiLayers className="text-sky-600 dark:text-sky-400" />{" "}
            {floor || "—"}
          </span>
          <span className="flex items-center gap-1">
            <FiUsers className="text-sky-600 dark:text-sky-400" /> {capacity}{" "}
            people
          </span>
          <span className="flex items-center gap-1">
            <FiDollarSign className="text-sky-600 dark:text-sky-400" /> $
            {hourlyRate}/hr
          </span>
        </div>

        {amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {shownAmenities.map((a) => (
              <span key={a} className="amenity-chip">
                {a}
              </span>
            ))}
            {extra > 0 && (
              <span className="amenity-chip bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400">
                +{extra} more
              </span>
            )}
          </div>
        )}

        <Link
          to={`/rooms/${_id}`}
          className="btn-primary w-full justify-center mt-auto text-sm"
        >
          View Details <FiArrowRight />
        </Link>
      </div>
    </motion.div>
  );
}
