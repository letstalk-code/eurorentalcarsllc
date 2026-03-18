"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
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

    document.querySelectorAll(".fade-up, .fade-in, .stagger-1, .stagger-2, .stagger-3, .stagger-4").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      
      {/* HERO SECTION */}
      <section className="hero" aria-label="Hero — Rent the luxury. Own the thrill.">
        <video className="hero-video" autoPlay muted loop playsInline aria-hidden="true">
          <source src="/euro_hero_video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" aria-hidden="true"></div>
        <div className="hero-content container">
          <div className="hero-counter">001</div>
          <h1>
            Rent the <em>luxury.</em>
            <br />
            Own the thrill.
          </h1>
          <p className="hero-sub">Florida&apos;s premier exotic car rental experience</p>
          <div className="hero-ctas">
            <Link href="/booking" className="btn btn-accent">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
              Rent a Car
            </Link>
            <Link href="/exotic-fleet" className="btn btn-outline">View Fleet</Link>
          </div>
        </div>
        <div className="hero-circle" aria-hidden="true">
          <div className="hero-circle-inner"></div>
        </div>
        <div className="hero-scroll" aria-hidden="true">Scroll</div>
      </section>

      {/* ABOUT SECTION */}
      <section className="about section-pad" id="about" aria-labelledby="about-heading">
        <div className="container">
          <div className="about-grid">
            <div className="about-image fade-up">
              <img src="/hero_location.jpg" alt="Luxury car steering wheel interior" loading="lazy" decoding="async" />
              <div className="about-badge">
                <div className="about-badge-num">24/7</div>
                <div className="about-badge-text">Support<br />Available</div>
              </div>
            </div>
            <div className="about-content">
              <div className="section-label fade-up">About Us</div>
              <h2 className="display-md fade-up stagger-1" id="about-heading">
                From exotic sports cars to luxury sedans and SUVs, Euro Rental Cars&apos; Exotic Collection offers an exceptional selection and trusted, personalized service.
              </h2>
              <p className="body-lg fade-up stagger-2">
                Our friendly Support Team is available to help you 24 hours a day, seven days a week. We look forward to hearing from you!
              </p>
              <p className="body-md fade-up stagger-3">
                Come experience the freedoms of a car rental booking from Euro Rental Cars in our beautiful Florida location. Our cars are available for pick up in cities, airports, and neighborhoods near you.
              </p>
              <Link href="/contact" className="btn btn-accent fade-up stagger-4">
                Learn More
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE SECTION */}
      <section className="showcase" id="showcase" aria-labelledby="showcase-heading">
        <div className="container">
          <div className="section-header">
            <div className="section-label fade-up">Arrive in Style</div>
            <h2 className="display-md fade-up stagger-1" id="showcase-heading">Featured Vehicles</h2>
          </div>
        </div>
        <div className="showcase-inner">
          <div className="showcase-brand-bg" aria-hidden="true">
            <span>LAMBORGHINI</span>
          </div>
          <div className="showcase-grid">
            <div className="showcase-info">
              <div className="showcase-num">001</div>
              <h3 className="display-sm showcase-name">Lamborghini Urus</h3>
              <p className="body-md showcase-desc">The world&apos;s first Super Sport Utility Vehicle. Unmatched performance meets everyday usability.</p>
              <div className="showcase-price">
                <span className="showcase-price-val" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 40px)", color: "var(--accent)" }}>$1,599</span>
                <span style={{ fontSize: "13px", color: "var(--text-muted)", fontFamily: "var(--font-body)", marginLeft: "4px" }}>/ day</span>
              </div>
              <div className="showcase-nav">
                <button className="showcase-prev" aria-label="Previous vehicle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                </button>
                <button className="showcase-next" aria-label="Next vehicle">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </div>
              <Link href="/booking" className="btn btn-accent" style={{ marginTop: "8px", width: "fit-content" }}>Book Now</Link>
            </div>
            <div className="showcase-image">
              <img src="/lamborghini_urus.jpg" alt="Lamborghini Urus 2019 SUV" loading="lazy" />
            </div>
            <div className="showcase-specs">
              <div className="spec-card">
                <div className="spec-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                </div>
                <div>
                  <div className="spec-value">650 HP</div>
                  <div className="spec-label">Horsepower</div>
                </div>
              </div>
              <div className="spec-card">
                <div className="spec-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                </div>
                <div>
                  <div className="spec-value">190 MPH</div>
                  <div className="spec-label">Top Speed</div>
                </div>
              </div>
              <div className="spec-card">
                <div className="spec-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                </div>
                <div>
                  <div className="spec-value">2019</div>
                  <div className="spec-label">Year</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS SECTION */}
      <section className="brands section-pad" id="brands" aria-labelledby="brands-heading">
        <div className="container">
          <div className="section-header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div className="section-label fade-up">Popular Exotic &amp; Luxury Rental Brands</div>
              <h2 className="display-sm fade-up stagger-1" id="brands-heading">World-Class Brands</h2>
            </div>
            <Link href="/exotic-fleet" className="btn btn-accent fade-up stagger-2">View All Vehicles</Link>
          </div>
          <div className="brands-row fade-up stagger-2">
            <div className="brand-item"><span>Lamborghini</span></div>
            <div className="brand-item"><span>Ferrari</span></div>
            <div className="brand-item"><span>McLaren</span></div>
            <div className="brand-item"><span>Bentley</span></div>
            <div className="brand-item"><span>BMW</span></div>
            <div className="brand-item"><span>Corvette</span></div>
            <div className="brand-item"><span>Porsche</span></div>
            <div className="brand-item"><span>Mercedes</span></div>
          </div>
        </div>
      </section>

      {/* SERVICE SECTION */}
      <section className="service-section" id="service" aria-labelledby="service-heading">
        <div className="service-bg" aria-hidden="true">
          <img src="/submission_4.jpg" alt="" loading="lazy" />
        </div>
        <div className="container section-pad">
          <div className="service-content">
            <div className="section-label fade-up">Why Choose Us</div>
            <h2 className="display-md fade-up stagger-1" id="service-heading">Superior Customer Service</h2>
            <p className="body-lg fade-up stagger-2">
              Euro Rental Cars provides expert service and support for an outstanding customer experience. Our caring customer service department strives to go above and beyond.
            </p>
            <p className="body-md fade-up stagger-3" style={{ marginTop: "12px" }}>
              Our 24/7 support team is available to all renters at all times. Come experience the freedoms of a car rental booking from Euro Rental Cars in our beautiful Florida location.
            </p>
            <Link href="/contact" className="btn btn-accent fade-up stagger-4" style={{ marginTop: "32px" }}>
              Contact Us
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <div className="contact-strip" aria-label="Contact information">
        <div className="container">
          <div className="contact-strip-grid">
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </div>
              <div>
                <div className="contact-info-label">Location</div>
                <div className="contact-info-value">360 Central Ave Suite 800<br />St. Petersburg, FL 33701</div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.9a16 16 0 006.18 6.18l1.27-.52a2 2 0 012.11.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
              </div>
              <div>
                <div className="contact-info-label">Phone</div>
                <div className="contact-info-value"><a href="tel:+17276253116">+1 (727) 625-3116</a></div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              <div>
                <div className="contact-info-label">Email</div>
                <div className="contact-info-value"><a href="mailto:mailroom@eurorentalcarsllc.com">mailroom@eurorentalcarsllc.com</a></div>
              </div>
            </div>
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              </div>
              <div>
                <div className="contact-info-label">Hours</div>
                <div className="contact-info-value">24/7 Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
        .stagger-4 { transition-delay: 0.4s; }
      `}</style>
    </>
  );
}
