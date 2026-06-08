import React from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  FaGraduationCap,
  FaArrowRight
} from "react-icons/fa";

function Home() {

  const navigate =
    useNavigate();

  return (

    <div
      style={{
        background:
          "#F8FAFC",
        minHeight:
          "100vh"
      }}
    >

      {/* Hero Section */}
      <section
        style={{
          background:
            "linear-gradient(135deg,#0F172A,#1E40AF)",
          minHeight:
            "90vh",
          display:
            "flex",
          alignItems:
            "center",
          padding:
            "60px 80px",
          borderBottomLeftRadius:
            "40px",
          borderBottomRightRadius:
            "40px"
        }}
      >

        <div className="container">

          <div className="row align-items-center">

            {/* Left Side */}
            <div className="col-lg-6">

              <span
                style={{
                  background:
                    "rgba(255,255,255,0.1)",
                  color:
                    "#D4AF37",
                  padding:
                    "8px 16px",
                  borderRadius:
                    "30px",
                  fontSize:
                    "14px",
                  fontWeight:
                    "600"
                }}
              >
                Excellence In Education
              </span>

              <h1
                style={{
                  color:
                    "white",
                  fontSize:
                    "58px",
                  fontWeight:
                    "800",
                  marginTop:
                    "25px",
                  lineHeight:
                    "1.2"
                }}
              >
                Welcome To
                <br />

                <span
                  style={{
                    color:
                      "#D4AF37"
                  }}
                >
                  Chanakya University
                </span>
              </h1>

              <p
                style={{
                  color:
                    "#E2E8F0",
                  fontSize:
                    "19px",
                  marginTop:
                    "20px",
                  lineHeight:
                    "1.8"
                }}
              >
                Empowering future
                leaders with
                world-class education,
                innovation, and
                excellence.
              </p>

              {/* Buttons */}
              <div
                className="d-flex gap-3 mt-4"
              >

                <button
                  className="btn fw-bold"
                  style={{
                    background:
                      "#D4AF37",
                    color:
                      "#0F172A",
                    padding:
                      "12px 26px",
                    borderRadius:
                      "10px",
                    fontSize:
                      "16px"
                  }}
                  onClick={() =>
  window.dispatchEvent(
    new Event(
      "openInquiry"
    )
  )
}
                >
                  Register Inquiry
                </button>

                <button
                  className="btn fw-bold"
                  style={{
                    border:
                      "2px solid #D4AF37",
                    color:
                      "#D4AF37",
                    padding:
                      "12px 26px",
                    borderRadius:
                      "10px",
                    fontSize:
                      "16px"
                  }}
                  onClick={() =>
                    navigate(
                      "/courses"
                    )
                  }
                >
                  Explore Courses

                  {" "}

                  <FaArrowRight />
                </button>

              </div>

            </div>

            {/* Right Side */}
            <div className="col-lg-6 text-center">

              <div
                style={{
                  background:
                    "rgba(255,255,255,0.08)",
                  borderRadius:
                    "50%",
                  width:
                    "350px",
                  height:
                    "350px",
                  margin:
                    "auto",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  border:
                    "2px solid rgba(255,255,255,0.1)"
                }}
              >

                <FaGraduationCap
                  size={180}
                  color="#D4AF37"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Small Features Section */}
      <section
        className="container py-5"
      >

        <div className="row g-4">

          <div className="col-md-4">

            <div
              className="shadow-sm bg-white p-4 text-center"
              style={{
                borderRadius:
                  "20px"
              }}
            >

              <h4
                style={{
                  color:
                    "#1E40AF"
                }}
              >
                Expert Faculty
              </h4>

              <p>
                Learn from highly
                experienced
                professors and
                mentors.
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div
              className="shadow-sm bg-white p-4 text-center"
              style={{
                borderRadius:
                  "20px"
              }}
            >

              <h4
                style={{
                  color:
                    "#1E40AF"
                }}
              >
                Smart Campus
              </h4>

              <p>
                Modern classrooms,
                labs, and hostel
                facilities.
              </p>

            </div>

          </div>

          <div className="col-md-4">

            <div
              className="shadow-sm bg-white p-4 text-center"
              style={{
                borderRadius:
                  "20px"
              }}
            >

              <h4
                style={{
                  color:
                    "#1E40AF"
                }}
              >
                Career Growth
              </h4>

              <p>
                Build your future
                with placement and
                career guidance.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>

  );
}

export default Home;