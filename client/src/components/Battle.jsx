/* eslint-disable no-tabs */
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import "../App.css";
import SelectCharacter from "./SelectCharacter";
import myEpicGame from "../utils/MyEpicGame.json";
import Arena from "./Arena";
import LoadingIndicator from "./LoadingIndicator";
import Footer  from "./Footer";
import bgvideo from "../assets/foodsearch.mp4";

/*
* Just add transformCharacterData!
*/
import { transformCharacterData } from "../constants";
import { epicGameAddress as CONTRACT_ADDRESS } from "../../config";
// Constants
// const TWITTER_HANDLE = "holyaustin";
// const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  // State
  const navigate = useNavigate();
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Actions
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        /*
         * We set isLoading here because we use return in the next line
         */
        setIsLoading(false);
        return;
      }
      console.log("We have the ethereum object", ethereum);

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (error) {
      console.log(error);
    }
    /*
     * We release the state property after all the function logic
     */
    setIsLoading(false);
  };

  /*
   * Implement your connectWallet method here
   */
  const connectWalletAction = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
       * Fancy method to request access to account.
       */
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      /*
       * Boom! This should print out public address once we authorize Metamask.
       */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  // Render Methods
  // eslint-disable-next-line consistent-return
  const renderContent = () => {
    /*
   * If the app is currently loading, just render out LoadingIndicator
   */
    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
          {/**
          <img
            src={landingimage}
            alt="homepage Gif"
          />
           */}
          <video autoPlay loop muted>
            <source src={bgvideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            type="button"
            className="cta-button connect-wallet-button text-3xl"
            onClick={connectWalletAction}
          >
            Play
          </button>
        </div>
      );
    } if (currentAccount && !characterNFT) {
      // } else if (currentAccount) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;

      /*
	* If there is a connected wallet and characterNFT, it's time to battle!
	*/
    } if (currentAccount && characterNFT) {
      return <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />;
    }
  };

  const checkNetwork = async () => {
    try {
      if (window.ethereum.networkVersion !== "1687185722549573") {
        alert("Please change your Wallet network to Soldier-Ant Testnet!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // UseEffects
  useEffect(() => {
  /*
   * Anytime our component mounts, make sure to immiediately set our loading state
   */
    setIsLoading(true);
    checkIfWalletIsConnected();
  }, []);

  /*
 * Add this useEffect right under the other useEffect where you are calling checkIfWalletIsConnected
 */
  useEffect(() => {
  /*
   * The function we will call that interacts with out smart contract
   */
    const fetchNFTMetadata = async () => {
      console.log("Checking for Character NFT on address:", currentAccount);
      checkNetwork();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      );

      // eslint-disable-next-line no-shadow
      const characterNFT = await gameContract.checkIfUserHasNFT();
      if (characterNFT.name) {
        console.log("User has character NFT");
        setCharacterNFT(transformCharacterData(characterNFT));
      }

      /*
     * Once we are done with all the fetching, set loading state to false
     */
      setIsLoading(false);
    };

    if (currentAccount) {
      console.log("CurrentAccount:", currentAccount);
      fetchNFTMetadata();
    }
  }, [currentAccount]);

  return (
    <div className="App w-full">
      <div className="container max-w-full">
        {/**
        <video autoPlay loop muted>
          <source src={bgvideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
         */}
        <div className="header-container">
          <Link to="/">
            <p className="header gradient-text">⚔️ Soldier Ant Colony⚔️</p>
          </Link>
          <p className="sub-text">Quest for food ... Only lucky colonies grab the food!</p>
          <br />
          {renderContent()}
          {/* This is where our button and image code used to be!
         *	Remember we moved it into the render method.
          <p className="header gradient-text">⚔️ How to play⚔️</p>
          <p className="sub-text">Connect you wallet</p>
          <p className="sub-text">Mint a character from our Marketplace</p>
          <p className="sub-text">Enagege in the quest to get the lucky food slide</p>
          <p className="sub-text">You win if you get the food before your life decresaes to nothing</p>
          <p className="sub-text">You earn a reward</p>
          */}
        </div>
        {/**
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`developed by @${TWITTER_HANDLE} Sponsored by IPFS, Polygon, Spheron, Sequence and chainlink`}
          </a>

        </div>
         */}
      </div>
      <Footer />
    </div>
    
  );
  
};
<Footer />
export default App;
