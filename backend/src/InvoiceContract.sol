// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract InvoiceContract {
    struct Invoice {
        uint256 id;
        address issuer;
        address payer;
        string description;
        uint256 amount;
        uint256 dueDate;
        bool verified;
    }

    mapping(uint256 => Invoice) public invoices;

    function createInvoice(
        uint256 _id,
        address _issuer,
        address _payer,
        string memory _description,
        uint256 _amount,
        uint256 _dueDate
    ) public {
        invoices[_id] = Invoice({
            id: _id,
            issuer: _issuer,
            payer: _payer,
            description: _description,
            amount: _amount,
            dueDate: _dueDate,
            verified: false
        });
    }

    function verifyInvoice(uint256 _id) public {
        Invoice storage invoice = invoices[_id];
        invoice.verified = true;
    }

    function getInvoice(uint256 _id) public view returns (Invoice memory) {
        return invoices[_id];
    }
}
