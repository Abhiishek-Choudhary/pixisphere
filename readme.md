# 📸 Interior Designer Listing Web App – EmptyCup Assignment

This is a **mobile-friendly web application** that showcases a list of photographers (interior designers) with filters, sorting, detailed profiles, and inquiry support. It is built with **React.js** and a **Node.js + Express** backend.

---

## 🔧 Tech Stack

- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Styling**: CSS / Inline Styles
- **Assets**: Images served from `/public` directory

---

## 🚀 Features

### 🧭 Main Listing Page (Category Listing)
- **Photographer Cards** with:
  - Profile Photo
  - Name
  - Location
  - Rating
  - Price
  - Tags/Styles
- **View Profile** Button to see full profile

### 🔍 Filters & Search
- 🔎 **Search**: by name, tag, or location (fuzzy-like)
- 💰 **Price Range** Slider
- 🌟 **Rating Filter** (e.g., 4+, 3+)
- 🏷️ **Styles** (Traditional, Candid, etc.)
- 🏙️ **City Dropdown**
- 🔃 **Sorting**: Price (Low–High), Rating (High–Low), Recently Added

### 🔄 Pagination
- “Load More” button loads more photographers dynamically

### 👤 Photographer Profile Page
- Full details: name, bio, price, styles, tags
- Full gallery (grid/carousel)
- Reviews (name, rating, comment, date)
- 📩 **Send Inquiry** button opens a form modal

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Abhiishek-Choudhary/pixisphere-assignment.git
cd pixisphere

2. Install Dependencies

# Frontend
cd client
npm install

# Backend
cd ../server
npm install

3. Start the App
bash
Copy
Edit
# In one terminal (for backend)
cd server
npm run dev

# In another terminal (for frontend)
cd client
npm start

The app should now run at http://localhost:3000.

 Images & Assets
Photographer images are stored in client/public/images.

JSON data is fetched from server/data/photographers.json.

🧪 How to Use
Navigate to the main listing page (/).

Use the filters or search bar to narrow down your photographer.

Click "View Profile" to open a photographer's detailed view.

View gallery and reviews, and click "Send Inquiry" to fill out the inquiry form