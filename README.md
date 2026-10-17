# 🎙️ Sahayak AI (सहायक AI)
### *Smart Multilingual Voice-First Billing & Inventory Management for Kirana Stores*

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![SQLite](https://img.shields.io/badge/SQLite-Native%20node%3Asqlite-003B57.svg)](https://nodejs.org/)
[![PWA](https://img.shields.io/badge/PWA-Offline--First-orange.svg)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📌 Overview

**Sahayak AI** is an intelligent, voice-first billing and inventory assistant tailored for local retail merchants, Kirana store owners, and small shopkeepers across India. By eliminating cumbersome manual typing and complex ERP software, Sahayak AI allows shopkeepers to manage their daily store operations using natural conversational voice commands in their native languages.

From hands-free billing during peak store rush to automatic low-stock alerts and wholesale distributor ordering, Sahayak AI acts as a trusted digital helper in the shopkeeper's pocket.

---

## ✨ Key Features

- **🗣️ Multilingual Voice Commands:** Natural language processing supporting 9+ Indian languages including Hindi, English, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, and Malayalam.
- **⚡ Instant Hands-Free Billing:** Speak transactions naturally (e.g., *"2 kilo cheeni bechi"*, *"Sold 3 packets of milk"*) to instantly deduct stock and register sales with audio confirmation.
- **📦 Smart Inventory & Stock Intelligence:** Real-time stock tracking with configurable low-stock thresholds, automatic reorder recommendations, and unit conversions (kg, g, packets, bottles, liters, pieces, boxes).
- **📊 Business Analytics & Reports:** Visual breakdown of daily earnings, top-selling items, cash flow, profit margins, and peak transaction hours.
- **🚚 Wholesale Distributor Ordering:** Automatically compiles low-stock items into wholesale vendor orders for one-tap WhatsApp / SMS distributor dispatch.
- **📶 Offline-First PWA Architecture:** Works uninterrupted even during internet outages using IndexedDB and Service Workers, automatically synchronizing with the central backend server once reconnected.
- **🛡️ Secure PIN Authentication:** Quick multi-user shopkeeper authentication and role management tailored for counter staff and store owners.

---

## 🗣️ Example Voice Commands

| Intent | Example Hindi / Hinglish | Example English |
|---|---|---|
| **Record Sale** | *"Do kilo cheeni bechi"* / *"Paanch packet Maggi becha"* | *"Sold 2 kg sugar"* / *"Recorded sale of 5 packets biscuit"* |
| **Check Stock** | *"Chawal kitna bacha hai?"* | *"What is the current stock of rice?"* |
| **Add Stock** | *"Dus packet namak add karo"* | *"Add 10 packets of salt"* |
| **Update Price** | *"Aashirvaad aata ka price 55 rupaye karo"* | *"Update Fortune Oil price to 140 rupees"* |
| **Check Earnings**| *"Aaj ki total kamai kitni hui?"* | *"What are today's total sales?"* |
| **Low Stock Check**| *"Kaunsa saman khatam hone wala hai?"* | *"Which items are low in stock?"* |

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Voice & Speech:** Web Speech API (SpeechRecognition & SpeechSynthesis) + Multilingual phonetic transliteration & intent parsing
- **Local Storage / PWA:** IndexedDB (`idb`), Service Worker, PWA Manifest
- **Backend:** Node.js, Express 5, TypeScript (`tsx`)
- **Database:** Native SQLite via Node.js (`node:sqlite`) with WAL mode
- **Tooling:** Concurrently, PostCSS, Autoprefixer

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+ recommended, v24+ for native `node:sqlite`)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/sahayak-ai.git
   cd sahayak-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run both the backend and frontend concurrently:
   ```bash
   npm run dev:all
   ```

4. Open your browser:
   - **Frontend App:** [http://localhost:5174](http://localhost:5174)
   - **Backend API:** [http://localhost:5000](http://localhost:5000)
   - **API Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📜 Available Scripts

- `npm run dev:all` - Starts both Express backend (port 5000) and Vite frontend (port 5174)
- `npm run dev` - Starts only the Vite frontend dev server
- `npm run server` - Starts only the Express backend server
- `npm run build` - Type-checks and compiles the frontend production bundle
- `npm run preview` - Locally preview the production build

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
