import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./config";

function Ethers() {
  if (!window.ethereum) {
    alert("MetaMask is not installed!");
    return null; // Return null if MetaMask is not installed
  }

  // Initialize provider and signer
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    console.log(contract);
    return { provider, signer, contract }; // Ensure contract is returned
  } catch (error) {
    console.error("Error creating contract:", error);
    return null; // Return null if contract initialization fails
  }
}

export default Ethers;
