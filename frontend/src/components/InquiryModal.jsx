import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

function InquiryModal({
  show,
  onClose
}) {

  const [courses,
    setCourses] =
    useState([]);

  const [submitted,
    setSubmitted] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      student_name: "",
      interested_course: "",
      email: "",
      phone: "",
      consent: false
    });

  useEffect(() => {

    if (show) {
      fetchCourses();
    }

  }, [show]);

  const fetchCourses =
    async () => {

      try {

        const response =
          await API.get(
            "courses/"
          );

        console.log(
          response.data
        );

        setCourses(
          response.data.results ||
          response.data
        );

      } catch (error) {

        console.error(
          "Courses Error:",
          error
        );

      }

    };

  const handleChange =
    (e) => {

      const {
        name,
        value,
        type,
        checked
      } = e.target;

      setFormData({
        ...formData,
        [name]:
          type === "checkbox"
            ? checked
            : value
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        const payload = {
          student_name:
            formData.student_name,

          interested_course:
            parseInt(
              formData.interested_course
            ),

          email:
            formData.email,

          phone:
            formData.phone,

          consent:
            formData.consent
        };

        await API.post(
          "register/",
          payload
        );

        setSubmitted(
          true
        );

      } catch (error) {

        alert(
          JSON.stringify(
            error.response?.data
          )
        );

      }

    };

  if (!show) return null;

  return (

    <div
      style={{
        position:
          "fixed",
        top: 0,
        left: 0,
        width:
          "100%",
        height:
          "100%",
        background:
          "rgba(0,0,0,0.6)",
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
        className="bg-white"
        style={{
          width:
            "450px",
          borderRadius:
            "20px",
          overflow:
            "hidden"
        }}
      >

        {/* Header */}
        <div
          style={{
            background:
              "linear-gradient(135deg,#0F172A,#1E40AF)",
            padding:
              "20px",
            textAlign:
              "center",
            color:
              "white",
            position:
              "relative"
          }}
        >

          <button
            onClick={
              onClose
            }
            style={{
              position:
                "absolute",
              right:
                "20px",
              top:
                "15px",
              border:
                "none",
              background:
                "transparent",
              color:
                "white",
              fontSize:
                "22px",
              cursor:
                "pointer"
            }}
          >
            ×
          </button>

          <h3>
            Register Now
          </h3>

        </div>

        <div
          style={{
            padding:
              "25px"
          }}
        >

          {submitted ? (

            <div className="text-center">

              <h3
                style={{
                  color:
                    "green"
                }}
              >
                Inquiry Submitted ✓
              </h3>

              <p>
                Thank you!
                We’ll contact
                you soon.
              </p>

            </div>

          ) : (

            <form
              onSubmit={
                handleSubmit
              }
            >

              {/* Student Name */}
              <div className="mb-3">

                <label>
                  Student Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="student_name"
                  value={
                    formData.student_name
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* Course */}
              <div className="mb-3">

                <label>
                  Course
                </label>

                <select
                  className="form-control"
                  name="interested_course"
                  value={
                    formData.interested_course
                  }
                  onChange={
                    handleChange
                  }
                  required
                >

                  <option value="">
                    Select Course
                  </option>

                  {courses.map(
                    (course) => (

                      <option
                        key={
                          course.id
                        }
                        value={
                          course.id
                        }
                      >
                        {
                          course.course_name
                        }
                      </option>

                    )
                  )}

                </select>

              </div>

              {/* Email */}
              <div className="mb-3">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

              {/* Phone */}
              <div className="mb-3">

                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                  pattern="[0-9]{10}"
                  maxLength="10"
                  placeholder="Enter 10-digit phone number"
                  required
                />

              </div>

              {/* Consent */}
              <div className="form-check mb-3">

                <input
                  type="checkbox"
                  className="form-check-input"
                  name="consent"
                  checked={
                    formData.consent
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

                <label className="form-check-label">
                  I agree to be contacted
                </label>

              </div>

              <button
                type="submit"
                className="btn w-100"
                style={{
                  background:
                    "#1E40AF",
                  color:
                    "white"
                }}
              >
                Submit Inquiry
              </button>

            </form>

          )}

        </div>

      </div>

    </div>

  );
}

export default InquiryModal;