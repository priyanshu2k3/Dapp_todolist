// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract todo{

    constructor(){console.log("hello this is working");}

    mapping (uint256 => string[] ) public collection;

   

    function store(string[] memory element)public returns(string[] memory){

        uint time=block.timestamp;
        console.log(time);
        collection[time]=element;
        return collection[time];
    }


    function retrive(uint256 time) public view returns(string[] memory){
        return collection[time];
    }

}