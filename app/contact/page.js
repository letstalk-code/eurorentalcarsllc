"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
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

    document.querySelectorAll(".fade-up, .stagger-1, .stagger-2, .stagger-3").forEach((el) => {
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
      subject: formData.get("subject"),
      vehicle: formData.get("vehicle"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        alert("There was an error sending your message. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("There was an error sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="page-hero" aria-labelledby="contact-heading">
        <div className="page-hero-bg" aria-hidden="true">
          <img src="/contact_img.jpg" alt="" loading="eager" />
        </div>
        <div className="container page-hero-content">
          <div className="section-label fade-up">Get in Touch</div>
          <h1 className="display-lg fade-up stagger-1" id="contact-heading">Contact Us</h1>
          <p className="body-lg fade-up stagger-2">Have questions or need assistance? Our 24/7 support team is here to help.</p>
        </div>
      </section>

      <section className="section-pad" aria-label="Contact information and form">
        <div className="container">
          <div className="contact-layout">
            <div className="contact-info-grid fade-up">
              <div className="contact-info-card">
                <div className="section-label">Direct Contact</div>
                <h2>Connect with Euro LLC</h2>
                <div className="contact-details">
                  <a href="tel:+17276253116" className="contact-info-item" style={{ textDecoration: "none" }}>
                    <div className="contact-info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .81h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.11 8.5a16 16 0 006.35 6.35l1.05-1.05a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                    </div>
                    <div>
                      <h4>Call or Text</h4>
                      <p>+1 (727) 625-3116</p>
                    </div>
                  </a>
                  <a href="mailto:mailroom@eurorentalcarsllc.com" className="contact-info-item" style={{ textDecoration: "none" }}>
                    <div className="contact-info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                    </div>
                    <div>
                      <h4>Email Us</h4>
                      <p>mailroom@eurorentalcarsllc.com</p>
                    </div>
                  </a>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    </div>
                    <div>
                      <h4>Office Location</h4>
                      <p>360 Central Ave Suite 800<br />St. Petersburg, FL 33701</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    </div>
                    <div>
                      <h4>Operating Hours</h4>
                      <p>24/7 Support Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-container fade-up stagger-2">
              {!isSubmitted ? (
                <>
                  <div className="section-label">Send a Message</div>
                  <h2 className="display-sm" style={{ marginBottom: "12px" }}>How can we help?</h2>
                  <p className="body-md" style={{ marginBottom: "32px", color: "var(--text-secondary)" }}>Whether you have questions about specific vehicles, long-term rentals, or just want to say hello — we're here for you.</p>

                  <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
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
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" placeholder="+1 (727) 000-0000" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <select id="subject" name="subject" defaultValue="">
                          <option value="" disabled>Select subject…</option>
                          <option value="General Inquiry">General Inquiry</option>
                          <option value="Vehicle Availability">Vehicle Availability</option>
                          <option value="Long-Term Rental">Long-Term Rental</option>
                          <option value="Business Programs">Business Programs / Investments</option>
                          <option value="Support">Support / Existing Booking</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="vehicle">Vehicle of Interest</label>
                        <select id="vehicle" name="vehicle" defaultValue="">
                          <option value="" disabled>Select vehicle…</option>
                          <option value="N/A">General Interest</option>
                          <optgroup label="Exotic Fleet">
                            <option value="Lamborghini Urus">Lamborghini Urus</option>
                            <option value="Ferrari California T">Ferrari California T</option>
                            <option value="McLaren MP4-12C">McLaren MP4-12C</option>
                            <option value="Bentley Bentayga">Bentley Bentayga</option>
                            <option value="BMW i8">BMW i8</option>
                            <option value="Corvette C8">Corvette C8</option>
                            <option value="Corvette C7">Corvette C7</option>
                          </optgroup>
                          <optgroup label="Standard Fleet">
                            <option value="Standard Sedan">Standard Sedan</option>
                            <option value="Standard SUV">Standard SUV</option>
                            <option value="Full Size Minivan">Full Size Minivan</option>
                            <option value="Mercedes S-Class">Mercedes S-Class</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Your Message <span className="req">*</span></label>
                      <textarea id="message" name="message" placeholder="How can we help you today?" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-accent btn-submit" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </button>
                  </form>
                </>
              ) : (
                <div className="form-success" style={{ display: "block", textAlign: "left", padding: "0" }}>
                  <div className="success-icon" style={{ marginLeft: "0" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#CDFF00" strokeWidth="2.5" width="28" height="28"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out to Euro LLC. We have received your message and will get back to you as soon as possible (usually within a few business hours).</p>
                  <button onClick={() => setIsSubmitted(false)} className="btn btn-ghost" style={{ marginTop: "16px", padding: "0" }}>Send another message</button>
                </div>
              )}
            </div>
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
        .stagger-3 { transition-delay: 0.3s; }
      `}</style>
    </>
  );
}
