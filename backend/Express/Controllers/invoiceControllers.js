const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const Invoice = require("../Models/Invoice.js");

// Create Invoice (Auto-generates `invoiceId`)
const createInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body); // `invoiceId` auto-generated
    await newInvoice.save();
    res.status(201).json({ message: "Invoice created successfully", invoice: newInvoice,  
        invoiceId: newInvoice.invoiceId, });
  } catch (error) {
    console.error("Error creating invoice:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get Invoice by ID
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({ invoiceId: req.params.invoiceId });
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });
    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error fetching invoice:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


  



// Generate and Download PDF
const generateInvoicePDF = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const invoice = await Invoice.findOne({ invoiceId });

    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    const invoicesDir = path.join(__dirname, "../Invoices");
    if (!fs.existsSync(invoicesDir)) fs.mkdirSync(invoicesDir);

    const pdfPath = path.join(invoicesDir, `invoice-${invoiceId}.pdf`);
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    // PDF Content
    doc.fontSize(20).text("Invoice", { align: "center" }).moveDown();
    doc.fontSize(14).text(`Invoice ID: ${invoice.invoiceId}`);
    doc.text(`Payer: ${invoice.payer || "N/A"}`);
    doc.text(`Issuer: ${invoice.issuer || "N/A"}`);
    doc.text(`Amount: $${invoice.amount}`);
    doc.text(`Description: ${invoice.description || "N/A"}`);
    doc.text(`Due Date: ${invoice.dueDate ? invoice.dueDate.toDateString() : "N/A"}`).moveDown();

    // Invoice Items
    if (invoice.items.length > 0) {
      doc.fontSize(16).text("Items", { underline: true });
      invoice.items.forEach((item, index) => {
        doc.fontSize(12).text(`${index + 1}. ${item.name} - $${item.price}`);
      });
      doc.moveDown();
    }

    // Status
    doc.fontSize(14).text(`Status: ${invoice.status}`);
    doc.fontSize(12).text(`Created At: ${new Date(invoice.createdAt).toLocaleString()}`).moveDown();
    doc.end();

    stream.on("finish", () => res.download(pdfPath, `invoice-${invoiceId}.pdf`));
  } catch (error) {
    console.error("Error generating PDF:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { createInvoice, getInvoiceById, generateInvoicePDF};
