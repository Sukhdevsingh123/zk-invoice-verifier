import React from 'react'
import Navbar from '../components/Navbar'
import ViewInvComp from '../components/ViewInvcomp'

const ViewInvoice = () => {
  return (
    <>
      <div className="sticky top-0">
        <Navbar />
      </div>
      <div>
        <ViewInvComp />
      </div>
    </>
  );
}

export default ViewInvoice
