import React from "react";
import {
  Link,
  useLocation
} from "react-router-dom";

import {
  FaGraduationCap
} from "react-icons/fa";

function Navbar({
  openModal
}) {

  const location =
    useLocation();

  const navStyle =
    (path) => ({
      color:
        location.pathname === path
          ? "#D4AF37"
          : "white",
      textDecoration:
        "none",
      fontWeight:
        "600"
    });

  return (

    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        background:
          "linear-gradient(135deg,#0F172A,#1E40AF)",
        padding:
          "12px 35px"
      }}
    >

      <div className="container-fluid">

        <Link
          to="/"
          className="navbar-brand d-flex align-items-center text-decoration-none"
        >

          <FaGraduationCap
            size={35}
            color="#D4AF37"
          />

          <span
            className="ms-2 text-white fw-bold"
          >
            Chanakya
            University
          </span>

        </Link>

        <div className="d-flex gap-4 align-items-center">

          <Link
            to="/"
            style={
              navStyle("/")
            }
          >
            Home
          </Link>

          <Link
            to="/courses"
            style={
              navStyle(
                "/courses"
              )
            }
          >
            Courses
          </Link>

          <Link
            to="/faculty"
            style={
              navStyle(
                "/faculty"
              )
            }
          >
            Faculty
          </Link>

          <Link
            to="/hostel"
            style={
              navStyle(
                "/hostel"
              )
            }
          >
            Hostel
          </Link>

          <Link
            to="/transport"
            style={
              navStyle(
                "/transport"
              )
            }
          >
            Transport
          </Link>

          <button
            onClick={
              openModal
            }
            className="btn fw-bold"
            style={{
              background:
                "#D4AF37",
              color:
                "#0F172A"
            }}
          >
            Register Now
          </button>

        </div>

      </div>

    </nav>

  );
}

export default Navbar;