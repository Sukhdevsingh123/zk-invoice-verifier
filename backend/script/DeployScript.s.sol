pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
// import {InvoiceContract} from "../src/InvoiceContract.sol";
import "../src/InvoiceContract.sol";
import "../src/BlockInvoice.sol";

contract DeployScript is Script {
    function run() public {
        vm.startBroadcast();

        // Deploy  InvoiceContract contract
        InvoiceContract invoiceContract = new InvoiceContract();
        console.log(" invoiceContract deployed at:", address(invoiceContract));

        // Deploy BlockInvoice contract
        BlockInvoice blockInvoice = new BlockInvoice();
        console.log(" BlockInvoice deployed at:", address(blockInvoice));

       
      

        vm.stopBroadcast();
    }
}