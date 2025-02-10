import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Navbar from "../components/Navbar";

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const [formData, setFormData] = useState({
    payerAddress: "",
    description: "",
    date: "",
    items: [{ name: "", price: "" }],
  });

  const shortenAddress = (address) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

  // ✅ Connect Wallet
// const connectWallet = async () => {
//   if (!window.ethereum) {
//     alert("MetaMask is not installed!");
//     return;
//   }

//   try {
//     const provider = new ethers.BrowserProvider(window.ethereum); // ✅ Use BrowserProvider for ethers v6
//     const signer = await provider.getSigner();
//     const address = await signer.getAddress();

//     setWalletAddress(address);
//     setProvider(provider);
//     setSigner(signer);
//   } catch (error) {
//     console.error("Failed to connect wallet:", error.message);
//   }
// };
const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask is not installed!");
    return;
  }

  try {
    // ✅ Request accounts explicitly to trigger the pop-up
    await window.ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });

    // ✅ Use ethers v6 `BrowserProvider`
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    setWalletAddress(address);
    setProvider(provider);
    setSigner(signer);
  } catch (error) {
    console.error("Failed to connect wallet:", error.message);
  }
};



  // ✅ Disconnect Wallet
  const disconnectWallet = () => {
    setWalletAddress("");
    setProvider(null);
    setSigner(null);
  };

  const handleChange = (e, index = null) => {
    if (index !== null) {
      const newItems = [...formData.items];
      newItems[index][e.target.name] = e.target.value;
      setFormData({ ...formData, items: newItems });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Navbar />
      </div>
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-6"
        style={{
          backgroundImage: "url('/bg.jpeg')",
        }}
      >
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg relative">
          {/* ✅ Connect/Disconnect Wallet Button */}
          <button
            onClick={walletAddress ? disconnectWallet : connectWallet}
            className={`text-white px-4 py-2 rounded-md absolute top-4 right-4 transition ${
              walletAddress
                ? "bg-red-600 hover:bg-red-700" // Disconnect Button
                : "bg-blue-600 hover:bg-blue-700" // Connect Button
            }`}
          >
            {walletAddress ? "Disconnect" : "Connect Wallet"}
          </button>

          <h2 className="text-2xl font-semibold text-center mb-4">
            Create an Invoice
          </h2>

          {/* ✅ Show Connected Wallet Address */}
          {walletAddress && (
            <div className="text-center text-green-700 font-semibold mb-4 border border-green-400 p-2 rounded-md bg-green-50">
              Connected Wallet:{" "}
              <span className="font-bold">{walletAddress}</span>
            </div>
          )}

          <form className="space-y-4">
            <input
              type="text"
              name="payerAddress"
              placeholder="Payer Address"
              value={formData.payerAddress}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />

            {formData.items.map((item, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Item Name"
                  value={item.name}
                  onChange={(e) => handleChange(e, index)}
                  className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  name="price"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => handleChange(e, index)}
                  className="w-1/3 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={() =>
                setFormData({
                  ...formData,
                  items: [...formData.items, { name: "", price: "" }],
                })
              }
              className="w-full bg-gray-400 text-white py-2 rounded-lg mt-3 hover:bg-gray-500"
            >
              Add Item
            </button>

            <p className="text-lg font-semibold mt-4">
              Total Amount:{" "}
              <span className="text-blue-600">
                $
                {formData.items.reduce(
                  (sum, item) => sum + (parseFloat(item.price) || 0),
                  0
                )}
              </span>
            </p>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-3 hover:bg-blue-700"
            >
              Create Invoice
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full bg-green-500 text-white py-2 rounded-lg mt-3 hover:bg-green-600"
            >
              Return Home
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateInvoice;
