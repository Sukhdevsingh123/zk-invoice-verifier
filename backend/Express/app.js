// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const Invoice = require("./Models/Invoice.js");

// dotenv.config();
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("MongoDB Connected"))
// .catch((error) => console.error("MongoDB Connection Error:", error));




// // POST request to store invoice
// app.post("/api/invoices", async (req, res) => {
//   try {
//     const invoice = new Invoice(req.body);
//     await invoice.save();
//     res.status(201).json({ message: "Invoice created successfully", invoice });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating invoice", error });
//   }
// });

// // GET request to fetch invoice by ID
// app.get("/api/invoices/:invoiceId", async (req, res) => {
//   try {
//     const { invoiceId } = req.params;
//     const invoice = await Invoice.findOne({ invoiceId });

//     if (!invoice) {
//       return res.status(404).json({ message: "Invoice not found" });
//     }

//     res.json(invoice);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching invoice", error });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const invoiceRoutes = require("./routes/invoiceRoutes");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON

// Routes
app.use("/api/invoices", invoiceRoutes);



// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
