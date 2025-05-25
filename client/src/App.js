import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryListingPage from "./components/CategoryListingPage";
import PhotographerProfilePage from "./components/PhotographerProfilePage";

function App() {
  const [photographers, setPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Replace this URL with your actual API endpoint or local json server endpoint
    fetch("http://localhost:5000/photographers")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch photographers");
        }
        return res.json();
      })
      .then((data) => {
        // If your API returns { photographers: [...] }
        setPhotographers(data.photographers || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading photographers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <Routes>
        <Route
          path="/"
          element={<CategoryListingPage photographers={photographers} />}
        />
        <Route
          path="/photographer/:id"
          element={<PhotographerProfilePage photographers={photographers} />}
        />
      </Routes>
  );
}

export default App;
