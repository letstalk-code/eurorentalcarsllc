"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ExoticFleetPage() {
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

  const exotics = [
    {
      name: "Lamborghini Urus (2019)",
      img: "/lamborghini_urus.jpg",
      price: "$1,599/day",
      hp: "650 HP",
      topSpeed: "190 MPH",
      zeroToSixty: "3.6s",
      badge: "Featured SUV",
      desc: "The world's first Super Sport Utility Vehicle. Unmatched performance meets everyday usability with a powerful 4.0 liter V8 biturbo engine."
    },
    {
      name: "McLaren MP4-12C (2014)",
      img: "/mclaren_mp4.jpg",
      price: "$3,499/day",
      hp: "592 HP",
      topSpeed: "207 MPH",
      zeroToSixty: "3.1s",
      badge: "Supercar Elite",
      desc: "Formula 1 technology brought to the road. Precision engineering, carbon fiber construction, and a top speed that commands respect."
    },
    {
      name: "Ferrari California T (2017)",
      img: "/ferrari_california.jpg",
      price: "$1,099/day",
      hp: "553 HP",
      topSpeed: "196 MPH",
      zeroToSixty: "3.6s",
      badge: "Classic Italian",
      desc: "Elegance meets speed. A refined grand tourer with a folding hardtop, allowing you to experience the Florida sunshine in pure luxury."
    },
    {
      name: "Bentley Bentayga (2017)",
      img: "/bentley_bentayga.jpg",
      price: "$799/day",
      hp: "600 HP",
      topSpeed: "187 MPH",
      zeroToSixty: "4.0s",
      badge: "Ultra Luxury",
      desc: "The pinnacle of luxury SUVs. Handcrafted excellence paired with a massive W12 engine for a refined yet powerful driving experience."
    },
    {
      name: "BMW i8 (2016)",
      img: "/bmw_i8.jpg",
      price: "$599/day",
      hp: "357 HP",
      topSpeed: "155 MPH",
      zeroToSixty: "4.2s",
      badge: "Futuristic Design",
      desc: "A hybrid supercar that looks like it's from the future. Sustainable performance with head-turning butterfly doors and modern interior."
    },
    {
      name: "Corvette C8 (2020) — White",
      img: "/corvette_c8_2.jpg",
      price: "$999/day",
      hp: "495 HP",
      topSpeed: "194 MPH",
      zeroToSixty: "2.9s",
      badge: "Mid-Engine Power",
      desc: "The legendary American sports car reimagined. Better balance, sharper handling, and supercar-level performance at your fingertips."
    },
    {
      name: "Corvette C8 (2020) — Orange",
      img: "/corvette_c8_1.jpg",
      price: "$699/day",
      hp: "495 HP",
      topSpeed: "194 MPH",
      zeroToSixty: "2.9s",
      badge: "Mid-Engine Power",
      desc: "Experience the pulse-pounding performance of the mid-engine C8. Speed, precision, and aggressive styling that demands attention."
    },
  ];

  return (
    <>
      <Navbar />

      <section className="page-hero" aria-labelledby="exotic-heading">
        <div className="page-hero-bg" aria-hidden="true">
          <img src="/mclaren_mp4.jpg" alt="" loading="eager" />
        </div>
        <div className="container page-hero-content">
          <div className="section-label fade-up">The Collection</div>
          <h1 className="display-lg fade-up stagger-1" id="exotic-heading">Exotic Fleet</h1>
          <p className="body-lg fade-up stagger-2">Pulse-pounding performance meets peerless luxury. Explore our selection of world-class supercars and prestige vehicles.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="fleet-grid">
            {exotics.map((car, i) => (
              <article key={i} className="fleet-card fade-up">
                <div className="fleet-card-badge">{car.badge}</div>
                <div className="fleet-card-img">
                  <img src={car.img} alt={car.name} loading="lazy" />
                </div>
                <div className="fleet-card-body">
                  <div className="fleet-card-header">
                    <h3>{car.name}</h3>
                    <div className="fleet-price">{car.price}</div>
                  </div>
                  <p className="body-sm">{car.desc}</p>
                  <div className="fleet-specs-strip">
                    <div className="fleet-spec">
                      <span className="fleet-spec-label">HP</span>
                      <span className="fleet-spec-val">{car.hp}</span>
                    </div>
                    <div className="fleet-spec">
                      <span className="fleet-spec-label">Top Speed</span>
                      <span className="fleet-spec-val">{car.topSpeed}</span>
                    </div>
                    <div className="fleet-spec">
                      <span className="fleet-spec-label">0–60 MPH</span>
                      <span className="fleet-spec-val">{car.zeroToSixty}</span>
                    </div>
                  </div>
                  <div className="fleet-card-actions">
                    <Link href="/booking" className="btn btn-accent">Request Booking</Link>
                    <Link href="/contact" className="btn btn-outline" style={{ border: "none" }}>Enquire</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: "80px", textAlign: "center", maxWidth: "680px", marginLeft: "auto", marginRight: "auto" }} className="fade-up">
            <div className="section-label">General Fleet</div>
            <h2 className="display-sm">Looking for practical luxury?</h2>
            <p className="body-md" style={{ color: "var(--text-secondary)", marginTop: "12px", marginBottom: "32px" }}>Browse our standard fleet for premium sedans, SUVs, and minivans at affordable rates.</p>
            <Link href="/fleet" className="btn btn-outline">View Standard Fleet</Link>
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
