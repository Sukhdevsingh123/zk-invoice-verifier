// const snarkjs = require('snarkjs');
// const path = require('path');

// // Path to the compiled files
// const wasmPath = path.join(__dirname, '../circuits/build/invoiceVerifier_js/invoiceVerifier.wasm');

// const r1csPath = path.join(__dirname, '../circuits/build/invoiceVerifier.r1cs');



// // Function to generate proof and verify
// async function generateAndVerifyProof(invoiceData) {
//     try {
//         // Input data for the proof
//         const inputData = {
//             invoiceID: invoiceData.invoiceID,
//             issuer: invoiceData.issuer,
//             payer: invoiceData.payer,
//             amount: invoiceData.amount
//         };

//         // Generate proof using SnarkJS
//         console.log('Generating proof...');
//         const { proof, publicSignals } = await snarkjs.groth16.fullProve(inputData, wasmPath, r1csPath);
        
//         // Log proof and public signals
//         console.log('Proof:', proof);
//         console.log('Public Signals:', publicSignals);

//         // Verify the proof (this will just verify the proof against the public signals)
//         const verified = await snarkjs.groth16.verify(r1csPath, publicSignals, proof);

//         if (verified) {
//             console.log("Proof is valid and verified!");
//         } else {
//             console.log("Proof verification failed.");
//         }
//     } catch (error) {
//         console.error("Error generating/verifying proof:", error);
//     }
// }

// // Example invoice data (replace with actual data for your case)
// const invoiceData = {
//     invoiceID: 1,
//     issuer: "0x0cb22E03E88854C1400fB94ad66cdeC930a61BE7", // example address
//     payer: "0x1302AdD236215EfC2436deC68B821cC165B48b10", // example address
//     amount: 10000000000000000 // example amount in XFI
// };

// // Call the function to generate and verify the proof
// generateAndVerifyProof(invoiceData);



// const snarkjs = require('snarkjs');
// const path = require('path');
// const fs = require('fs');

// // Path to the compiled files
// const wasmPath = path.join(__dirname, '../circuits/build/invoiceVerifier_js/invoiceVerifier.wasm');
// const zkeyPath = path.join(__dirname, '../circuits/build/invoiceVerifier.zkey'); // Correct file
// const vKeyPath = path.join(__dirname, '../circuits/build/verification_key.json'); // Correct file

// // Check if all files exist before running
// if (!fs.existsSync(wasmPath)) {
//     console.error("Error: WASM file not found:", wasmPath);
//     process.exit(1);
// }
// if (!fs.existsSync(zkeyPath)) {
//     console.error("Error: ZKey file not found:", zkeyPath);
//     process.exit(1);
// }
// if (!fs.existsSync(vKeyPath)) {
//     console.error("Error: Verification key file not found:", vKeyPath);
//     process.exit(1);
// }

// // Function to generate proof and verify
// async function generateAndVerifyProof(invoiceData) {
//     try {
//         // Input data for the proof
//         const inputData = {
//             invoiceID: invoiceData.invoiceID,
//             issuer: invoiceData.issuer,
//             payer: invoiceData.payer,
//             amount: invoiceData.amount
//         };

//         // Generate proof using SnarkJS
//         console.log('Generating proof...');
//         const { proof, publicSignals } = await snarkjs.groth16.fullProve(inputData, wasmPath, zkeyPath);
        
//         // Log proof and public signals
//         console.log('Proof:', proof);
//         console.log('Public Signals:', publicSignals);

//         // Load verification key
//         const vKey = JSON.parse(fs.readFileSync(vKeyPath, 'utf-8'));

//         // Verify the proof
//         const verified = await snarkjs.groth16.verify(vKey, publicSignals, proof);

//         if (verified) {
//             console.log("✅ Proof is valid and verified!");
//         } else {
//             console.log("❌ Proof verification failed.");
//         }
//     } catch (error) {
//         console.error("Error generating/verifying proof:", error);
//     }
// }

// // Example invoice data
// const invoiceData = {
//     invoiceID: 9,
//     issuer: "0x0cb22E03E88854C1400fB94ad66cdeC930a61BE7",
//     payer: "0x1302AdD236215EfC2436deC68B821cC165B48b10",
//     amount: 10000000000000000
// };

// // Call the function
// generateAndVerifyProof(invoiceData);


const snarkjs = require('snarkjs');
const path = require('path');
const fs = require('fs');

// Paths to compiled files

const wasmPath = path.join(__dirname, '../../circuits/build/invoiceVerifier_js/invoiceVerifier.wasm');
const zkeyPath = path.join(__dirname, '../../circuits/build/invoiceVerifier.zkey'); // Correct file
const vKeyPath = path.join(__dirname, '../../circuits/build/verification_key.json'); // Correct file

// Check if required files exist
if (!fs.existsSync(wasmPath)) {
    console.error("Error: WASM file not found:", wasmPath);
    process.exit(1);
}
if (!fs.existsSync(zkeyPath)) {
    console.error("Error: ZKey file not found:", zkeyPath);
    process.exit(1);
}
if (!fs.existsSync(vKeyPath)) {
    console.error("Error: Verification key file not found:", vKeyPath);
    process.exit(1);
}

// Function to generate and verify proof
async function generateAndVerifyProof(invoiceData) {
    try {
        // Prepare input data (invoiceID is removed since it's unused in the circuit)
        const inputData = {
            invoiceID: invoiceData.invoiceID,
            issuer: invoiceData.issuer,
            payer: invoiceData.payer,
            amount: invoiceData.amount
        };

        console.log('Generating proof...');
        
        // Generate proof using SnarkJS
        const { proof, publicSignals } = await snarkjs.groth16.fullProve(inputData, wasmPath, zkeyPath);
        
        console.log('Proof:', JSON.stringify(proof, null, 2));
        console.log('Public Signals:', publicSignals);

        // Load verification key
        const vKey = JSON.parse(fs.readFileSync(vKeyPath, 'utf-8'));

        // Verify the proof (Ensure public signals match expected format)
        const verified = await snarkjs.groth16.verify(vKey, [publicSignals[0]], proof);

        if (verified) {
            console.log("✅ Proof is valid and verified!");
        } else {
            console.log("❌ Proof verification failed.");
        }
    } catch (error) {
        console.error("Error generating/verifying proof:", error);
    }
}

//  Example invoice data (Ensure values are valid field elements)
const invoiceData = {
    invoiceID: 1,
    issuer: "1",  // Example nonzero value
    payer: "1",   // Example nonzero value
    amount: "1000" // Example nonzero value
};

// Call the function
generateAndVerifyProof(invoiceData);







