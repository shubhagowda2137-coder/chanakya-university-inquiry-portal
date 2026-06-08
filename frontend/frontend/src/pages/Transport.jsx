import React, {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import {
  FaBus
} from "react-icons/fa";

function Transport() {

  const [routes,
    setRoutes] =
    useState([]);

  const [selectedRoute,
    setSelectedRoute] =
    useState(null);

  useEffect(() => {

    fetchRoutes();

  }, []);

  const fetchRoutes =
    async () => {

      try {

        const response =
          await API.get(
            "transport/routes/"
          );

        setRoutes(
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
            Transport Facilities
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
            Safe and reliable
            transportation for students
          </p>

        </div>

      </div>

      <div className="container mt-5">

        <div className="row g-4">

          {routes.map(
            (
              route
            ) => {

              const occupancy =
                route.occupancy_percentage;

              return (

                <div
                  className="col-lg-4 col-md-6"
                  key={
                    route.id
                  }
                >

                  <div
                    className="transport-card bg-white"
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

                        <FaBus
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
                          fontWeight:
                            "600"
                        }}
                      >
                        {
                          route.bus_count
                        }{" "}
                        Buses
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
                        route.route_name
                      }
                    </h4>

                    <p>
                      <strong>
                        Distance:
                      </strong>{" "}
                      {
                        route.distance_km
                      }{" "}
                      km
                    </p>

                    <p>
                      <strong>
                        Available Seats:
                      </strong>{" "}
                      {
                        route.total_available_seats
                      }
                      /
                      {
                        route.total_seats
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
                            `${occupancy}%`,
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
                          setSelectedRoute(
                            route
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
      {selectedRoute && (

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
              Route Details
            </h3>

            <p>
              <strong>Route:</strong>{" "}
              {
                selectedRoute.route_name
              }
            </p>

            <p>
              <strong>Starting Point:</strong>{" "}
              {
                selectedRoute.starting_point
              }
            </p>

            <p>
              <strong>Ending Point:</strong>{" "}
              {
                selectedRoute.ending_point
              }
            </p>

            <p>
              <strong>Distance:</strong>{" "}
              {
                selectedRoute.distance_km
              }{" "}
              km
            </p>

            <p>
              <strong>Seats:</strong>{" "}
              {
                selectedRoute.total_available_seats
              }
              /
              {
                selectedRoute.total_seats
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
                setSelectedRoute(
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
        .transport-card:hover{
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.14);
        }
        `}
      </style>

    </div>

  );
}

export default Transport;