"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <Link href="/" className="nav-logo" aria-label="Euro LLC — Home">
          <svg viewBox="0 0 200 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <polygon points="8,22 16,8 24,22 16,36" fill="#CDFF00" />
            <text x="32" y="17" fontFamily="'Bebas Neue',sans-serif" fontSize="20" fill="#CDFF00" letterSpacing="2">
              EURO LLC
            </text>
            <text x="32" y="35" fontFamily="'Bebas Neue',sans-serif" fontSize="14" fill="#FFFFFF" letterSpacing="3">
              LUXURY RENTAL AGENCY
            </text>
          </svg>
        </Link>
        <ul className="nav-links" role="list">
          <li><Link href="/" className={pathname === "/" ? "active" : ""}>Home</Link></li>
          <li><Link href="/fleet" className={pathname === "/fleet" ? "active" : ""}>Fleet</Link></li>
          <li><Link href="/exotic-fleet" className={pathname === "/exotic-fleet" ? "active" : ""}>Exotic Fleet</Link></li>
          <li><Link href="/programs" className={pathname === "/programs" ? "active" : ""}>Programs</Link></li>
          <li><Link href="/policy" className={pathname === "/policy" ? "active" : ""}>Policy</Link></li>
          <li><Link href="/contact" className={pathname === "/contact" ? "active" : ""}>Contact</Link></li>
        </ul>
        <div className="nav-cta">
          <Link href="/booking" className="btn btn-accent">
            Book Now
          </Link>
        </div>
        <button className={`nav-toggle ${isMenuOpen ? "active" : ""}`} aria-label="Toggle menu" onClick={toggleMenu} aria-expanded={isMenuOpen}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <nav className={`nav-mobile ${isMenuOpen ? "active" : ""}`} aria-label="Mobile navigation">
        <Link href="/">Home</Link>
        <Link href="/fleet">Fleet</Link>
        <Link href="/exotic-fleet">Exotic Fleet</Link>
        <Link href="/programs">Programs</Link>
        <Link href="/policy">Policy</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/booking" className="btn btn-accent" style={{ borderRadius: "9999px" }}>
          Book Now
        </Link>
      </nav>
      
      <style jsx global>{`
        .nav-mobile {
          transform: translateY(-100%);
          transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1), opacity 0.3s;
          opacity: 0;
          pointer-events: none;
        }
        .nav-mobile.active {
          transform: translateY(0);
          opacity: 1;
          pointer-events: all;
        }
        .nav-toggle span {
          transition: all 0.3s ease;
        }
        .nav-toggle.active span:nth-child(1) { transform: translateY(8px) rotate(45deg); }
        .nav-toggle.active span:nth-child(2) { opacity: 0; }
        .nav-toggle.active span:nth-child(3) { transform: translateY(-8px) rotate(-45deg); }
      `}</style>
    </>
  );
}
