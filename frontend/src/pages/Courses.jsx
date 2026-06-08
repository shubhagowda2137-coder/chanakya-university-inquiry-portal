import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import {
  FaBookOpen,
  FaSearch
} from "react-icons/fa";

function Courses() {

  const [courses,
    setCourses] =
    useState([]);

  const [search,
    setSearch] =
    useState("");

  const [selectedDept,
    setSelectedDept] =
    useState("All");

  const [selectedCourse,
    setSelectedCourse] =
    useState(null);

  useEffect(() => {

    fetchCourses();

  }, []);

  const fetchCourses =
    async () => {

      try {

        const response =
          await API.get(
            "courses/"
          );

        setCourses(
          response.data.results ||
          []
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };

  const departments =
    [
      "All",
      ...new Set(
        courses.map(
          (
            c
          ) =>
            c.department_name
        )
      )
    ];

  const filteredCourses =
    courses.filter(
      (
        course
      ) => {

        const matchesSearch =
          course.course_name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          course.specialization
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesDept =
          selectedDept ===
            "All" ||

          course.department_name ===
            selectedDept;

        return (
          matchesSearch &&
          matchesDept
        );

      }
    );

  return (

    <div
      style={{
        background:
          "#F8FAFC",
        minHeight:
          "100vh",
        paddingBottom:
          "60px"
      }}
    >

      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg,#0F172A,#1E40AF)",
          borderBottomLeftRadius:
            "35px",
          borderBottomRightRadius:
            "35px",
          padding:
            "45px 30px 70px"
        }}
      >

        <div className="container text-center">

          <h1
            className="fw-bold text-white"
            style={{
              fontSize:
                "48px"
            }}
          >
            Explore Our Courses
          </h1>

          <div
            style={{
              width:
                "80px",
              height:
                "4px",
              background:
                "#D4AF37",
              margin:
                "14px auto"
            }}
          />

          <p
            className="text-white"
            style={{
              fontSize:
                "18px"
            }}
          >
            Discover world-class
            programs at Chanakya
            University
          </p>

        </div>

      </div>

      <div className="container mt-5">

        {/* Search */}
        <div className="row justify-content-center mb-4">

          <div className="col-md-7">

            <div
              style={{
                position:
                  "relative"
              }}
            >

              <FaSearch
                style={{
                  position:
                    "absolute",
                  top:
                    "18px",
                  left:
                    "18px",
                  color:
                    "#64748B"
                }}
              />

              <input
                type="text"
                className="form-control shadow-sm"
                placeholder="Search courses..."
                value={
                  search
                }
                onChange={(
                  e
                ) =>
                  setSearch(
                    e.target
                      .value
                  )
                }
                style={{
                  borderRadius:
                    "18px",
                  padding:
                    "18px 18px 18px 50px",
                  border:
                    "none",
                  fontSize:
                    "18px"
                }}
              />

            </div>

          </div>

        </div>

        {/* Department Filter */}
        <div
          className="d-flex flex-wrap justify-content-center gap-3 mb-5"
        >

          {departments.map(
            (
              dept,
              index
            ) => (

              <button
                key={
                  index
                }
                className="btn fw-bold"
                onClick={() =>
                  setSelectedDept(
                    dept
                  )
                }
                style={{
                  background:
                    selectedDept ===
                    dept
                      ? "#1E40AF"
                      : "white",

                  color:
                    selectedDept ===
                    dept
                      ? "white"
                      : "#0F172A",

                  borderRadius:
                    "30px",

                  border:
                    "1px solid #CBD5E1",

                  padding:
                    "10px 24px"
                }}
              >
                {dept}
              </button>

            )
          )}

        </div>

        {/* Cards */}
        <div className="row g-4">

          {filteredCourses.map(
            (
              course
            ) => (

              <div
                className="col-lg-4 col-md-6"
                key={
                  course.id
                }
              >

                <div
                  className="course-card bg-white"
                  style={{
                    borderRadius:
                      "22px",
                    padding:
                      "22px",
                    height:
                      "100%",
                    boxShadow:
                      "0 4px 15px rgba(0,0,0,0.08)",
                    transition:
                      "0.3s ease"
                  }}
                >

                  <div
                    className="d-flex justify-content-between align-items-center"
                  >

                    <div
                      style={{
                        width:
                          "55px",
                        height:
                          "55px",
                        background:
                          "#D4AF37",
                        borderRadius:
                          "14px",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        justifyContent:
                          "center"
                      }}
                    >

                      <FaBookOpen
                        size={22}
                        color="#0F172A"
                      />

                    </div>

                    <span
                      style={{
                        background:
                          "#E0E7FF",
                        color:
                          "#1E40AF",
                        padding:
                          "8px 14px",
                        borderRadius:
                          "20px",
                        fontSize:
                          "13px",
                        fontWeight:
                          "600"
                      }}
                    >
                      {
                        course.course_type_display
                      }
                    </span>

                  </div>

                  <h4
                    className="fw-bold mt-4"
                    style={{
                      color:
                        "#0F172A"
                    }}
                  >
                    {
                      course.course_name
                    }
                  </h4>

                  <p
                    style={{
                      color:
                        "#475569"
                    }}
                  >
                    {
                      course.specialization
                    }
                  </p>

                  <p
                    style={{
                      color:
                        "#64748B",
                      fontSize:
                        "14px"
                    }}
                  >
                    {
                      course.department_name
                    }
                  </p>

                  <div
                    className="d-flex justify-content-between align-items-center mt-4"
                  >

                    <span
                      className="fw-bold"
                      style={{
                        color:
                          "#1E40AF"
                      }}
                    >
                      {
                        course.duration
                      }
                    </span>

                    <button
                      className="btn fw-bold"
                      style={{
                        background:
                          "#1E40AF",
                        color:
                          "white",
                        borderRadius:
                          "10px"
                      }}
                      onClick={() =>
                        setSelectedCourse(
                          course
                        )
                      }
                    >
                      View Details
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

      {/* Modal */}
      {selectedCourse && (

        <div
          style={{
            position:
              "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.5)",
            display:
              "flex",
            justifyContent:
              "center",
            alignItems:
              "center",
            zIndex:
              9999
          }}
        >

          <div
            className="bg-white p-4"
            style={{
              borderRadius:
                "18px",
              width:
                "400px",
              maxWidth:
                "90%"
            }}
          >

            <h3 className="fw-bold">
              Course Details
            </h3>

            <p>
              <strong>Course:</strong>{" "}
              {selectedCourse.course_name}
            </p>

            <p>
              <strong>Specialization:</strong>{" "}
              {selectedCourse.specialization}
            </p>

            <p>
              <strong>Department:</strong>{" "}
              {selectedCourse.department_name}
            </p>

            <p>
              <strong>Duration:</strong>{" "}
              {selectedCourse.duration}
            </p>

            <button
              className="btn w-100 mt-3"
              style={{
                background:
                  "#1E40AF",
                color:
                  "white"
              }}
              onClick={() =>
                setSelectedCourse(
                  null
                )
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

      <style>
        {`
        .course-card:hover{
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.14);
        }
        `}
      </style>

    </div>

  );
}

export default Courses;