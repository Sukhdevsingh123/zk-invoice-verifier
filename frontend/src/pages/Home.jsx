import React from 'react'
import Navbar from '../components/Navbar'
import InvoiceManager from '../components/InvoiceManager'

const Home = () => {
  return (
    <>
      <div className="sticky top-0">
        <Navbar />
      </div>
      <div>
        <InvoiceManager />
      </div>
    </>
  );
}

export default Home
