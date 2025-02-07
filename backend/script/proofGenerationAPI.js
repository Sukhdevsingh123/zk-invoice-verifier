const express = require('express');
const { generateInvoiceProof } = require('../proofGeneration/generateProof');
const app = express();
const port = 3001;

app.use(express.json());

app.post('/generate-proof', async (req, res) => {
  const invoiceData = req.body;
  
  try {
    const proof = await generateInvoiceProof(invoiceData);
    res.json({ proof });
  } catch (error) {
    res.status(500).send('Error generating proof');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
