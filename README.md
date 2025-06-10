# 🎬 Cinema Cabin

**Cinema Cabin** is a web application built as part of a 4th-semester User Interface Design and Database Management project. It offers users the ability to browse movie showtimes, select seats, and manage bookings, while featuring an admin interface for managing screenings and theaters.

---

## Table of Contents

* [Features](#features)
* [Architecture](#architecture)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Running the App](#running-the-app)
* [Usage](#usage)
* [Project Structure](#project-structure)
* [Future Improvements](#future-improvements)
* [Contributors](#contributors)
* [License](#license)

---

## Features

* 📅 **Movie Listings** – View available
* 🎟️ **Interactive Movie Page** – A visually stunning interactive page for viewing which movies are available.
* 👤 **User Interaction** – (Planned) Users can create accounts and rate and review movies.
* 🛠️ **Movie Dashboard** – (Planned) Interface for viewing descriptions about the movies and rating them.

---

## Architecture

Cinema Cabin uses a **decoupled front-end/back-end architecture**, where:

* The **front-end** (React + Vite) handles UI and user interactions.
* The **back-end** (Node.js + Express) exposes RESTful APIs, connects to a database to store movies, reviews, ratings, user information, etc.
* Communication is via HTTP between the front-end and back-end.

---

## Tech Stack

* **Front-end**: Vite-powered React, HTML5, CSS3
* **Back-end**: Node.js, Express
* **Database**: postGRESQL
* **Linting & Formatting**: ESLint (config via `eslint.config.js`)
* **Package Management**: npm (`package.json`, `package-lock.json`)

---

## Getting Started

### Prerequisites

* Node.js (v16+) & npm
* *(Optional)* Database server (e.g., MongoDB, MySQL) if using a self-hosted DB

### Installation

1. **Clone the repo:**

   ```bash
   git clone https://github.com/KarthikeyaSai/CinemaCabin.git
   cd CinemaCabin
   ```
2. **Install dependencies:**

   ```bash
   npm install
   cd frontend
   npm install
   cd backend
   npm install
   ```
3. *(If database required)*

   * Create a new database instance
   * Set up connection credentials in `.env` (e.g., `DB_URI`)

### Running the App

#### 1. Back-end server

```bash
npm run start     # or: node server.js
```

*This will start Express APIs on port 3000 (or whichever is defined).*

#### 2. Front-end (in separate terminal)

```bash
cd frontend
npm run dev
```

*Open your browser at `http://localhost:5173`.*

---

## Usage

* **Browse** available movies and their reviews
* **Select movies** from the visual grid
* **Proceed to rate and review** (backend handles the reviews of each verified user)
* *(Admin flow)*

  * Add new screens/theaters
  * Configure seat layouts and showtime metadata

---

## Project Structure

```
CinemaCabin/
├── backend/        # Contains Express server, REST endpoints
├── frontend/       # React + Vite static assets, UI components
├── server.js       # Main application entry point
├── package.json    # Monorepo dependencies and scripts
├── vite.config.js  # Front-end build configuration
└── eslint.config.js# Linting rules
```

---

## Future Improvements

* ✅ **User authentication & booking history**
* ✅ **Admin portal** for managing theaters, screens, movies
* 📦 Deploy to cloud (Heroku, Vercel, Netlify)
* 🧼 Add comprehensive tests (unit & integration)
* 💾 Support real-time seat selection status (e.g., via WebSockets)
* 📱 Improve UI/UX (mobile responsiveness, polished designs)

---

### How to Customize

* **Rename project**: Update `name` & `description` in `package.json`
* **Environment variables**: Use a `.env` file in the `backend/` folder to manage DB credentials and API keys
* **Scripts**: Enhance `scripts` in `package.json` for testing, linting, and deployment

---

## Final Notes

Cinema Cabin is an excellent foundation for a full-featured cinema booking system. To extend it:

* Hook up a real database
* Add login/signup/user profiles
* Implement secure payment / ticket issuance
* Deploy to production

Let me know if you'd like help with any of these next steps!

