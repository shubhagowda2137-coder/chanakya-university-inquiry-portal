import React from "react";

import {
  Link
} from "react-router-dom";

function Footer() {

  return (

    <footer
      style={{
        background:
          "linear-gradient(135deg,#0F172A,#1E40AF)",
        color:
          "white",
        padding:
          "60px 50px 20px"
      }}
    >

      <div className="container">

        <div className="row">

          {/* University Info */}
          <div className="col-md-4 mb-4">

            <h2
              className="fw-bold"
            >
              Chanakya University
            </h2>

            <p
              style={{
                fontSize:
                  "18px",
                marginTop:
                  "20px",
                lineHeight:
                  "1.8"
              }}
            >
              Empowering students
              through quality
              education and
              innovation.
            </p>

          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">

            <h2
              style={{
                color:
                  "#D4AF37"
              }}
            >
              Quick Links
            </h2>

            <div
              className="d-flex flex-column gap-3 mt-4"
            >

              <Link
                to="/"
                className="footer-link"
              >
                Home
              </Link>

              <Link
                to="/courses"
                className="footer-link"
              >
                Courses
              </Link>

              <Link
                to="/faculty"
                className="footer-link"
              >
                Faculty
              </Link>

              <Link
                to="/hostel"
                className="footer-link"
              >
                Hostel
              </Link>

              <Link
                to="/transport"
                className="footer-link"
              >
                Transport
              </Link>

            </div>

          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">

            <h2
              style={{
                color:
                  "#D4AF37"
              }}
            >
              Contact
            </h2>

            <div
              className="mt-4"
              style={{
                lineHeight:
                  "3"
              }}
            >

              <p>
                Bangalore,
                Karnataka
              </p>

              <p>
                +91 9876543210
              </p>

              <p>
                info@chanakya.edu.in
              </p>

            </div>

          </div>

        </div>

        <hr
          style={{
            borderColor:
              "rgba(255,255,255,0.2)"
          }}
        />

        <div
          className="text-center mt-4"
        >

          <p
            style={{
              fontSize:
                "18px"
            }}
          >
            © 2026 Chanakya
            University.
            All Rights Reserved.
          </p>

        </div>

      </div>

      <style>
        {`
        .footer-link{
          color:white;
          text-decoration:none;
          font-size:18px;
          transition:0.3s;
        }

        .footer-link:hover{
          color:#D4AF37;
          transform:translateX(5px);
        }
        `}
      </style>

    </footer>

  );
}

export default Footer;