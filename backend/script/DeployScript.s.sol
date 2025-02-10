// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {InvoiceContract} from "../src/InvoiceContract.sol";

contract DeployScript is Script {
   InvoiceContract public invoiceContract;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        invoiceContract = new InvoiceContract();

        vm.stopBroadcast();
    }
}
