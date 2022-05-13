import React, { useState, useEffect } from "react";
import env from "react-dotenv";
import { ethers } from "ethers";
import contractAbi from "./HelloWorld.json";

const provider = new ethers.providers.AlchemyProvider("ropsten");
const signer = new ethers.Wallet(env.METAMASK_PRIVATE_KEY, provider);
const contractHello = new ethers.Contract(
      env.CONTRACT_ADDRESS,
      contractAbi.abi,
      signer
    );



export const HelloWorld = () => {
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [status, setStatus] = useState("Input your desired message☝");
 




  const loadAccount= async ()=>{
    if (window.ethereum) {
      const acc = await window.ethereum.request({
        method: "eth_accounts",
      });
      setAccounts(acc);
      console.log(accounts[0]);
    }
  }


  const connectMetamask = async () => {
    if (window.ethereum) {
      const acc = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(acc);
      console.log(accounts[0]);
    }
  };

  function addSmartContractListener() {
    contractHello.on("contractMessageUpdated", (oldMsg,newMsg) => {
      setMessage(newMsg);
      setStatus("Input your desired message☝");
    });
  }



  useEffect(() => {
    loadAccount();
    
    getCurrentMessage();
  },[]);


  
  
  
  
  
  const getCurrentMessage = async () => {
    if (window.ethereum || accounts.length>0) {
     try {
        const msg = await contractHello.message();
        setMessage(msg);
        console.log("Current Message: ", message);
      } catch (err) {
        console.log(err);
      }
    } else {
      setStatus("You need to connnect your metamask wallet.");
    }
  };

  const updateMessage = async () => {
    console.log("Update message called");
    const msg= newMessage;
    setNewMessage("");
    setStatus("Your Message is upadated and will take some time to reflect.");
    const tx = await contractHello.updateMessage(msg);
    addSmartContractListener();
    
    
    
  };

  return (
    <div className="box">
      <h1>Hello, Welcome to the world of Blockchain</h1>
      <button className="account-btn" onClick={connectMetamask}>
        {accounts.length > 0
          ? accounts[0].substring(0, 6) + "..." + accounts[0].substring(38)
          : "Connect Wallet"}
      </button>
      <h2>Message stored on the chain : </h2>
      <p>{message}</p>
      <h2>Input your desired message here : </h2>
      <input
        type="text"
        className="message"
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
        }}
      />
      <p>{status}</p>
      <button className="btn" type="text" onClick={updateMessage}>
        Update Message
      </button>
    </div>
  );
}
