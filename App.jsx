import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import PageTransition from "./components/PageTransition";
import useAuth from "./context/useAuth";

import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRoom from "./pages/AddRoom";
import EditRoom from "./pages/EditRoom";
import MyListings from "./pages/MyListings";
import MyBookings from "./pages/MyBookings";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function PublicRoute({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/rooms"
              element={
                <PageTransition>
                  <Rooms />
                </PageTransition>
              }
            />
            <Route
              path="/rooms/:id"
              element={
                <PageTransition>
                  <RoomDetails />
                </PageTransition>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <PageTransition>
                    <Login />
                  </PageTransition>
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <PageTransition>
                    <Register />
                  </PageTransition>
                </PublicRoute>
              }
            />
            <Route
              path="/about"
              element={
                <PageTransition>
                  <About />
                </PageTransition>
              }
            />
            <Route
              path="/add-room"
              element={
                <PageTransition>
                  <PrivateRoute>
                    <AddRoom />
                  </PrivateRoute>
                </PageTransition>
              }
            />
            <Route
              path="/rooms/:id/edit"
              element={
                <PageTransition>
                  <PrivateRoute>
                    <EditRoom />
                  </PrivateRoute>
                </PageTransition>
              }
            />
            <Route
              path="/my-listings"
              element={
                <PageTransition>
                  <PrivateRoute>
                    <MyListings />
                  </PrivateRoute>
                </PageTransition>
              }
            />
            <Route
              path="/my-bookings"
              element={
                <PageTransition>
                  <PrivateRoute>
                    <MyBookings />
                  </PrivateRoute>
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#0ea5e9", secondary: "#fff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
        }}
      />
    </div>
  );
}
