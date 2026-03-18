"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function BookingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Basic Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".fade-up, .stagger-1, .stagger-2").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target);
    const payload = {
      firstName: formData.get("first_name"),
      lastName: formData.get("last_name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      dateOfBirth: formData.get("date_of_birth"),
      vehicle: formData.get("vehicle"),
      pickupDate: formData.get("pickup_date"),
      returnDate: formData.get("return_date"),
      pickupTime: formData.get("pickup_time"),
      pickupLocation: formData.get("pickup_location"),
      driversLicense: formData.get("drivers_license"),
      licenseState: formData.get("license_state"),
      licenseExpiry: formData.get("license_expiry"),
      notes: formData.get("notes"),
      source: "Website Reservation Request",
    };

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert("There was an error submitting your request. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="page-hero" aria-labelledby="booking-heading">
        <div className="page-hero-bg" aria-hidden="true">
          <img src="/submission_1.jpg" alt="" loading="eager" />
        </div>
        <div className="container page-hero-content">
          <div className="section-label fade-up">Reserve Your Ride</div>
          <h1 className="display-lg fade-up stagger-1" id="booking-heading">Book a Vehicle</h1>
          <p className="body-lg fade-up stagger-2">Submit your reservation request and we'll confirm availability within 24 hours.</p>
        </div>
      </section>

      <section className="section-pad" aria-label="Booking form">
        <div className="container">
          <div className="booking-layout">
            <div className="booking-form-card fade-up">
              {!isSubmitted ? (
                <>
                  <h2>Reservation Request</h2>
                  <p className="subtitle">Fields marked <span style={{ color: "var(--accent)" }}>*</span> are required. We'll contact you within 24 hours to confirm.</p>

                  <form id="booking-form" onSubmit={handleSubmit}>
                    <div className="form-section-label">Personal Information</div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="first-name">First Name <span className="req">*</span></label>
                        <input type="text" id="first-name" name="first_name" placeholder="John" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="last-name">Last Name <span className="req">*</span></label>
                        <input type="text" id="last-name" name="last_name" placeholder="Smith" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email Address <span className="req">*</span></label>
                        <input type="email" id="email" name="email" placeholder="john@example.com" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number <span className="req">*</span></label>
                        <input type="tel" id="phone" name="phone" placeholder="+1 (727) 000-0000" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="dob">Date of Birth <span className="req">*</span></label>
                      <input type="date" id="dob" name="date_of_birth" required />
                    </div>

                    <hr className="form-divider" />

                    <div className="form-section-label">Vehicle & Rental Details</div>
                    <div className="form-group">
                      <label htmlFor="vehicle">Vehicle Selection <span className="req">*</span></label>
                      <select id="vehicle" name="vehicle" required defaultValue="">
                        <option value="" disabled>Select a vehicle…</option>
                        <optgroup label="Exotic Fleet">
                          <option value="lamborghini-urus-2019">Lamborghini Urus 2019 — $1,599/day</option>
                          <option value="ferrari-california-2017">Ferrari California T 2017 — $1,099/day</option>
                          <option value="mclaren-mp4-2014">McLaren MP4-12C 2014 — $3,499/day</option>
                          <option value="bentley-bentayga-2017">Bentley Bentayga 2017 — $799/day</option>
                          <option value="lamborghini-huracan">Lamborghini Huracán — Contact for rate</option>
                          <option value="bmw-i8-2016">BMW i8 2016 — $599/day</option>
                          <option value="corvette-c8-2020-699">Corvette C8 2020 — $699/day</option>
                          <option value="corvette-c8-2020-999">Corvette C8 2020 — $999/day</option>
                          <option value="corvette-c7-2019">Corvette C7 2019 — $349/day</option>
                          <option value="corvette-stingray-2018">Corvette Stingray 2018 — $449/day</option>
                        </optgroup>
                        <optgroup label="Standard Fleet">
                          <option value="standard-sedan">Standard Sedan</option>
                          <option value="standard-suv">Standard SUV</option>
                          <option value="standard-minivan">Full Size Minivan</option>
                          <option value="mercedes-s-class">Mercedes S-Class</option>
                          <option value="other">Other / Not Sure</option>
                        </optgroup>
                      </select>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="pickup-date">Pick-Up Date <span className="req">*</span></label>
                        <input type="date" id="pickup-date" name="pickup_date" required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="return-date">Return Date <span className="req">*</span></label>
                        <input type="date" id="return-date" name="return_date" required />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="pickup-time">Pick-Up Time</label>
                        <input type="time" id="pickup-time" name="pickup_time" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="pickup-location">Pick-Up Location</label>
                        <select id="pickup-location" name="pickup_location" defaultValue="">
                          <option value="" disabled>Select location…</option>
                          <option value="st-pete">St. Petersburg, FL</option>
                          <option value="tampa">Tampa, FL</option>
                          <option value="clearwater">Clearwater, FL</option>
                          <option value="palmetto">Palmetto, FL</option>
                          <option value="other">Other — specify in notes</option>
                        </select>
                      </div>
                    </div>

                    <hr className="form-divider" />

                    <div className="form-section-label">Driver Information</div>
                    <div className="form-group">
                      <label htmlFor="license">Driver's License Number <span className="req">*</span></label>
                      <input type="text" id="license" name="drivers_license" placeholder="FL-XXXXXXXXX" required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="license-state">License State</label>
                        <input type="text" id="license-state" name="license_state" placeholder="FL" maxLength={2} />
                      </div>
                      <div className="form-group">
                        <label htmlFor="license-exp">License Expiry</label>
                        <input type="date" id="license-exp" name="license_expiry" />
                      </div>
                    </div>

                    <hr className="form-divider" />

                    <div className="form-section-label">Additional Notes</div>
                    <div className="form-group">
                      <label htmlFor="notes">Special Requests or Questions</label>
                      <textarea id="notes" name="notes" placeholder="Any special requests, questions, or details about your rental…"></textarea>
                    </div>

                    <hr className="form-divider" />
                    <div className="form-check">
                      <input type="checkbox" id="terms" name="agree_terms" required />
                      <label htmlFor="terms">
                        I agree to the <Link href="/policy">Terms &amp; Conditions</Link> and <Link href="/policy">Privacy Policy</Link>. I understand that vehicle availability is first come, first served, unless a reservation is made 2 days prior to pick-up with a non-refundable deposit. <span className="req">*</span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input type="checkbox" id="age-confirm" name="age_confirm" required />
                      <label htmlFor="age-confirm">
                        I confirm that I am 21 years of age or older and hold a valid driver's license. <span className="req">*</span>
                      </label>
                    </div>

                    <button type="submit" className="btn btn-accent btn-submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Reservation Request"}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </form>
                </>
              ) : (
                <div className="form-success" style={{ display: "block" }}>
                  <div className="success-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#CDFF00" strokeWidth="2.5" width="28" height="28"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h3>Request Received!</h3>
                  <p>Thank you for your reservation request. Our team will review your submission and contact you within 24 hours to confirm availability and next steps.</p>
                  <Link href="/" className="btn btn-accent" style={{ marginTop: "24px", width: "fit-content", marginLeft: "auto", marginRight: "auto" }}>Back to Home</Link>
                </div>
              )}
            </div>

            <aside className="booking-sidebar fade-up stagger-2">
              <div className="booking-sidebar-img">
                <img src="/submission_1.jpg" alt="Exotic rental car" loading="lazy" />
              </div>

              <div className="booking-info-card">
                <h4>Booking Policy</h4>
                <div className="booking-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
                  <p><strong>First Come, First Served</strong>All vehicles are reserved on a first come, first served basis without a deposit.</p>
                </div>
                <div className="booking-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                  <p><strong>Reserve in Advance</strong>Guarantee your vehicle by booking 2 days prior with a non-refundable deposit.</p>
                </div>
                <div className="booking-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  <p><strong>Valid License Required</strong>A valid driver's license and proof of insurance are required at pick-up.</p>
                </div>
                <div className="booking-info-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></svg>
                  <p><strong>Age Requirement</strong>Drivers must be 21 years of age or older.</p>
                </div>
                <div className="deposit-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  Non-Refundable Deposit Secures Your Date
                </div>
              </div>

              <div className="booking-info-card">
                <h4>Need Help?</h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: "1.6", marginBottom: "16px" }}>Our team is available to assist with any questions about availability, vehicle selection, or special arrangements.</p>
                <a href="tel:+17276253116" className="btn btn-outline" style={{ width: "100%", justifyContent: "center", marginBottom: "10px" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .81h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.11 8.5a16 16 0 006.35 6.35l1.05-1.05a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                  +1 (727) 625-3116
                </a>
                <Link href="/contact" className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }}>Send a Message</Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
      
      <style jsx>{`
        .visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
        .fade-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
      `}</style>
    </>
  );
}
