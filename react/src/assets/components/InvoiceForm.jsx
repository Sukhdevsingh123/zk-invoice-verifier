

// import React, { useState } from "react";
// import axios from "axios"; // Import axios for HTTP requests
// import ViewInvoice from "./ViewInvoice"; // Import the ViewInvoice component

// const InvoiceActions = () => {
//   // "menu", "create", "viewInvoice" are the possible view states
//   const [view, setView] = useState("menu");
//   const [formData, setFormData] = useState({
//     payerAddress: "",
//     description: "",
//     dueDate: "",    // renamed from "date" to "dueDate"
//     itemName: "",
//     price: "",
//   });
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [storedInvoice, setStoredInvoice] = useState(null);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));

//     // When price changes, update totalAmount
//     if (name === "price") {
//       setTotalAmount(parseFloat(value) || 0);
//     }
//   };

//   // Handle invoice submission: send data to the backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Prepare invoice data according to your schema:
//     // - payerAddress, description, dueDate
//     // - items: an array containing one item with name and price
//     // - amount: the total amount
//     const invoiceData = {
//       payerAddress: formData.payerAddress,
//       description: formData.description,
//       dueDate: formData.dueDate,
//       items: [{ name: formData.itemName, price: parseFloat(formData.price) }],
//       amount: totalAmount,
//     };

//     try {
//       // Replace with your backend endpoint URL
//       const response = await axios.post(
//         "http://localhost:5000/api/invoices",
//         invoiceData
//       );
//       setStoredInvoice(response.data);
//       setView("menu"); // Return to menu after saving
//       alert("Invoice Created Successfully!");
//     } catch (error) {
//       console.error("Error creating invoice:", error);
//       alert("Failed to create invoice. Please try again.");
//     }
//   };

//   // Switch view to the invoice view
//   const handleViewInvoice = () => {
//     setView("viewInvoice");
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100  mt-5">
//       {view === "menu" && (
//         <div className="text-center p-4 border rounded bg-dark shadow ">
//           <h2 className="mb-1 text-white">Invoice Actions</h2>
//           <button
//             className="btn btn-light mx-2"
//             onClick={() => setView("create")}
//           >
//             Create Invoice
//           </button>
//           <button
//             className="btn btn-outline-light mx-2"
//             onClick={handleViewInvoice}
//           >
//             View Invoice
//           </button>
//         </div>
//       )}

//       {view === "create" && (
//         <div className="p-4 border rounded bg-white shadow w-50 mt-4">
//           <h2 className="text-dark text-center">Create Invoice</h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-1">
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
//             <div className="mb-1">
//               <label className="form-label">Description</label>
//               <textarea
//                 className="form-control"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//               ></textarea>
//             </div>
//             <div className="mb-1">
//               <label className="form-label">Due Date</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 name="dueDate"
//                 value={formData.dueDate}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-1">
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
//             <div className="mb-1">
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
//             <h5 className="text-dark mt-3">
//               Total Amount: ${totalAmount.toFixed(2)}
//             </h5>

//             {/* Buttons */}
//             <div className="d-flex justify-content-between mt-4">
//               <button type="submit" className="btn btn-primary">
//                 Create Invoice
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 onClick={() => setView("menu")}
//               >
//                 Return to Homepage
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {view === "viewInvoice" && <ViewInvoice />}
//     </div>
//   );
// };

// export default InvoiceActions;



import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests
import ViewInvoice from "./ViewInvoice"; // Import the ViewInvoice component

const InvoiceActions = () => {
  const [view, setView] = useState("menu");
  const [formData, setFormData] = useState({
    payerAddress: "",
    description: "",
    dueDate: "",
    itemName: "",
    price: "",
  });
  const [totalAmount, setTotalAmount] = useState(0);
  const [storedInvoice, setStoredInvoice] = useState(null);
  const [invoiceId, setInvoiceId] = useState(""); // State for storing invoice ID

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    if (name === "price") {
      setTotalAmount(parseFloat(value) || 0);
    }
  };

  // Copy invoice ID to clipboard
  const copyInvoiceId = () => {
    navigator.clipboard.writeText(invoiceId);
    alert("Invoice ID copied!");
  };

  // Handle invoice submission: send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const invoiceData = {
      payerAddress: formData.payerAddress,
      description: formData.description,
      dueDate: formData.dueDate,
      items: [{ name: formData.itemName, price: parseFloat(formData.price) }],
      amount: totalAmount,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/invoices",
        invoiceData
      );
      setStoredInvoice(response.data);
      setInvoiceId(response.data.invoiceId); // Store the invoice ID
      setView("invoiceCreated"); // Switch view to display invoice ID
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert("Failed to create invoice. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 mt-5 id=invoice-form">
      {view === "menu" && (
        <div className="text-center p-4 border rounded bg-dark shadow">
          <h2 className="mb-1 text-white">Invoice Actions</h2>
          <button
            className="btn btn-light mx-2"
            onClick={() => setView("create")}
          >
            Create Invoice
          </button>
          <button
            className="btn btn-outline-light mx-2"
            onClick={() => setView("viewInvoice")}
          >
            View Invoice
          </button>
        </div>
      )}

      {view === "create" && (
        <div className="p-4 border rounded bg-white shadow w-50 mt-4">
          <h2 className="text-dark text-center">Create Invoice</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-1">
              <label className="form-label">Payer Address</label>
              <input
                type="text"
                className="form-control"
                name="payerAddress"
                value={formData.payerAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-1">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div className="mb-1">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                className="form-control"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-1">
              <label className="form-label">Item Name</label>
              <input
                type="text"
                className="form-control"
                name="itemName"
                value={formData.itemName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-1">
              <label className="form-label">Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <h5 className="text-dark mt-3">
              Total Amount: ${totalAmount.toFixed(2)}
            </h5>

            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-primary">
                Create Invoice
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setView("menu")}
              >
                Return to Homepage
              </button>
            </div>
          </form>
        </div>
      )}

      {view === "invoiceCreated" && invoiceId && (
        <div className="p-4 border rounded bg-white shadow w-50 mt-4 text-center">
          <h3 className="text-success">Invoice Created Successfully!</h3>
          <p className="text-dark">Invoice ID:</p>
          <div className="d-flex justify-content-center align-items-center">
            <input
              type="text"
              className="form-control text-center"
              value={invoiceId}
              readOnly
              style={{ maxWidth: "300px" }}
            />
            <button className="btn btn-outline-primary mx-2" onClick={copyInvoiceId}>
              Copy
            </button>
          </div>
          <button
            className="btn btn-secondary mt-3"
            onClick={() => setView("menu")}
          >
            Return to Homepage
          </button>
        </div>
      )}

      {view === "viewInvoice" && <ViewInvoice />}
    </div>
  );
};

export default InvoiceActions;
