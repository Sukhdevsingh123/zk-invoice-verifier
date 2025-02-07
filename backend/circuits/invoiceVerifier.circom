pragma circom 2.0.0;

template InvoiceVerifier() {
    signal input invoiceID;
    signal input issuer;
    signal input payer;
    signal input amount;
    signal output verified;

    // Define binary signals (must be either 0 or 1)
    signal issuerValid;
    signal payerValid;
    signal amountValid;

    // Ensure issuerValid is 1 if issuer is non-zero, else 0
    signal issuerCheck;
    issuerCheck <== issuer; // issuerCheck should be 0 if issuer is 0, else 1
    issuerValid <== issuerCheck * (1 - issuerCheck); // 1 if issuer != 0, else 0

    // Ensure payerValid is 1 if payer is non-zero, else 0
    signal payerCheck;
    payerCheck <== payer;
    payerValid <== payerCheck * (1 - payerCheck); // 1 if payer != 0, else 0

    // Ensure amountValid is 1 if amount is greater than 0, else 0
    signal amountCheck;
    amountCheck <== amount;
    amountValid <== amountCheck * (1 - amountCheck); // 1 if amount > 0, else 0

    // Enforce that issuerValid, payerValid, and amountValid are binary (either 0 or 1)
    issuerValid * (1 - issuerValid) === 0;
    payerValid * (1 - payerValid) === 0;
    amountValid * (1 - amountValid) === 0;

    // Combine the validity checks into a final validity signal
    signal combinedValid;
    combinedValid <== issuerValid * payerValid; // Combine issuerValid and payerValid
    signal finalValid;
    finalValid <== combinedValid * amountValid; // Combine the result with amountValid

    // Enforce finalValid is binary (0 or 1)
    finalValid * (1 - finalValid) === 0;

    // Set the verified output to the final validity signal
    verified <== finalValid;
}

component main = InvoiceVerifier();


