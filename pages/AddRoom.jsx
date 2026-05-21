import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import RoomForm from "../components/RoomForm";
import api from "../utils/api";

export default function AddRoom() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/api/rooms", data);
      toast.success("Room added successfully!");
      navigate("/my-listings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>StudyNook – Add Room</title>
      </Helmet>
      <div className="page-enter max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Add a Room
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            List your study space and start earning.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-8">
          <RoomForm
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="Add Room"
          />
        </div>
      </div>
    </>
  );
}
