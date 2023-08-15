// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CreditBank {
    address payable public owner;
    uint256 public credit;
    uint256 public limit;

    event Add(uint256 credit);
    event Redeem(uint256 credit);

    constructor(uint initCredit, uint mlimit) payable {
        owner = payable(msg.sender);
        credit = initCredit;
        limit = mlimit;
    }
    function getLimit() public view returns(uint256){
        uint256 remaining_credits =  limit-credit;
        return remaining_credits;
    }
    function getCredits() public view returns(uint256){
        return credit;
    }

    function addCredit(uint256 _credit) public payable {
 

        require(msg.sender == owner, "You are not the owner of this account");

        credit += _credit;

        emit Add(_credit);
    }

    error InsufficientCredit(uint256 credit, uint256 redeemCredit);

    function redeemCredit(uint256 _redeemCredit) public {
        require(msg.sender == owner, "You are not the owner of this account");
        if (credit < _redeemCredit) {
            revert InsufficientCredit({
                credit: credit,
                redeemCredit: _redeemCredit
            });
        }

        credit -= _redeemCredit;

        emit Redeem(_redeemCredit);
    }
}
