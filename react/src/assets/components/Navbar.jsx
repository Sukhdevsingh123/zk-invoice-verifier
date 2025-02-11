import React from "react";

const Navbar = () => {
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
            <a className="nav-link text-dark" href="#">Home</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-dark" href="#">CreateInvoice</a>
          </li>
          
          <li className="nav-item">
            <a className="nav-link text-dark" href="#">ViewInvoices</a>
          </li>
        </ul>
        <button className="btn btn-dark ms-3">Connect Wallet</button>
      </div>
    </nav>
  );
};

export default Navbar;
