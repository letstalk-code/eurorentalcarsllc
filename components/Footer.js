import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" aria-label="Euro LLC — Home">
              <svg viewBox="0 0 200 44" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <polygon points="8,22 16,8 24,22 16,36" fill="#CDFF00"></polygon>
                <text x="32" y="17" fontFamily="'Bebas Neue',sans-serif" fontSize="20" fill="#CDFF00" letterSpacing="2">
                  EURO LLC
                </text>
                <text x="32" y="35" fontFamily="'Bebas Neue',sans-serif" fontSize="14" fill="#FFFFFF" letterSpacing="3">
                  LUXURY RENTAL AGENCY
                </text>
              </svg>
            </Link>
            <p>Florida's premier exotic and luxury car rental experience. Serving St. Petersburg, Tampa, Clearwater, and Palmetto.</p>
            <div className="footer-social">
              <a href="https://www.facebook.com/libertyrentalcars" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/fleet">Fleet</Link></li>
              <li><Link href="/exotic-fleet">Exotic Fleet</Link></li>
              <li><Link href="/booking">Book Now</Link></li>
              <li><Link href="/programs">Programs</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><Link href="/fleet">Reservations</Link></li>
              <li><Link href="/exotic-fleet">Vehicles</Link></li>
              <li><Link href="/programs">Promotions</Link></li>
              <li><Link href="/programs">Businesses</Link></li>
              <li><Link href="/contact">Customer Service</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:mailroom@eurorentalcarsllc.com">mailroom@eurorentalcarsllc.com</a></li>
              <li><a href="tel:+17276253116">+1 (727) 625-3116</a></li>
              <li><Link href="/contact">360 Central Ave Suite 800<br />St. Petersburg, FL 33701</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Euro LLC. All Rights Reserved. &nbsp;|&nbsp; <Link href="/policy">Privacy Policy</Link> &nbsp;|&nbsp; <Link href="/policy">Terms &amp; Conditions</Link></p>
          <a href="#" className="back-to-top" aria-label="Back to top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
            Back to top
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M18 15l-6-6-6 6"></path>
            </svg>
          </a>
        </div>
      </div>
      <div className="credit-bar">Created with <span className="credit-heart">❤</span> at <a href="https://creativelygrow.com" target="_blank" rel="noopener noreferrer" className="credit-link">Creatively Grow</a></div>
    </footer>
  );
}
