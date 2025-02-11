const express = require("express");
const { createInvoice, getInvoiceById, generateInvoicePDF } = require("../Controllers/invoiceControllers.js");

const router = express.Router();

router.post("/", createInvoice);      
        // get invoicew by item name
router.get("/:invoiceId", getInvoiceById);       // Get Invoice by ID
router.get("/:invoiceId/pdf", generateInvoicePDF); // Generate PDF

module.exports = router;
