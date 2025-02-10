const Navbar = () => {
  return (
    <nav className="bg-blue-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">
          <span className="text-yellow-300">Block</span>Invoice
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <a
            href="/"
            className="text-white text-lg hover:text-yellow-300 transition"
          >
            Home
          </a>
          <a
            href="#"
            className="text-white text-lg hover:text-yellow-300 transition"
          >
            Help
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
