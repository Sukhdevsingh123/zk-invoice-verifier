// import { useState } from "react";
// import { ethers } from "ethers";


// const Navbar = () => {
//   const [walletAddress, setWalletAddress] = useState(""); 



  
//   const shortenAddress = (address) =>
//     `${address.slice(0, 6)}...${address.slice(-4)}`;

//   const connectWallet = async () => {
//     if (!window.ethereum) {
//       alert("MetaMask is not installed!");
//       return;
//     }

//     try {
//       // ✅ Force MetaMask page to open every time
//       await window.ethereum.request({
//         method: "wallet_requestPermissions",
//         params: [{ eth_accounts: {} }],
//       });

//       // ✅ Get connected account
//       const provider = new BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
//       const address = await signer.getAddress();

//       setWalletAddress(address);
//       alert(`Connected: ${shortenAddress(address)}`);
//     } catch (error) {
//       console.error("Failed to connect wallet:", error.message);
//       alert("Wallet connection failed!");
//     }
//   };

//   const disconnectWallet = () => {
//     setWalletAddress("");
//     alert("Wallet disconnected!");
//   };




 

//   return (
//     <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
//       <a className="navbar-brand fw-bold text-dark text-uppercase" href="#">
//         Zk-Verify
//       </a>
//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarNav"
//         aria-controls="navbarNav"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav ms-auto">
//           <li className="nav-item">
//             <a className="nav-link text-dark" href="/">Home</a>
//           </li>
//         </ul>
//         {walletAddress ? (
//           <button className="btn btn-primary ms-3" onClick={disconnectWallet}>
//             {shortenAddress(walletAddress)} (Disconnect)
//           </button>
//         ) : (
//           <button className="btn btn-primary ms-3" onClick={connectWallet}>
//             Connect Wallet
//           </button>
//         )}
    
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState("");

  const shortenAddress = (address) =>
   ` ${address.slice(0, 6)}...${address.slice(-4)}`;

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      // ✅ Force MetaMask page to open every time
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });

      // ✅ Get connected account
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWalletAddress(address);
      alert(`Connected: ${shortenAddress(address)}`);
    } catch (error) {
      console.error("Failed to connect wallet:", error.message);
      alert("Wallet connection failed!");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    alert("Wallet disconnected!");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm px-4">
      <a className="navbar-brand fw-bold text-dark text-uppercase" href="#">
        Zk-Verify
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link text-dark" href="/">
              Home
            </a>
          </li>
          
        </ul>

        {walletAddress ? (
          <button className="btn btn-primary ms-3" onClick={disconnectWallet}>
            {shortenAddress(walletAddress)} (Disconnect)
          </button>
        ) : (
          <button className="btn btn-primary ms-3" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;