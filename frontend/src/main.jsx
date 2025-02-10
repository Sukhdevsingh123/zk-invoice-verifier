import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./components/HomePage";
import Home from "./pages/Home.jsx"
import CreateInvoice from "./pages/CreateInvoice.jsx";
import "./index.css"; // Ensure Tailwind is working
import ViewInvoice from './pages/ViewInvoice.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/create-invoice"
          element={<CreateInvoice  />}
        />
        <Route path="/view-invoice" element={<ViewInvoice />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
