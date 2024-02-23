// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Document {
    mapping(address => string) public documents;

    function uploadDocument(string memory _ipfsHash) public {
        documents[msg.sender] = _ipfsHash;
    }

    function getDocument(address _user) public view returns (string memory) {
        return documents[_user];
    }
}
