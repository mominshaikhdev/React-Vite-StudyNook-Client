import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import {
  FiUsers,
  FiLayers,
  FiDollarSign,
  FiEdit2,
  FiTrash2,
  FiBookOpen,
  FiCalendar,
  FiClock,
  FiX,
  FiCheck,
  FiLogIn,
} from "react-icons/fi";
import useAuth from "../context/useAuth";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmModal from "../components/ConfirmModal";
import api from "../utils/api";

const START_HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8..20
const MAX_END_HOUR = 21;

const fmt = (h) => `${String(h).padStart(2, "0")}:00`;
const todayStr = () => new Date().toISOString().split("T")[0];

export default function RoomDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [booking, setBooking] = useState({
    date: todayStr(),
    startHour: 8,
    endHour: 9,
    specialNote: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  const fetchRoom = () =>
    api
      .get(`/api/rooms/${id}`)
      .then((res) => setRoom(res.data.room || res.data))
      .catch(() => {
        toast.error("Room not found");
        navigate("/rooms");
      })
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchRoom();
  }, [id]);

  const isOwner =
    user && room && String(user.id || user._id) === String(room.ownerId);

  const validEndHours = Array.from(
    { length: MAX_END_HOUR - booking.startHour },
    (_, i) => booking.startHour + 1 + i,
  );

  const totalCost = (
    (booking.endHour - booking.startHour) *
    (room?.hourlyRate || 0)
  ).toFixed(2);

  const handleStartHourChange = (val) => {
    const sh = Number(val);
    const eh = sh >= booking.endHour ? sh + 1 : booking.endHour;
    setBooking((b) => ({
      ...b,
      startHour: sh,
      endHour: Math.min(eh, MAX_END_HOUR),
    }));
  };

  const handleBook = async () => {
    setBookingLoading(true);
    try {
      await api.post("/api/bookings", {
        roomId: id,
        date: booking.date,
        startHour: booking.startHour,
        endHour: booking.endHour,
        specialNote: booking.specialNote,
      });
      toast.success("Room booked successfully!");
      setBookingOpen(false);

      setLoading(true);
      fetchRoom();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Booking failed. Time slot may be taken.",
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/rooms/${id}`);
      toast.success("Room deleted successfully");
      navigate("/my-listings");
    } catch {
      toast.error("Failed to delete room");
    }
    setDeleteOpen(false);
  };

  if (loading) return <LoadingSpinner fullPage />;
  if (!room) return null;

  return (
    <>
      <Helmet>
        <title>StudyNook – {room.name}</title>
      </Helmet>
      <div className="page-enter max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden shadow-md h-72 lg:h-auto">
            <img
              src={
                room.image ||
                "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=800&q=80"
              }
              alt={room.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=800&q=80";
              }}
            />
          </div>

          {/* Details */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">
                {room.name}
              </h1>
              {isOwner && (
                <div className="flex gap-2 shrink-0">
                  <Link
                    to={`/rooms/${id}/edit`}
                    className="btn-secondary text-sm p-2"
                  >
                    <FiEdit2 />
                  </Link>
                  <button
                    onClick={() => setDeleteOpen(true)}
                    className="btn-danger text-sm p-2"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              )}
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {room.description}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 flex items-center gap-2">
                <FiLayers className="text-sky-600" />
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  <span className="font-semibold">Floor:</span> {room.floor}
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 flex items-center gap-2">
                <FiUsers className="text-sky-600" />
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  <span className="font-semibold">Capacity:</span>{" "}
                  {room.capacity} people
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 flex items-center gap-2">
                <FiDollarSign className="text-sky-600" />
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  <span className="font-semibold">Rate:</span> $
                  {room.hourlyRate}/hr
                </span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 flex items-center gap-2">
                <FiBookOpen className="text-sky-600" />
                <span className="text-sm text-slate-700 dark:text-slate-200">
                  <span className="font-semibold">Bookings:</span>{" "}
                  {room.bookingCount ?? 0}
                </span>
              </div>
            </div>

            {room.amenities?.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-slate-700 mb-2">
                  Amenities
                </p>
                <div className="flex flex-wrap gap-2">
                  {room.amenities.map((a) => (
                    <span key={a} className="amenity-chip">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {room.ownerName && (
              <p className="text-xs text-slate-400 mb-6">
                Listed by{" "}
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  {room.ownerName}
                </span>
              </p>
            )}

            {user ? (
              !isOwner && (
                <button
                  onClick={() => setBookingOpen(true)}
                  className="btn-primary w-full justify-center text-base py-3"
                >
                  <FiCalendar /> Book Now
                </button>
              )
            ) : (
              <Link
                to="/login"
                state={{ from: { pathname: `/rooms/${id}` } }}
                className="btn-primary w-full justify-center text-base py-3"
              >
                <FiLogIn /> Login to Book
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                Book Room
              </h2>
              <button
                onClick={() => setBookingOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="form-label">
                  <FiCalendar className="inline mr-1" />
                  Date
                </label>
                <input
                  type="date"
                  min={todayStr()}
                  value={booking.date}
                  onChange={(e) =>
                    setBooking((b) => ({ ...b, date: e.target.value }))
                  }
                  className="form-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">
                    <FiClock className="inline mr-1" />
                    Start Time
                  </label>
                  <select
                    value={booking.startHour}
                    onChange={(e) => handleStartHourChange(e.target.value)}
                    className="form-input"
                  >
                    {START_HOURS.map((h) => (
                      <option key={h} value={h}>
                        {fmt(h)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">End Time</label>
                  <select
                    value={booking.endHour}
                    onChange={(e) =>
                      setBooking((b) => ({
                        ...b,
                        endHour: Number(e.target.value),
                      }))
                    }
                    className="form-input"
                  >
                    {validEndHours.map((h) => (
                      <option key={h} value={h}>
                        {fmt(h)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-sky-50 dark:bg-sky-900/30 border border-sky-100 dark:border-sky-800 rounded-xl p-4">
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Total Cost
                </p>
                <p className="font-display text-2xl font-bold text-sky-700 dark:text-sky-400">
                  ${totalCost}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                  {fmt(booking.startHour)} – {fmt(booking.endHour)} ·{" "}
                  {booking.endHour - booking.startHour} hour(s)
                </p>
              </div>

              <div>
                <label className="form-label">Special Note (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Any special requirements…"
                  value={booking.specialNote}
                  onChange={(e) =>
                    setBooking((b) => ({ ...b, specialNote: e.target.value }))
                  }
                  className="form-input resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setBookingOpen(false)}
                  className="btn-secondary flex-1 justify-center"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBook}
                  disabled={bookingLoading}
                  className="btn-primary flex-1 justify-center"
                >
                  <FiCheck /> {bookingLoading ? "Booking…" : "Confirm Booking"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteOpen}
        title="Delete Room"
        message="Are you sure you want to permanently delete this room? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </>
  );
}
