
// const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

// const InvoiceSchema = new mongoose.Schema({
//   invoiceId: { 
//     type: String, 
//     required: true, 
//     unique: true, 
//     default: uuidv4 // Automatically generates unique ID
//   },
//   payer: String,
//   qrCodeContent: { type: String, required: false },
//   issuer: String,
//   amount: Number,
//   description: String,
//   dueDate: Date,
//   items: [{ name: String, price: Number }],
//   status: { type: String, default: "Pending" },
//   payerDownloads: { type: Number, default: 1 },
//   paymentReceiptPath: { type: String, default: null },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Invoice", InvoiceSchema);





const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const InvoiceSchema = new mongoose.Schema({
  invoiceId: { 
    type: String, 
    required: true, 
    unique: true, 
    default: uuidv4 // Automatically generates unique ID
  },
  payerAddress: { type: String, required: true },
  qrCodeContent: { type: String, required: false },
  issuer: { 
    type: String, 
    required: true, 
    default: "0xDefaultIssuerAddress" // Replace with your desired default issuer address
  },
  amount: Number,
  description: String,
  dueDate: Date,
  items: [{ name: String, price: Number }],
 
 
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", InvoiceSchema);
