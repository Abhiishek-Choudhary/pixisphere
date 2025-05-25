import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryListingPage = ({ photographers }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [price, setPrice] = useState(20000);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  const stylesList = ["Traditional", "Candid", "Studio", "Outdoor"];
  const cities = [...new Set(photographers.map((p) => p.location))];

  if (!Array.isArray(photographers)) {
    return <div>Loading photographers...</div>;
  }

  // Apply all filters
  const filteredPhotographers = photographers
    .filter((p) =>
      p.tags.includes("Maternity") // Default category
    )
    .filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter((p) => p.price <= price)
    .filter((p) => p.rating >= ratingFilter)
    .filter((p) =>
      selectedStyles.length > 0
        ? p.styles.some((style) => selectedStyles.includes(style))
        : true
    )
    .filter((p) =>
      selectedCity ? p.location === selectedCity : true
    );

  // Apply sorting
  const sortedPhotographers = [...filteredPhotographers].sort((a, b) => {
    if (sortOption === "priceLowHigh") return a.price - b.price;
    if (sortOption === "ratingHighLow") return b.rating - a.rating;
    if (sortOption === "recent") return b.id - a.id; // Simulating "recent"
    return 0;
  });

  const visiblePhotographers = sortedPhotographers.slice(0, visibleCount);

  const handleStyleChange = (style) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter((s) => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  return (
    <div>
      <h1>Maternity Photographers</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, location or tag..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setVisibleCount(6);
        }}
        style={{ padding: "8px", marginBottom: "10px", width: "100%", maxWidth: "400px" }}
      />

      {/* Filters */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", margin: "1rem 0" }}>
        {/* Price Range */}
        <div>
          <label>Price: ₹0 - ₹{price}</label>
          <input
            type="range"
            min="0"
            max="30000"
            step="1000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        {/* Rating */}
        <div>
          <label>Rating:</label>
          <select onChange={(e) => setRatingFilter(Number(e.target.value))}>
            <option value="0">All</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="4.5">4.5+</option>
          </select>
        </div>

        {/* Styles */}
        <div>
          <label>Styles:</label>
          {stylesList.map((style) => (
            <div key={style}>
              <input
                type="checkbox"
                checked={selectedStyles.includes(style)}
                onChange={() => handleStyleChange(style)}
              />
              {style}
            </div>
          ))}
        </div>

        {/* City */}
        <div>
          <label>City:</label>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">All</option>
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
          </select>
        </div>

        {/* Sorting */}
        <div>
          <label>Sort By:</label>
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="">None</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="ratingHighLow">Rating: High to Low</option>
            <option value="recent">Recently Added</option>
          </select>
        </div>
      </div>

      {/* Photographers List */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {visiblePhotographers.length > 0 ? (
          visiblePhotographers.map((p) => (
            <div
              key={p.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                width: "250px",
              }}
            >
              <img
                src={p.profilePic}
                alt={p.name}
                style={{ width: "100%", height: "200px", objectFit: "cover" }}
              />
              <h3>{p.name}</h3>
              <p>{p.location}</p>
              <p>Rating: ⭐ {p.rating}</p>
              <p>Price: ₹{p.price}</p>
              <div>
                {p.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      marginRight: "5px",
                      background: "#eee",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                style={{ marginTop: 10 }}
                onClick={() => navigate(`/photographer/${p.id}`)}
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p>No photographers match your filters.</p>
        )}
      </div>

      {/* Load More */}
      {visibleCount < sortedPhotographers.length && (
        <button
          onClick={() => setVisibleCount((prev) => prev + 6)}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "4px",
            backgroundColor: "#333",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default CategoryListingPage;
