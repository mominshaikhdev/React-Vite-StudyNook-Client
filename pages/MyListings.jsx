import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiPlusSquare, FiBookOpen } from "react-icons/fi";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmModal from "../components/ConfirmModal";
import api from "../utils/api";

export default function MyListings() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const fetchRooms = () => {
    api
      .get("/api/rooms/my-listings")
      .then((res) => setRooms(res.data.rooms || res.data))
      .catch(() => setRooms([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/api/rooms/${deleteId}`);
      toast.success("Room deleted successfully");
      setRooms((r) => r.filter((x) => x._id !== deleteId));
    } catch {
      toast.error("Failed to delete room");
    }
    setDeleteId(null);
  };

  return (
    <>
      <Helmet>
        <title>StudyNook – My Listings</title>
      </Helmet>
      <div className="page-enter max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100 mb-1">
              My Listings
            </h1>
            <p className="text-slate-500 dark:text-slate-400">
              Rooms you've listed on StudyNook.
            </p>
          </div>
          <Link to="/add-room" className="btn-primary shrink-0">
            <FiPlusSquare /> Add New Room
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : rooms.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
            <FiBookOpen className="mx-auto mb-4 w-14 h-14 text-slate-200 dark:text-slate-600" />
            <h3 className="font-display text-xl font-bold text-slate-700 dark:text-slate-200 mb-2">
              No listings yet
            </h3>
            <p className="text-slate-400 dark:text-slate-500 mb-6 text-sm">
              Add your first study room and start earning.
            </p>
            <Link to="/add-room" className="btn-primary">
              Add a Room
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
            <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-700">
              <thead className="bg-slate-50 dark:bg-slate-900">
                <tr>
                  {[
                    "Room",
                    "Floor",
                    "Capacity",
                    "Rate",
                    "Bookings",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-3.5 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                {rooms.map((room) => (
                  <tr
                    key={room._id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            room.image ||
                            "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=100&q=60"
                          }
                          alt={room.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-100 dark:border-slate-700 shrink-0"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">
                            {room.name}
                          </p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 line-clamp-1 max-w-[200px]">
                            {room.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {room.floor || "—"}
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {room.capacity} ppl
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      ${room.hourlyRate}/hr
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {room.bookingCount ?? 0}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/rooms/${room._id}/edit`}
                          className="p-2 text-sky-700 dark:text-sky-400 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-lg transition"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </Link>
                        <button
                          onClick={() => setDeleteId(room._id)}
                          className="p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Room"
        message="Are you sure you want to permanently delete this room?"
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </>
  );
}
