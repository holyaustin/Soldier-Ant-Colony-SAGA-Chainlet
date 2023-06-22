/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
import "./init";
import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import faucetABI from "../utils/FaucetAnt.json";
import { faucetAntAddress } from "../../config3";

// eslint-disable-next-line max-len
const MintCharacter = () => {
  // const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  // const [txURL, setTxURL] = useState();
  const [txStatus, setTxStatus] = useState();
  const [wallet, setWallet] = useState();
  const [formInput, updateFormInput] = useState({ name: "" });

  // UseEffect
  useEffect(() => {
    // const { ethereum } = window;
    getAddress();
  }, []);

  const getAddress = async () => {
    if (typeof window?.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts");
      const WALLET_CONNECTED = accounts[0];
      setWallet(WALLET_CONNECTED);
    } else {
      console.log("Ethereum object not found");
    }
  };

  const sendTxToBlockchain = async () => {
    console.log("SsendTxToBlockchain");
    console.log("Connected wallet is", wallet);
    // if (!name) return;
    try {
      setTxStatus("connecting to Soldier Ant Testnet Blockchain.");
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      console.log("Signer is", signer);
      console.log("Providerto contract", provider);
      const connectedContract = new ethers.Contract(faucetAntAddress, faucetABI.abi, signer);
      console.log("Connected to contract", faucetAntAddress);
      console.log("Connected wallet is", wallet);

      const mintNFTTx = await connectedContract.requestTokens(wallet);
      console.log("Token successfully sent to user");
      await mintNFTTx.wait();
      alert("ANT token successfulkly sent to your address");
      return mintNFTTx;
    } catch (error) {
      setErrorMessage("Failed to send tx to Soldier-Ant Testnet.");
      console.log(error);
    }
  };

  const mintNFTToken = async (e) => {
    e.preventDefault();
    sendTxToBlockchain();
  };

  return (
    <div className="bg-gray-100">
      <hr className="h-1 bg-white" />
      <div className="text-4xl text-center text-black font-bold mt-10 mb-10">
        <h1> Get Ant Tokens</h1>
      </div>
      <div className="flex justify-center">
        <div className="w-1/2 flex flex-col pb-12 ">
          <input
            placeholder="Paste wallet Address"
            value={wallet}
            className="mt-5 border rounded p-4 text-xl"
            onChange={(e) => updateFormInput({ ...formInput, name: e.target.value })}
          />
          <div className="MintNFT text-black text-xl">

            {txStatus && <p>{txStatus}</p>}

            {errorMessage}
          </div>

          <button type="button" onClick={(e) => mintNFTToken(e)} className="font-bold mt-8 mb-5 bg-purple-700 text-white text-2xl rounded p-4 shadow-lg">
            Get free Ant Tokens
          </button>

          <h1> Tokens are dispensed every 24 hours. Use Token to test the soldier Ant Game and buy Assets from the marketplace</h1>
        </div>
      </div>
    </div>

  );
};
export default MintCharacter;
