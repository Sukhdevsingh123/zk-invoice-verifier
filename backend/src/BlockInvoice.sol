// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BlockInvoice {
    // Events
    event InvoiceCreated(
        uint256 invoiceId,
        address indexed issuer,
        address indexed recipient,
        uint256 amount,
        string description,
        uint256 dueDate
    );
    event PaymentReceived(
        uint256 invoiceId,
        address indexed payer,
        uint256 amount
    );
    event InvoicePaid(uint256 invoiceId);

    // Struct for Invoice
    struct Invoice {
        uint256 id;
        address issuer; // Invoice creator
        address recipient; // Recipient of the invoice
        uint256 amount; // Invoice amount
        string description; // Description of the invoice
        uint256 dueDate; // Payment due date
        bool isPaid; // Payment status
    }

    // State variables
    uint256 public nextInvoiceId = 1; // Invoice ID counter
    mapping(uint256 => Invoice) public invoices; // Mapping of invoices
    mapping(address => uint256[]) public userInvoices; // User's created invoices

    // Create an invoice
    function createInvoice(
        address _recipient,
        uint256 _amount,
        string memory _description,
        uint256 _dueDate
    ) public {
        require(_recipient != address(0), "Invalid recipient address");
        require(_amount > 0, "Amount must be greater than 0");
        require(msg.sender != _recipient, "Cannot create invoice for yourself"); // Guard: issuer cannot be the recipient

        // Create the invoice
        invoices[nextInvoiceId] = Invoice({
            id: nextInvoiceId,
            issuer: msg.sender,
            recipient: _recipient,
            amount: _amount,
            description: _description,
            dueDate: _dueDate,
            isPaid: false
        });

        // Track user's invoices
        userInvoices[msg.sender].push(nextInvoiceId);

        // Emit event
        emit InvoiceCreated(
            nextInvoiceId,
            msg.sender,
            _recipient,
            _amount,
            _description,
            _dueDate
        );

        // Increment invoice ID
        nextInvoiceId++;
    }

    // Pay an invoice
    function payInvoice(uint256 _invoiceId) public payable {
        Invoice storage invoice = invoices[_invoiceId];
        require(invoice.id == _invoiceId, "Invoice does not exist");
        require(
            msg.sender == invoice.recipient,
            "Only the recipient can pay this invoice"
        );
        require(!invoice.isPaid, "Invoice is already paid");

        // Handle payment in native currency (Ether)
        require(msg.value == invoice.amount, "Incorrect payment amount");

        // Transfer funds directly to the issuer
        payable(invoice.issuer).transfer(msg.value);
        invoice.isPaid = true;
        emit InvoicePaid(_invoiceId);

        // Emit event for payment received
        emit PaymentReceived(
            _invoiceId,
            msg.sender,
            invoice.amount
        );
    }

    // Get full invoices for a user (includes invoice details)
    function getInvoicesByUser(address _user)
        public
        view
        returns (Invoice[] memory)
    {
        uint256[] memory invoiceIds = userInvoices[_user];
        Invoice[] memory userInvoicesDetails = new Invoice[](invoiceIds.length);
        
        for (uint256 i = 0; i < invoiceIds.length; i++) {
            userInvoicesDetails[i] = invoices[invoiceIds[i]];
        }
        
        return userInvoicesDetails;
    }

    // Get details of a specific invoice
    function getInvoiceDetails(uint256 _invoiceId)
        public
        view
        returns (Invoice memory)
    {
        return invoices[_invoiceId];
    }
}
