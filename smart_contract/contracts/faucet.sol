// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract FaucetAnt {

address contAddr = 0xe078fe7A93017F8e18c1C52E79632d0B94c56c26;
 mapping(address=>uint) lastTransfers;
 uint amountToWithdraw = 10 ** 18 * 10;
	

 function requestTokens(address payable requestor) external {
  uint lastTransfer = lastTransfers[requestor];
	 
  require(lastTransfer  + 1 days <= block.timestamp, "Get more after 24 hour. You already requested funds hour ago");
	    
  require(address(this).balance >= amountToWithdraw, "Not enough funds in the faucet. Please donate");
	

  requestor.transfer(amountToWithdraw);
  lastTransfers[requestor] = block.timestamp;
  }
	

 function getContractBalance() public view returns (uint) {
   return address(this).balance;
  }

   function getUserBalance() public view returns (uint) {
      address user = msg.sender;
       return user.balance;
  }
	

  receive() external payable {}
  fallback() external payable {}
	
}