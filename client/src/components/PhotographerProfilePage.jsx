import React, { useState } from "react";
import { useParams } from "react-router-dom";

function PhotographerProfilePage({ photographers }) {
  const { id } = useParams();
  const photographer = photographers.find((p) => p.id === Number(id));

  const [showInquiryModal, setShowInquiryModal] = useState(false);

  if (!photographer) {
    return <div>Photographer not found</div>;
  }

  return (
    <div className="profile-page">
      <h1>{photographer.name}</h1>
      <p><em>{photographer.bio}</em></p>

      <div>
        <strong>Styles:</strong> {photographer.styles.join(", ")}
      </div>
      <div>
        <strong>Tags:</strong> {photographer.tags.join(", ")}
      </div>
      <div>
        <strong>Price:</strong> ₹{photographer.price}
      </div>

      <h2>Gallery</h2>
      <div className="gallery-grid" style={{ display: "flex", gap: 10 }}>
        {photographer.portfolio.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Portfolio image ${idx + 1}`}
            style={{ width: 150, height: 150, objectFit: "cover" }}
          />
        ))}
      </div>

      <h2>Reviews</h2>
      <div className="reviews">
        {photographer.reviews.map((review, idx) => (
          <div key={idx} style={{ borderBottom: "1px solid #ddd", marginBottom: 10 }}>
            <strong>{review.name}</strong> - Rating: {review.rating} / 5
            <p>{review.comment}</p>
            <small>{review.date}</small>
          </div>
        ))}
      </div>

      <button onClick={() => setShowInquiryModal(true)}>Send Inquiry</button>

      {showInquiryModal && (
        <InquiryModal
          photographerName={photographer.name}
          onClose={() => setShowInquiryModal(false)}
        />
      )}
    </div>
  );
}

// Inquiry Modal Component
function InquiryModal({ photographerName, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Inquiry sent to ${photographerName}!\nDetails:\n${JSON.stringify(formData, null, 2)}`);
    onClose();
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div style={{ background: "#fff", padding: 20, borderRadius: 8, width: 300 }}>
        <h3>Send Inquiry to {photographerName}</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Your Name:<br />
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Your Email:<br />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Message:<br />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit">Send</button>
          <button type="button" onClick={onClose} style={{ marginLeft: 10 }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default PhotographerProfilePage;
