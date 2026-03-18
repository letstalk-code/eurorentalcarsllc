"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function PolicyPage() {
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

      <section className="page-hero" aria-labelledby="policy-heading">
        <div className="page-hero-bg" aria-hidden="true">
          <img src="/mercedes_s.jpg" alt="" loading="eager" />
        </div>
        <div className="container page-hero-content">
          <div className="section-label fade-up">Legal &amp; Terms</div>
          <h1 className="display-lg fade-up stagger-1" id="policy-heading">Policy</h1>
          <p className="body-lg fade-up stagger-2">Rental policy, privacy practices, and terms &amp; conditions.</p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container">
          <div className="policy-layout">
            <aside className="fade-up">
              <nav className="policy-toc" aria-label="Policy sections">
                <h4>Contents</h4>
                <ul>
                  <li><a href="#rental-requirements">Rental Requirements</a></li>
                  <li><a href="#reservations">Reservations &amp; Deposits</a></li>
                  <li><a href="#insurance">Insurance &amp; Liability</a></li>
                  <li><a href="#vehicle-use">Vehicle Use Policy</a></li>
                  <li><a href="#fuel">Fuel Policy</a></li>
                  <li><a href="#fees">Fees &amp; Charges</a></li>
                  <li><a href="#cancellation">Cancellations &amp; Refunds</a></li>
                  <li><a href="#exotic">Exotic Vehicle Policy</a></li>
                  <li><a href="#privacy">Privacy Policy</a></li>
                  <li><a href="#terms">Terms &amp; Conditions</a></li>
                </ul>
              </nav>
            </aside>

            <div className="policy-content fade-up stagger-1">
              <div style={{ marginBottom: "40px" }}>
                <div className="policy-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  Last Updated: January 2025
                </div>
                <p className="body-lg">Please read all policies carefully before booking. By renting a vehicle from Euro LLC, you agree to all terms outlined below.</p>
              </div>

              <section id="rental-requirements">
                <h2>Rental Requirements</h2>
                <p>To rent a vehicle from Euro LLC, all drivers must meet the following requirements:</p>
                <ul>
                  <li>Valid driver's license (U.S. or international) — must be at least 21 years of age</li>
                  <li>Valid credit or debit card in the primary renter's name for security deposit</li>
                  <li>Proof of full-coverage auto insurance or purchase of our rental insurance coverage</li>
                  <li>Drivers under 25 may be subject to a young driver surcharge</li>
                  <li>All drivers must present their license at the time of pick-up</li>
                  <li>International renters must provide a valid passport in addition to their driver's license</li>
                </ul>
                <div className="policy-highlight">
                  <p><strong>Age Requirement for Exotic Vehicles:</strong> Renters must be at least 25 years of age to operate any vehicle in our exotic fleet. No exceptions.</p>
                </div>
              </section>

              <section id="reservations">
                <h2>Reservations &amp; Deposits</h2>
                <p>All rental bookings are on a first come, first served basis unless a reservation is made at least 2 days prior to your pick-up date.</p>
                <h3>Reservation Deposits</h3>
                <p>A non-refundable deposit is required to secure your reservation. Deposit amounts vary by vehicle class:</p>
                <ul>
                  <li>Standard fleet vehicles: $150 deposit</li>
                  <li>Luxury vehicles: $300 deposit</li>
                  <li>Exotic fleet vehicles: $500–$1,000 deposit (varies by vehicle)</li>
                </ul>
                <h3>Security Deposits</h3>
                <p>A separate security deposit (hold) is placed on your credit card at the time of pick-up. This hold will be released within 5–7 business days following the return of the vehicle in satisfactory condition.</p>
                <ul>
                  <li>Standard fleet: $500 security hold</li>
                  <li>Luxury vehicles: $1,000 security hold</li>
                  <li>Exotic fleet: $2,500–$5,000 security hold (varies by vehicle)</li>
                </ul>
              </section>

              <section id="insurance">
                <h2>Insurance &amp; Liability</h2>
                <p>All renters are required to carry insurance coverage for the duration of the rental period. You may provide your own full-coverage auto insurance or purchase coverage through us.</p>
                <h3>Your Own Insurance</h3>
                <p>If using personal insurance, you must provide proof of full-coverage auto insurance that extends to rental vehicles. Liability-only policies are not accepted. We reserve the right to verify coverage before releasing any vehicle.</p>
                <h3>Rental Insurance Options</h3>
                <p>Euro LLC offers insurance packages for renters who do not have qualifying personal coverage. Rates are available at the time of booking.</p>
                <div className="policy-highlight">
                  <p><strong>Important:</strong> Renters are fully liable for any damage, theft, or loss that occurs during the rental period that is not covered by their insurance provider.</p>
                </div>
              </section>

              <section id="vehicle-use">
                <h2>Vehicle Use Policy</h2>
                <p>All vehicles are to be operated in a lawful and responsible manner. The following activities are strictly prohibited:</p>
                <ul>
                  <li>Operating the vehicle under the influence of alcohol, drugs, or any impairing substance</li>
                  <li>Use of the vehicle for any racing, speed testing, or competitive driving event</li>
                  <li>Transporting the vehicle outside of the agreed geographic area without prior written consent</li>
                  <li>Subletting or re-renting the vehicle to a third party</li>
                  <li>Using the vehicle for commercial transportation services (rideshare, taxi, delivery, etc.)</li>
                  <li>Off-road driving of any kind</li>
                  <li>Smoking in any vehicle — a $500 cleaning fee applies</li>
                  <li>Transporting pets without prior approval — a $250 cleaning fee may apply</li>
                </ul>
                <p>Violation of any vehicle use policies may result in immediate termination of the rental agreement, forfeiture of the security deposit, and additional charges for damages.</p>
              </section>

              <section id="fuel">
                <h2>Fuel Policy</h2>
                <p>All vehicles are provided with a full tank of fuel at the time of pick-up. Vehicles must be returned with a full tank of fuel.</p>
                <ul>
                  <li>If the vehicle is returned with less than a full tank, a refueling fee will be charged based on current market rates plus a $35 service fee</li>
                  <li>All exotic and luxury vehicles require premium-grade fuel (93 octane or higher)</li>
                  <li>Using incorrect fuel grades may result in additional charges for engine servicing</li>
                </ul>
              </section>

              <section id="fees">
                <h2>Fees &amp; Charges</h2>
                <p>The following fees may be assessed in addition to the base rental rate:</p>
                <ul>
                  <li><strong style={{ color: "var(--text-primary)" }}>Young Driver Surcharge:</strong> $25/day for drivers aged 21–24</li>
                  <li><strong style={{ color: "var(--text-primary)" }}>Additional Driver Fee:</strong> $15/day per additional authorized driver</li>
                  <li><strong style={{ color: "var(--text-primary)" }}>Late Return Fee:</strong> One hour of grace is provided; fees assessed per full hour after grace period</li>
                  <li><strong style={{ color: "var(--text-primary)" }}>Early Return:</strong> No refund for unused rental days</li>
                  <li><strong style={{ color: "var(--text-primary)" }}>Smoking/Pet Cleaning Fee:</strong> $250–$500 depending on extent</li>
                  <li><strong style={{ color: "var(--text-primary)" }}>Toll Charges:</strong> Renter is responsible for all tolls incurred during rental period</li>
                  <li><strong style={{ color: "var(--text-primary)" }}>Traffic Violations:</strong> All fines and associated processing fees are the responsibility of the renter</li>
                </ul>
              </section>

              <section id="cancellation">
                <h2>Cancellations &amp; Refunds</h2>
                <p>Reservation deposits are non-refundable in all circumstances. The following cancellation policy applies to all rentals:</p>
                <ul>
                  <li><strong style={{ color: "var(--text-primary)" }}>72+ hours before pick-up:</strong> No additional charges beyond the non-refundable deposit</li>
                  <li><strong style={{ color: "var(--text-primary)" }}>24–72 hours before pick-up:</strong> One day's rental rate charged in addition to the deposit</li>
                  <li><strong style={{ color: "var(--text-primary)" }}>Less than 24 hours / No-show:</strong> Full rental amount is charged</li>
                </ul>
                <p>Cancellations must be submitted in writing to <a href="mailto:mailroom@eurorentalcarsllc.com" style={{ color: "var(--accent)" }}>mailroom@eurorentalcarsllc.com</a> or by calling <a href="tel:+17276253116" style={{ color: "var(--accent)" }}>+1 (727) 625-3116</a>.</p>
              </section>

              <section id="exotic">
                <h2>Exotic Vehicle Policy</h2>
                <p>Exotic fleet vehicles are subject to additional requirements beyond the standard rental policy.</p>
                <h3>Eligibility</h3>
                <ul>
                  <li>Minimum age: 25 years old</li>
                  <li>Clean driving record — no DUI, reckless driving, or major violations within 5 years</li>
                  <li>Minimum credit score of 700 may be required for certain vehicles</li>
                  <li>Full-coverage insurance with comprehensive and collision coverage required</li>
                </ul>
                <h3>Operation</h3>
                <ul>
                  <li>All first-time exotic renters receive a mandatory vehicle walkthrough and orientation</li>
                  <li>Mileage limits may apply — overage fees are assessed per mile over the limit</li>
                  <li>GPS tracking is active in all exotic vehicles at all times</li>
                  <li>Any mechanical issue or warning light must be reported immediately — continued driving after warning indicators may void insurance coverage</li>
                </ul>
                <div className="policy-highlight">
                  <p><strong>Black Ruby Membership Club:</strong> Members receive priority booking, reduced deposits, and exclusive access to prestige vehicles and locations. Contact us to inquire about membership eligibility.</p>
                </div>
              </section>

              <section id="privacy">
                <h2>Privacy Policy</h2>
                <p>Euro LLC is committed to protecting your personal information. This policy describes how we collect, use, and safeguard your data.</p>
                <h3>Information We Collect</h3>
                <ul>
                  <li>Contact information: name, email address, phone number, mailing address</li>
                  <li>Identification: driver's license number, date of birth</li>
                  <li>Payment information: credit/debit card details (processed securely — not stored by us)</li>
                  <li>Rental history and vehicle preferences</li>
                  <li>Website usage data via cookies and analytics tools</li>
                </ul>
                <h3>How We Use Your Information</h3>
                <ul>
                  <li>To process and manage your rental reservations</li>
                  <li>To verify identity and eligibility to rent</li>
                  <li>To communicate about your booking, promotions, and company updates</li>
                  <li>To comply with legal obligations and law enforcement requests</li>
                  <li>To improve our website and service offerings</li>
                </ul>
                <h3>Data Sharing</h3>
                <p>We do not sell your personal information to third parties. We may share data with trusted service providers (payment processors, insurance partners) strictly for operational purposes. All partners are contractually obligated to maintain data confidentiality.</p>
                <h3>Cookies</h3>
                <p>Our website uses cookies for analytics and to improve the user experience. You may disable cookies in your browser settings; however, some features may not function as expected.</p>
                <h3>Your Rights</h3>
                <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at <a href="mailto:mailroom@eurorentalcarsllc.com" style={{ color: "var(--accent)" }}>mailroom@eurorentalcarsllc.com</a>.</p>
              </section>

              <section id="terms">
                <h2>Terms &amp; Conditions</h2>
                <p>By renting a vehicle from Euro LLC, you acknowledge that you have read, understood, and agree to all policies and terms outlined on this page.</p>
                <h3>Agreement</h3>
                <p>The rental agreement is a binding contract between the renter and Euro LLC. All authorized drivers are bound by this agreement and are jointly and severally liable for any violations, damages, or charges incurred during the rental period.</p>
                <h3>Governing Law</h3>
                <p>This agreement is governed by the laws of the State of Florida. Any disputes arising from this agreement shall be subject to the exclusive jurisdiction of the courts of Pinellas County, Florida.</p>
                <h3>Limitation of Liability</h3>
                <p>Euro LLC shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our vehicles or services. Our total liability shall not exceed the total amount paid by the renter for the rental period in question.</p>
                <h3>Modifications</h3>
                <p>Euro LLC reserves the right to update these policies at any time. Changes will be posted on this page with an updated effective date. Continued use of our services constitutes acceptance of the revised terms.</p>
                <div className="policy-highlight">
                  <p>Questions about our policies? Contact us at <strong><a href="mailto:mailroom@eurorentalcarsllc.com" style={{ color: "var(--accent)" }}>mailroom@eurorentalcarsllc.com</a></strong> or call <strong><a href="tel:+17276253116" style={{ color: "var(--accent)" }}>+1 (727) 625-3116</a></strong>.</p>
                </div>
              </section>

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
      `}</style>
    </>
  );
}
