"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ProgramsPage() {
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

  return (
    <>
      <Navbar />

      <section className="page-hero" aria-labelledby="programs-heading">
        <div className="page-hero-bg" aria-hidden="true">
          <img src="/slideshow_3.jpg" alt="" loading="eager" />
        </div>
        <div className="container page-hero-content">
          <div className="section-label fade-up">Opportunities &amp; Benefits</div>
          <h1 className="display-lg fade-up stagger-1" id="programs-heading">Euro Programs</h1>
          <p className="body-lg fade-up stagger-2">Exclusive programs designed for members, renters, and future professionals.</p>
        </div>
      </section>

      <section className="section-pad" aria-labelledby="programs-desc-heading">
        <div className="container">

          <div style={{ maxWidth: "680px" }} className="fade-up">
            <div className="section-label">3 Programs</div>
            <h2 className="display-sm stagger-1" id="programs-desc-heading">Built for Every Stage</h2>
            <p className="body-md stagger-2" style={{ marginTop: "12px", color: "var(--text-secondary)" }}>
              Whether you're renting monthly, starting your career, or looking to invest in the luxury transportation industry — Euro Rental Cars has a program for you.
            </p>
          </div>

          <div className="programs-grid">

            {/* Program 1: Rent n Advance */}
            <article className="program-card fade-up" aria-labelledby="program-rna-heading">
              <div className="program-card-img">
                <img src="/slideshow_2.jpg" alt="Luxury car rental — Rent n Advance program" loading="lazy" />
              </div>
              <div className="program-card-body">
                <div className="program-number">01</div>
                <div className="section-label" style={{ marginBottom: "0" }}>Monthly Rental</div>
                <h2 id="program-rna-heading">Rent n Advance</h2>
                <p>
                  Commit to a monthly rental and unlock exclusive discounts on our full fleet. The Rent n Advance program rewards loyalty — the longer you rent, the more you save. Perfect for professionals, commuters, and anyone who needs a premium vehicle on a regular basis.
                </p>
                <div className="program-highlights">
                  <div className="program-highlight-item">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    Monthly rate discounts on all vehicle classes
                  </div>
                  <div className="program-highlight-item">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    Priority vehicle availability for members
                  </div>
                  <div className="program-highlight-item">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    Flexible pick-up and drop-off options
                  </div>
                </div>
                <Link href="/contact" className="btn btn-accent" style={{ width: "fit-content" }}>Learn More</Link>
              </div>
            </article>

            {/* Program 2: Summer Internship */}
            <article className="program-card reverse fade-up" aria-labelledby="program-intern-heading">
              <div className="program-card-img">
                <img src="/submission_4.jpg" alt="Summer Internship program — Euro Rental Cars" loading="lazy" />
              </div>
              <div className="program-card-body">
                <div className="program-number">02</div>
                <div className="section-label" style={{ marginBottom: "0" }}>Career Development</div>
                <h2 id="program-intern-heading">Summer Internship Program</h2>
                <p>
                  Gain hands-on experience in the luxury automotive and hospitality industry. Our summer internship program offers motivated individuals the opportunity to learn vehicle operations, customer relations, business management, and more — all within a dynamic, fast-paced environment.
                </p>
                <div className="program-highlights">
                  <div className="program-highlight-item">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    Real-world luxury automotive experience
                  </div>
                  <div className="program-highlight-item">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                    Mentorship from industry professionals
                  </div>
                </div>
                <div className="internship-roles">
                  <span className="role-pill">Customer Relations</span>
                  <span className="role-pill">Fleet Operations</span>
                  <span className="role-pill">Marketing</span>
                </div>
                <Link href="/contact" className="btn btn-accent" style={{ width: "fit-content", marginTop: "8px" }}>Apply Now</Link>
              </div>
            </article>

          </div>

          {/* Program 3: Euro Investment */}
          <article className="program-card-investment fade-up" style={{ marginTop: "32px" }} aria-labelledby="program-invest-heading">
            <div className="program-investment-img">
              <img src="/slideshow_1.jpg" alt="Euro Investment Program — luxury car fleet investment" loading="lazy" />
            </div>
            <div className="program-investment-body">
              <div className="investment-badge">
                <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                Program 03 — Exclusive Opportunity
              </div>
              <div className="section-label">Grow With Us</div>
              <h2 id="program-invest-heading">Euro Investment Program</h2>
              <p>
                The Euro Investment Program is designed for forward-thinking individuals who want to participate in the growth of a premier luxury car rental operation. As a program participant, you contribute to the expansion of our fleet and infrastructure — and share in the returns that come with it.
              </p>
              <div className="investment-points">
                <div className="investment-point">
                  <h4>Fleet Expansion</h4>
                  <p>Investment funds are used directly to acquire and maintain additional luxury and exotic vehicles.</p>
                </div>
                <div className="investment-point">
                  <h4>Revenue Share</h4>
                  <p>Participants receive a share of rental revenue tied to the vehicles their investment supports.</p>
                </div>
                <div className="investment-point">
                  <h4>Transparent Reporting</h4>
                  <p>Regular performance reports and direct communication with the Euro Rental Cars team.</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-accent">Inquire About Investing</Link>
                <Link href="/contact" className="btn btn-outline">Schedule a Call</Link>
              </div>
            </div>
          </article>

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
