"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function FleetPage() {
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

  const standardCars = [
    {
      name: "Standard Sedans",
      img: "/submission_2.jpg",
      price: "From $149/day",
      desc: "Comfortable and efficient city driving. Perfect for solo travelers and short trips in St. Pete and beyond."
    },
    {
      name: "Luxury SUVs",
      img: "/submission_3.jpg",
      price: "From $199/day",
      desc: "Spacious interiors with modern amenities. The ideal choice for families and groups who want to travel in style."
    },
    {
      name: "Full Size Minivans",
      img: "/submission_1.jpg",
      price: "From $179/day",
      desc: "Ultimate space and flexibility. Comfortably fits up to 7 passengers with ample room for luggage."
    },
    {
      name: "Mercedes S-Class",
      img: "/mercedes_s.jpg",
      price: "From $249/day",
      desc: "The pinnacle of German engineering and luxury. Experience the refined ride and advanced features of an executive saloon."
    },
  ];

  return (
    <>
      <Navbar />

      <section className="page-hero" aria-labelledby="fleet-heading">
        <div className="page-hero-bg" aria-hidden="true">
          <img src="/mercedes_s.jpg" alt="" loading="eager" />
        </div>
        <div className="container page-hero-content">
          <div className="section-label fade-up">Quality Rentals</div>
          <h1 className="display-lg fade-up stagger-1" id="fleet-heading">Full Fleet</h1>
          <p className="body-lg fade-up stagger-2">Browse our wide selection of standard and luxury vehicles for any occasion.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="fleet-grid">
            {standardCars.map((car, i) => (
              <article key={i} className="fleet-card fade-up">
                <div className="fleet-card-badge">Standard Fleet</div>
                <div className="fleet-card-img">
                  <img src={car.img} alt={car.name} loading="lazy" />
                </div>
                <div className="fleet-card-body">
                  <div className="fleet-card-header">
                    <h3>{car.name}</h3>
                    <div className="fleet-price">{car.price}</div>
                  </div>
                  <p className="body-sm">{car.desc}</p>
                  <div className="fleet-card-actions">
                    <Link href="/booking" className="btn btn-accent">Request Booking</Link>
                    <Link href="/contact" className="btn btn-outline" style={{ border: "none" }}>Enquire</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: "80px", textAlign: "center", maxWidth: "680px", marginLeft: "auto", marginRight: "auto" }} className="fade-up">
            <div className="section-label">Prestige Collection</div>
            <h2 className="display-sm">Ready for something exotic?</h2>
            <p className="body-md" style={{ color: "var(--text-secondary)", marginTop: "12px", marginBottom: "32px" }}>Explore our elite collection of supercars including Lamborghini, Ferrari, McLaren, and Bentley.</p>
            <Link href="/exotic-fleet" className="btn btn-accent">View Exotic Fleet</Link>
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
