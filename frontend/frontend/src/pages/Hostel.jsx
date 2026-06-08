import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import {
  FaBed
} from "react-icons/fa";

function Hostel() {

  const [hostels,
    setHostels] =
    useState([]);

  const [selectedHostel,
    setSelectedHostel] =
    useState(null);

  useEffect(() => {

    fetchHostels();

  }, []);

  const fetchHostels =
    async () => {

      try {

        const response =
          await API.get(
            "hostels/"
          );

        setHostels(
          response.data.results ||
          []
        );

      } catch (error) {

        console.error(
          error
        );

      }

    };

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
            Hostel Facilities
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
            Safe and comfortable
            accommodation for students
          </p>

        </div>

      </div>

      <div className="container mt-5">

        <div className="row g-4">

          {hostels.map(
            (
              hostel
            ) => {

              const availablePercent =
                (
                  hostel.total_available_rooms /
                  hostel.total_rooms
                ) * 100;

              return (

                <div
                  className="col-lg-4 col-md-6"
                  key={
                    hostel.id
                  }
                >

                  <div
                    className="hostel-card bg-white"
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

                        <FaBed
                          size={22}
                          color="#0F172A"
                        />

                      </div>

                      <span
                        style={{
                          background:
                            hostel.hostel_type ===
                            "Boys"
                              ? "#DBEAFE"
                              : "#FCE7F3",

                          color:
                            hostel.hostel_type ===
                            "Boys"
                              ? "#1E40AF"
                              : "#BE185D",

                          padding:
                            "8px 14px",

                          borderRadius:
                            "20px",

                          fontWeight:
                            "600"
                        }}
                      >
                        {
                          hostel.hostel_type_display
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
                        hostel.hostel_name
                      }
                    </h4>

                    <p>
                      <strong>
                        Available Rooms:
                      </strong>{" "}
                      {
                        hostel.total_available_rooms
                      }
                      /
                      {
                        hostel.total_rooms
                      }
                    </p>

                    {/* Progress Bar */}
                    <div
                      className="progress mb-3"
                      style={{
                        height:
                          "10px",
                        borderRadius:
                          "10px"
                      }}
                    >

                      <div
                        className="progress-bar"
                        style={{
                          width:
                            `${availablePercent}%`,
                          background:
                            "#1E40AF"
                        }}
                      />

                    </div>

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
                          setSelectedHostel(
                            hostel
                          )
                        }
                      >
                        View Details
                      </button>

                    </div>

                  </div>

                </div>

              );

            }
          )}

        </div>

      </div>

      {/* Modal */}
      {selectedHostel && (

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

            <h3
              className="fw-bold mb-3"
              style={{
                color:
                  "#0F172A"
              }}
            >
              Hostel Details
            </h3>

            <p>
              <strong>
                Name:
              </strong>{" "}
              {
                selectedHostel.hostel_name
              }
            </p>

            <p>
              <strong>
                Type:
              </strong>{" "}
              {
                selectedHostel.hostel_type_display
              }
            </p>

            <p>
              <strong>
                Address:
              </strong>{" "}
              {
                selectedHostel.address
              }
            </p>

            <p>
              <strong>
                Contact:
              </strong>{" "}
              {
                selectedHostel.contact_number
              }
            </p>

            <p>
              <strong>
                Available:
              </strong>{" "}
              {
                selectedHostel.total_available_rooms
              }
              /
              {
                selectedHostel.total_rooms
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
                setSelectedHostel(
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
        .hostel-card:hover{
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.14);
        }
        `}
      </style>

    </div>

  );
}

export default Hostel;