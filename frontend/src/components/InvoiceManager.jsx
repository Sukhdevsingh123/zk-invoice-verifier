import { Link } from "react-router-dom";

const InvoiceManager = () => {
  return (
    <div
      className="h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('bg.jpeg')",
      }}
    >
      <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-lg flex flex-col items-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Invoice Management</h1>

        <div className="flex flex-col space-y-4">
          <Link to="/create-invoice">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition" >
              Create Invoice
            </button>
          </Link>
          <Link to="/view-invoice">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition">
              View Invoice
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvoiceManager;
