

// import React, { useState } from "react";

// const InvoiceActions = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     payerAddress: "",
//     description: "",
//     date: "",
//     itemName: "",
//     price: "",
//   });

//   const [totalAmount, setTotalAmount] = useState(0);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     if (name === "price") {
//       setTotalAmount(parseFloat(value) || 0);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Invoice Created Successfully!");
//     setShowForm(false); // Hide form after submission
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100">
//       {!showForm ? (
//         <div className="text-center p-4 border rounded bg-dark shadow">
//           <h2 className="mb-4 text-white">Invoice Actions</h2>
//           <button className="btn btn-light mx-2" onClick={() => setShowForm(true)}>
//             Create Invoice
//           </button>
//           <button className="btn btn-outline-light mx-2">View Invoice</button>
//         </div>
//       ) : (
//         <div className="p-4 border rounded bg-white shadow w-50">
//           <h2 className="mb-4 text-dark text-center">Create Invoice</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Payer Address</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="payerAddress"
//                 value={formData.payerAddress}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Description</label>
//               <textarea
//                 className="form-control"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//               ></textarea>
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Item Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="itemName"
//                 value={formData.itemName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Price</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Total Amount Display */}
//             <h5 className="text-dark mt-3">Total Amount: ${totalAmount.toFixed(2)}</h5>

//             {/* Buttons */}
//             <div className="d-flex justify-content-between mt-4">
//               <button type="submit" className="btn btn-success">Create Invoice</button>
//               <button type="button" className="btn btn-danger" onClick={() => setShowForm(false)}>
//                 Return to Homepage
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InvoiceActions;


import React, { useState } from "react";

const InvoiceActions = () => {
  const [view, setView] = useState("menu"); // "menu", "create", "view"
  const [formData, setFormData] = useState({
    payerAddress: "",
    description: "",
    date: "",
    itemName: "",
    price: "",
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoiceID, setInvoiceID] = useState("");
  const [storedInvoice, setStoredInvoice] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "price") {
      setTotalAmount(parseFloat(value) || 0);
    }
  };

  // Handle invoice submission (store data)
  const handleSubmit = (e) => {
    e.preventDefault();
    setStoredInvoice({ id: "12345", ...formData, totalAmount }); // Mock invoice ID
    setView("menu"); // Return to menu after saving
    alert("Invoice Created Successfully!");
  };

  // Handle invoice ID input
  const handleViewInvoice = () => {
    if (invoiceID === "12345" && storedInvoice) {
      setView("showInvoice");
    } else {
      alert("Invoice not found!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {view === "menu" && (
        <div className="text-center p-4 border rounded bg-dark shadow">
          <h2 className="mb-4 text-white">Invoice Actions</h2>
          <button className="btn btn-light mx-2" onClick={() => setView("create")}>
            Create Invoice
          </button>
          <button className="btn btn-outline-light mx-2" onClick={() => setView("view")}>
            View Invoice
          </button>
        </div>
      )}

      {view === "create" && (
        <div className="p-4 border rounded bg-white shadow w-50">
          <h2 className=" text-dark text-center">Create Invoice</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <label className="form-label">Payer Address</label>
              <input type="text" className="form-control" name="payerAddress" value={formData.payerAddress} onChange={handleChange} required />
            </div>
            <div className="mb-1">
              <label className="form-label">Description</label>
              <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required></textarea>
            </div>
            <div className="mb-1">
              <label className="form-label">Date</label>
              <input type="date" className="form-control" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="mb-1">
              <label className="form-label">Item Name</label>
              <input type="text" className="form-control" name="itemName" value={formData.itemName} onChange={handleChange} required />
            </div>
            <div className="mb-1">
              <label className="form-label">Price</label>
              <input type="number" className="form-control" name="price" value={formData.price} onChange={handleChange} required />
            </div>

            {/* Total Amount Display */}
            <h5 className="text-dark mt-3">Total Amount: ${totalAmount.toFixed(2)}</h5>

            {/* Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-success">Create Invoice</button>
              <button type="button" className="btn btn-danger" onClick={() => setView("menu")}>
                Return to Homepage
              </button>
            </div>
          </form>
        </div>
      )}

      {view === "view" && (
        <div className="p-4 border rounded bg-white shadow text-center">
          <h2 className="mb-4 text-dark">View Invoice</h2>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter Invoice ID"
            value={invoiceID}
            onChange={(e) => setInvoiceID(e.target.value)}
          />
          <button className="btn btn-dark" onClick={handleViewInvoice}>
            Search Invoice
          </button>
          <button className="btn btn-danger mt-3" onClick={() => setView("menu")}>
            Return to Homepage
          </button>
        </div>
      )}

      {view === "showInvoice" && storedInvoice && (
        <div className="p-4 border rounded bg-white shadow w-50">
          <h2 className="mb-4 text-dark text-center">Invoice Details</h2>
          <p><strong>ID:</strong> {storedInvoice.id}</p>
          <p><strong>Payer Address:</strong> {storedInvoice.payerAddress}</p>
          <p><strong>Description:</strong> {storedInvoice.description}</p>
          <p><strong>Date:</strong> {storedInvoice.date}</p>
          <p><strong>Item Name:</strong> {storedInvoice.itemName}</p>
          <p><strong>Price:</strong> ${storedInvoice.price}</p>
          <h5 className="text-dark mt-3"><strong>Total Amount:</strong> ${storedInvoice.totalAmount.toFixed(2)}</h5>
          
          <button className="btn btn-danger mt-3" onClick={() => setView("menu")}>
            Return to Homepage
          </button>
        </div>
      )}
    </div>
  );
};

export default InvoiceActions;
