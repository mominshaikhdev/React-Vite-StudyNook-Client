import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FiCalendar, FiClock, FiBookOpen, FiXCircle } from "react-icons/fi";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmModal from "../components/ConfirmModal";
import api from "../utils/api";

const fmt = (h) => `${String(h).padStart(2, "0")}:00`;

const statusBadge = (status) => {
  if (status === "confirmed")
    return "bg-green-100 text-green-700 border border-green-200";
  if (status === "cancelled")
    return "bg-red-100 text-red-600 border border-red-200";
  return "bg-slate-100 text-slate-500";
};

const isFutureDate = (dateStr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateStr + "T00:00:00") >= today;
};

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    api
      .get("/api/bookings/my")
      .then((res) => setBookings(res.data.bookings || res.data))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false));
  }, []);

  const handleCancel = async () => {
    try {
      await api.patch(`/api/bookings/${cancelId}/cancel`);
      toast.success("Booking cancelled.");
      setBookings((prev) =>
        prev.map((b) =>
          b._id === cancelId ? { ...b, status: "cancelled" } : b,
        ),
      );
    } catch {
      toast.error("Failed to cancel booking");
    }
    setCancelId(null);
  };

  return (
    <>
      <Helmet>
        <title>StudyNook – My Bookings</title>
      </Helmet>
      <div className="page-enter max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
            My Bookings
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Track and manage your room reservations.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <FiBookOpen className="mx-auto mb-4 w-14 h-14 text-slate-200 dark:text-slate-600" />
            <h3 className="font-display text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
              You have no bookings yet.
            </h3>
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              Browse available rooms to make your first booking.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => {
              const room = b.roomId;
              const canCancel =
                b.status === "confirmed" && isFutureDate(b.date);
              return (
                <div
                  key={b._id}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-5 flex flex-col sm:flex-row gap-4 hover:shadow-md transition"
                >
                  {room?.image && (
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-xl border border-slate-100 dark:border-slate-700 shrink-0"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h3 className="font-display font-bold text-slate-900 dark:text-slate-100">
                          {room?.name || "Deleted Room"}
                        </h3>
                        <div className="flex flex-wrap gap-3 mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <FiCalendar size={13} className="text-sky-600" />
                            {new Date(b.date + "T00:00:00").toLocaleDateString(
                              "en-US",
                              {
                                weekday: "short",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                          <span className="flex items-center gap-1">
                            <FiClock size={13} className="text-sky-600" />
                            {fmt(b.startHour)} – {fmt(b.endHour)}
                          </span>
                        </div>
                        {b.specialNote && (
                          <p className="text-xs text-slate-400 mt-1">
                            Note: {b.specialNote}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadge(b.status)}`}
                        >
                          {b.status}
                        </span>
                        {canCancel && (
                          <button
                            onClick={() => setCancelId(b._id)}
                            className="flex items-center gap-1.5 text-xs text-red-600 hover:text-red-700 font-medium border border-red-200 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
                          >
                            <FiXCircle size={13} /> Cancel
                          </button>
                        )}
                      </div>
                    </div>
                    {b.totalCost != null && (
                      <p className="text-sm font-semibold text-sky-700 mt-2">
                        Total: ${b.totalCost}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!cancelId}
        title="Cancel Booking"
        message="Are you sure you want to cancel this booking? This action cannot be undone."
        confirmLabel="Yes, Cancel"
        onConfirm={handleCancel}
        onCancel={() => setCancelId(null)}
      />
    </>
  );
}
