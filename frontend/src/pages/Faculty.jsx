import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import {
  FaGraduationCap,
  FaSearch
} from "react-icons/fa";

function Faculty() {

  const [faculty,
    setFaculty] =
    useState([]);

  const [courses,
    setCourses] =
    useState([]);

  const [selectedCourse,
    setSelectedCourse] =
    useState("All");

  const [search,
    setSearch] =
    useState("");

  const [selectedFaculty,
    setSelectedFaculty] =
    useState(null);

  useEffect(() => {

    fetchFaculty();
    fetchCourses();

  }, []);

  const fetchFaculty =
    async () => {

      try {

        const response =
          await API.get(
            "faculty/"
          );

        setFaculty(
          response.data.results ||
          []
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };

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

  const filteredFaculty =
    faculty.filter(
      (
        teacher
      ) => {

        const matchesSearch =
          teacher.faculty_name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          teacher.department_name
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesCourse =
          selectedCourse ===
            "All" ||

          teacher.course_name ===
            selectedCourse;

        return (
          matchesSearch &&
          matchesCourse
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
            Faculty Members
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
            Meet our experienced
            professors and mentors
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
                placeholder="Search faculty..."
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

        {/* Course Filter */}
        <div
          className="d-flex flex-wrap justify-content-center gap-3 mb-5"
        >

          <button
            className="btn fw-bold"
            onClick={() =>
              setSelectedCourse(
                "All"
              )
            }
            style={{
              background:
                selectedCourse ===
                "All"
                  ? "#1E40AF"
                  : "white",

              color:
                selectedCourse ===
                "All"
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
            All
          </button>

          {[...new Set(
            courses.map(
              (
                c
              ) =>
                c.course_name
            )
          )].map(
            (
              course,
              index
            ) => (

              <button
                key={
                  index
                }
                className="btn fw-bold"
                onClick={() =>
                  setSelectedCourse(
                    course
                  )
                }
                style={{
                  background:
                    selectedCourse ===
                    course
                      ? "#1E40AF"
                      : "white",

                  color:
                    selectedCourse ===
                    course
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
                {course}
              </button>

            )
          )}

        </div>

        {/* Faculty Cards */}
        <div className="row g-4">

          {filteredFaculty.map(
            (
              teacher
            ) => (

              <div
                className="col-lg-4 col-md-6"
                key={
                  teacher.id
                }
              >

                <div
                  className="faculty-card bg-white"
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

                      <FaGraduationCap
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
                        teacher.designation
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
                      teacher.faculty_name
                    }
                  </h4>

                  <p
                    style={{
                      color:
                        "#475569"
                    }}
                  >
                    {
                      teacher.course_name
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
                      teacher.department_name
                    }
                  </p>

                  <div
                    className="d-flex justify-content-end mt-4"
                  >

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
                        setSelectedFaculty(
                          teacher
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
      {selectedFaculty && (

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
              Faculty Details
            </h3>

            <p>
              <strong>Name:</strong>{" "}
              {
                selectedFaculty.faculty_name
              }
            </p>

            <p>
              <strong>Designation:</strong>{" "}
              {
                selectedFaculty.designation
              }
            </p>

            <p>
              <strong>Department:</strong>{" "}
              {
                selectedFaculty.department_name
              }
            </p>

            <p>
              <strong>Course:</strong>{" "}
              {
                selectedFaculty.course_name
              }
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {
                selectedFaculty.email
              }
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
                setSelectedFaculty(
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
        .faculty-card:hover{
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.14);
        }
        `}
      </style>

    </div>

  );
}

export default Faculty;