//SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.7.3;

contract HelloWorld {
    event contractMessageUpdated(string oldMessage, string newMessage);

    //Declaring a state variable which holds the message
    string public message;

    constructor(string memory initMessage) {
        message = initMessage;
    }

    //function to fetch the message
    function getMessage() public view returns (string memory) {
        return message;
    }

    //function to update the message
    function updateMessage(string memory _message) public {
        string memory oldMessage = message;
        message = _message;
        emit contractMessageUpdated(oldMessage, _message);
    }
}
