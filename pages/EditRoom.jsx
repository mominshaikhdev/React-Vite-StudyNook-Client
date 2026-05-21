import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import RoomForm from "../components/RoomForm";
import LoadingSpinner from "../components/LoadingSpinner";
import useAuth from "../context/useAuth";
import api from "../utils/api";

export default function EditRoom() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get(`/api/rooms/${id}`)
      .then((res) => {
        const data = res.data.room || res.data;
        // Ownership check
        if (user && String(data.ownerId) !== String(user.id || user._id)) {
          toast.error("You are not the owner of this room.");
          navigate("/my-listings", { replace: true });
          return;
        }
        setRoom(data);
      })
      .catch(() => {
        toast.error("Room not found");
        navigate("/my-listings");
      })
      .finally(() => setPageLoading(false));
  }, [id, navigate, user]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      await api.put(`/api/rooms/${id}`, data);
      toast.success("Room updated successfully.");
      navigate(`/rooms/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update room");
    } finally {
      setSaving(false);
    }
  };

  if (pageLoading) return <LoadingSpinner fullPage />;

  return (
    <>
      <Helmet>
        <title>StudyNook – Edit Room</title>
      </Helmet>
      <div className="page-enter max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Edit Room
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Update your room details below.
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-8">
          {room && (
            <RoomForm
              initialValues={room}
              onSubmit={handleSubmit}
              loading={saving}
              submitLabel="Save Changes"
            />
          )}
        </div>
      </div>
    </>
  );
}
