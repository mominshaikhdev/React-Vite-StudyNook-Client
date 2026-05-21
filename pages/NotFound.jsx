import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FiHome, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>StudyNook – Page Not Found</title>
      </Helmet>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 page-enter">
        <div className="w-20 h-20 bg-sky-100 dark:bg-sky-900/40 rounded-full flex items-center justify-center mb-6">
          <FiAlertCircle className="text-sky-700 dark:text-sky-400 w-10 h-10" />
        </div>
        <h1 className="font-display text-6xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          404
        </h1>
        <h2 className="font-display text-2xl font-bold text-slate-700 dark:text-slate-300 mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>
        <Link to="/" className="btn-primary text-base px-8 py-3">
          <FiHome /> Back to Home
        </Link>
      </div>
    </>
  );
}
