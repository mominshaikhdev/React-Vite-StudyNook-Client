import { useState, useEffect } from "react";
import {
  FiImage,
  FiMapPin,
  FiUsers,
  FiDollarSign,
  FiFileText,
} from "react-icons/fi";
import api from "../utils/api";

const FALLBACK_AMENITIES = [
  "Whiteboard",
  "Projector",
  "Wi-Fi",
  "Power Outlets",
  "Quiet Zone",
  "Air Conditioning",
];

const Field = ({ id, label, icon, error, children }) => (
  <div>
    <label className="form-label" htmlFor={id}>
      {icon} {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default function RoomForm({
  initialValues = {},
  onSubmit,
  loading,
  submitLabel = "Submit",
}) {
  const [amenityOptions, setAmenityOptions] = useState(FALLBACK_AMENITIES);

  useEffect(() => {
    api
      .get("/api/rooms/amenities")
      .then((res) => setAmenityOptions(res.data.amenities || FALLBACK_AMENITIES))
      .catch(() => setAmenityOptions(FALLBACK_AMENITIES));
  }, []);

  const [form, setForm] = useState({
    name: initialValues.name || "",
    description: initialValues.description || "",
    image: initialValues.image || "",
    floor: initialValues.floor || "",
    capacity: initialValues.capacity || "",
    hourlyRate: initialValues.hourlyRate || "",
    amenities: initialValues.amenities || [],
  });
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setErrors((e) => ({ ...e, [field]: "" }));
    setForm((f) => ({ ...f, [field]: value }));
  };

  const toggleAmenity = (a) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a)
        ? f.amenities.filter((x) => x !== a)
        : [...f.amenities, a],
    }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Room name is required";
    if (!form.description.trim()) errs.description = "Description is required";
    if (!form.image.trim()) errs.image = "Image URL is required";
    if (!form.capacity || form.capacity < 1)
      errs.capacity = "Valid capacity required";
    if (!form.hourlyRate || form.hourlyRate < 0)
      errs.hourlyRate = "Valid hourly rate required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      capacity: Number(form.capacity),
      hourlyRate: Number(form.hourlyRate),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <Field
        id="name"
        label="Room Name *"
        icon={<FiMapPin className="inline mr-1" />}
        error={errors.name}
      >
        <input
          id="name"
          type="text"
          placeholder="e.g. Quiet Corner Room A"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          className="form-input"
        />
      </Field>

      <Field
        id="description"
        label="Description *"
        icon={<FiFileText className="inline mr-1" />}
        error={errors.description}
      >
        <textarea
          id="description"
          rows={4}
          placeholder="Describe the room features, rules, atmosphere…"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          className="form-input resize-none"
        />
      </Field>

      <Field
        id="image"
        label="Image URL (from internet) *"
        icon={<FiImage className="inline mr-1" />}
        error={errors.image}
      >
        <input
          id="image"
          type="url"
          placeholder="https://example.com/room.jpg"
          value={form.image}
          onChange={(e) => set("image", e.target.value)}
          className="form-input"
        />
        {form.image && (
          <img
            src={form.image}
            alt="Preview"
            className="mt-2 rounded-lg h-36 w-full object-cover border border-slate-200 dark:border-slate-600"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field
          id="floor"
          label="Floor"
          icon={<FiMapPin className="inline mr-1" />}
        >
          <input
            id="floor"
            type="text"
            placeholder="e.g. 3rd Floor"
            value={form.floor}
            onChange={(e) => set("floor", e.target.value)}
            className="form-input"
          />
        </Field>
        <Field
          id="capacity"
          label="Capacity *"
          icon={<FiUsers className="inline mr-1" />}
          error={errors.capacity}
        >
          <input
            id="capacity"
            type="number"
            min={1}
            placeholder="e.g. 4"
            value={form.capacity}
            onChange={(e) => set("capacity", e.target.value)}
            className="form-input"
          />
        </Field>
        <Field
          id="hourlyRate"
          label="Hourly Rate ($) *"
          icon={<FiDollarSign className="inline mr-1" />}
          error={errors.hourlyRate}
        >
          <input
            id="hourlyRate"
            type="number"
            min={0}
            step={0.01}
            placeholder="e.g. 5"
            value={form.hourlyRate}
            onChange={(e) => set("hourlyRate", e.target.value)}
            className="form-input"
          />
        </Field>
      </div>

      <div>
        <p className="form-label">Amenities</p>
        <div className="flex flex-wrap gap-3">
          {amenityOptions.map((a) => (
            <label
              key={a}
              className="flex items-center gap-2 cursor-pointer select-none group"
            >
              <input
                type="checkbox"
                checked={form.amenities.includes(a)}
                onChange={() => toggleAmenity(a)}
                className="w-4 h-4 accent-sky-700"
              />
              <span
                className={`text-sm ${form.amenities.includes(a) ? "text-sky-700 dark:text-sky-400 font-medium" : "text-slate-600 dark:text-slate-300"}`}
              >
                {a}
              </span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full justify-center py-3 text-base"
      >
        {loading ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
