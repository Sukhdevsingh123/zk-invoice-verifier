import React, { useState } from 'react';
import axios from 'axios';

const ViewInvoice = () => {
  const [invoiceID, setInvoiceID] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle Invoice ID input change
  const handleInvoiceIDChange = (e) => {
    setInvoiceID(e.target.value);
    setError('');          // Reset error when user changes the ID
    setInvoiceData(null);  // Reset invoice data when starting a new search
  };

  // Fetch Invoice data from backend
  const fetchInvoiceData = async () => {
    if (!invoiceID) {
      setError('Please enter a valid Invoice ID.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:5000/api/invoices/${invoiceID}`);
      if (response.data) {
        setInvoiceData(response.data);
      } else {
        setError('Invoice not found. Please check the ID and try again.');
        setInvoiceData(null);
      }
    } catch (err) {
      setError('Invoice not found. Please check the ID and try again.');
      setInvoiceData(null);
    } finally {
      setLoading(false);
    }
  };

  // Download the invoice PDF
  const downloadInvoicePDF = async () => {
    if (!invoiceData) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/invoices/${invoiceID}/pdf`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `invoice_${invoiceID}.pdf`;
      link.click();
    } catch (err) {
      setError('Failed to download PDF.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 w-100  ">
      <div className="p-4 border rounded bg-white shadow w-50">
        <h2 className="mb-4 text-dark text-center  id=view-invoice">View Invoice</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Invoice ID"
            value={invoiceID}
            onChange={handleInvoiceIDChange}
          />
        </div>
        <button
          className="btn btn-dark w-100 mb-3"
          onClick={fetchInvoiceData}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search Invoice'}
        </button>

        {error && <p className="text-danger text-center">{error}</p>}

        {invoiceData && (
          <div>
            <h5 className="text-dark">Invoice Details</h5>
            <p><strong>Invoice ID:</strong> {invoiceData.invoiceId}</p>
            <p><strong>Payer Address:</strong> {invoiceData.payerAddress}</p>
            <p><strong>Description:</strong> {invoiceData.description}</p>
            <p>
              <strong>Due Date:</strong>{" "}
              {invoiceData.dueDate
                ? new Date(invoiceData.dueDate).toLocaleDateString()
                : "N/A"}
            </p>
            {invoiceData.items && invoiceData.items.length > 0 && (
              <div>
                <h5 className="text-dark">Items:</h5>
                {invoiceData.items.map((item, index) => (
                  <div key={index}>
                    <p><strong>Item Name:</strong> {item.name}</p>
                    <p>
                      <strong>Price:</strong> ${parseFloat(item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <h5 className="text-dark mt-3">
              <strong>Total Amount:</strong>{" "}
              {invoiceData.amount
                ? `$${parseFloat(invoiceData.amount).toFixed(2)}`
                : "N/A"}
            </h5>
            
            {/* Download PDF Button */}
            <button
              className="btn btn-success w-100 mt-3"
              onClick={downloadInvoicePDF}
            >
              Download PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewInvoice;
