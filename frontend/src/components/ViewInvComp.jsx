import React, { useState } from "react";

const ViewInvComp = () => {
  const [invoiceId, setInvoiceId] = useState("");

  const handleViewInvoice = () => {
    console.log("Viewing invoice for ID:", invoiceId);
    // Add logic to fetch and display the invoice
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('bg.jpeg')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          View Invoice
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Enter the Invoice ID to view details
        </p>

        <input
          type="text"
          placeholder="Enter Invoice ID"
          value={invoiceId}
          onChange={(e) => setInvoiceId(e.target.value)}
          className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleViewInvoice}
          className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4 hover:bg-blue-700 transition"
        >
          View Invoice
        </button>
      </div>
    </div>
  );
};

export default ViewInvComp;
