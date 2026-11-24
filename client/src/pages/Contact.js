import { useState } from "react";
import "../styles/contact.css";

export default function Contact() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [popup, setPopup] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendMessage = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (data.success) {
        setPopup("✅ We will resolve your query soon!");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setPopup("❌ Something went wrong");
      }

      setTimeout(() => setPopup(""), 3000);

    } catch {
      setPopup("❌ Server error");
      setTimeout(() => setPopup(""), 3000);
    }
  };

  return (
    <div className="contact-page fade">

      {/* ⭐ POPUP */}
      {popup && <div className="popup">{popup}</div>}

      {/* HERO */}
      <div className="contact-hero">
        <div className="contact-hero-text">
          <h1>We’re Here to Help</h1>
          <p>Questions about orders, products, or delivery? Reach out anytime.</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="contact-wrapper">

        {/* INFO CARD */}
        <div className="contact-card info hover-up">

          <h3>FurniStyle Support</h3>

          <img
            src="https://images.unsplash.com/photo-1493666438817-866a91353ca9"
            alt="FurniStyle Showroom"
            className="contact-img"
          />

          <p className="tagline">
            Premium furniture solutions for modern living.
          </p>

          <div className="info-row"><span>📍</span><p>Bangalore, India</p></div>
          <div className="info-row"><span>📞</span><p>+91 98765 43210</p></div>
          <div className="info-row"><span>📧</span><p>support@furnistyle.com</p></div>
          <div className="info-row"><span>⏰</span><p>Mon–Sun : 9 AM – 9 PM</p></div>

          <p className="note">
            Our team responds within <b>24 hours</b>.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="contact-card form hover-up">
          <h3>Send Us a Message</h3>

          <div className="form-group">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" />
          </div>

          <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" />

          <textarea name="message" value={form.message} onChange={handleChange} rows="5" placeholder="Write your message here..." />

          <button onClick={sendMessage}>Send Message</button>
        </div>

      </div>

      {/* FOOTER */}
      <div className="contact-footer">
        <h4>Trusted by thousands of customers across India</h4>
        <p>FurniStyle delivers quality furniture with reliable service.</p>
      </div>

    </div>
  );
}