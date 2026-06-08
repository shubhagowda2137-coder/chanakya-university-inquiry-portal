import React, {
  useState,
  useEffect
} from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import InquiryModal from "./components/InquiryModal";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculty";
import Hostel from "./pages/Hostel";
import Transport from "./pages/Transport";

function App() {

  const [showModal,
    setShowModal] =
    useState(false);

  useEffect(() => {

  setShowModal(
    true
  );

  const handleOpen =
    () => {

      setShowModal(
        true
      );

    };

  window.addEventListener(
    "openInquiry",
    handleOpen
  );

  return () => {

    window.removeEventListener(
      "openInquiry",
      handleOpen
    );

  };

}, []);

  return (

    <BrowserRouter>

      <Navbar
        openModal={() =>
          setShowModal(
            true
          )
        }
      />

      <InquiryModal
        show={
          showModal
        }
        onClose={() =>
          setShowModal(
            false
          )
        }
      />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/faculty"
          element={<Faculty />}
        />

        <Route
          path="/hostel"
          element={<Hostel />}
        />

        <Route
          path="/transport"
          element={<Transport />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>

  );
}

export default App;