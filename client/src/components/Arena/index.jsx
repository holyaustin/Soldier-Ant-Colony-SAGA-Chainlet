import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import axios from "axios";
import { transformCharacterData } from "../../constants";
import { epicGameAddress } from "../../../config";
import myEpicGame from "../../utils/MyEpicGame.json";
import "./Arena.css";
import LoadingIndicator from "../LoadingIndicator";

/*
 * We pass in our characterNFT metadata so we can show a cool card in our UI
 */
const Arena = ({ characterNFT, setCharacterNFT }) => {
  // State
  const [gameContract, setGameContract] = useState(null);
  const [boss, setBoss] = useState(null);
  const [attackState, setAttackState] = useState("");
  /*
* Toast state management
*/
  const [showToast, setShowToast] = useState(false);

  const runAttackAction = async () => {
    try {
      if (gameContract) {
        setAttackState("attacking");
        console.log("Attacking boss...");
        const txn = await gameContract.attackBoss();
        await txn.wait();
        console.log(txn);
        setAttackState("hit");

        /*
        * Set your toast state to true and then false 5 seconds later
        */
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      }
    } catch (error) {
      console.error("Error attacking boss:", error);
      setAttackState("");
    }
  };

  // UseEffects
  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        epicGameAddress,
        myEpicGame.abi,
        signer
      );

      setGameContract(gameContract);
    } else {
      console.log("Ethereum object not found");
    }
  }, []);

  useEffect(() => {
    const fetchBoss = async () => {
      const bossTxn = await gameContract.getBigBoss();
      console.log("Boss:", bossTxn);
      setBoss(transformCharacterData(bossTxn));
    };

    /*
    * Setup logic when this event is fired off

    */

    // NFTPort code here
    async function mintReward() {
      const { ethereum } = window;
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      // const playerAccount = deploy;

      const options = {
        method: "POST",
        url: "https://api.nftport.xyz/v0/mints/easy/urls",
        headers: { "Content-Type": "application/json", Authorization: "768bfb7a-087d-4ee1-8bb0-5498cc36ad46" },
        data: {
          chain: "polygon",
          name: "Soldier Ant NFT",
          description: "Soldier Ant NFT Reward for winning the game",
          // using the Light House IPFS service to pin Reward
          file_url: "https://gateway.lighthouse.storage/ipfs/Qmaxc7iEKNGCFaPwCA8noaC67TxtFfj3waTBU8Wpdhvf5p",
          mint_to_address: accounts[0],
        },
      };

      axios.request(options).then((response) => {
        console.log(response.data);
      }).catch((error) => {
        console.error(error);
      });
    }

    const onAttackComplete = (newBossHp, newPlayerHp) => {
      const bossHp = newBossHp.toNumber();
      const playerHp = newPlayerHp.toNumber();

      console.log(`AttackComplete: Boss Hp: ${bossHp} Player Hp: ${playerHp}`);

      /*
        * Update both player and boss Hp
        */
      setBoss((prevState) => ({ ...prevState, hp: bossHp }));

      setCharacterNFT((prevState) => ({ ...prevState, hp: playerHp }));

      if (playerHp === 0) {
        console.log("Game Over... You Lost");
        alert("Game Over... You lost. No food for you and your colony. ");
        mintReward();
      }
      if (bossHp === 0) {
        console.log("Game Over... You Won");
        alert("Game Over... You Won the battle. Enjoy the food with your colony. NFT sent for winning, Check your wallet on Mumbai testnet");
        mintReward();
      }
    };

    if (gameContract) {
      fetchBoss();
      gameContract.on("AttackComplete", onAttackComplete);
    }

    /*
    * Make sure to clean up this event when this component is removed
    */
    return () => {
      if (gameContract) {
        gameContract.off("AttackComplete", onAttackComplete);
      }
    };
  }, [gameContract, setCharacterNFT]);

  return (
    <div className="arena-container">
      {/* Add your toast HTML right here */}
      {boss && characterNFT && (
      <div id="toast" className={showToast ? "show" : ""}>
        <div id="desc">{`💥 ${boss.name} was hit for ${characterNFT.attackDamage}!`}</div>
      </div>
      )}

      {/* Boss : Replace your Boss UI with this */}
      {boss && (
      <div className="boss-container">
        <div className={`boss-content  ${attackState}`}>
          <h2>🔥 {boss.name} 🔥</h2>
          <div className="image-content">
            <img src={boss.imageURI} alt={`Boss ${boss.name}`} />
            <div className="health-bar">
              <progress value={boss.hp} max={boss.maxHp} />
              <p>{`${boss.hp} / ${boss.maxHp} HP`}</p>
            </div>
          </div>
        </div>
        <div className="attack-container">
          <button type="button" className="cta-button" onClick={runAttackAction}>
            {`💥 Attack ${boss.name}`}
          </button>
        </div>
        {/* Add this right under your attack button */}
        {attackState === "attacking" && (
        <div className="loading-indicator">
          <LoadingIndicator />
          <p>Attacking ⚔️</p>
        </div>
        )}
      </div>
      )}

      {/* Character NFT : Replace your Character UI with this */}
      {characterNFT && (
      <div className="players-container">
        <div className="player-container">
          <div className="player">
            <div className="image-content">
              <h2>{characterNFT.name}</h2>
              <img
                src={characterNFT.imageURI}
                alt={`Character ${characterNFT.name}`}
              />
              <div className="health-bar">
                <progress value={characterNFT.hp} max={characterNFT.maxHp} />
                <p>{`${characterNFT.hp} / ${characterNFT.maxHp} HP`}</p>
              </div>
            </div>

          </div>
          <div className="stats font-extrabold font-red-500 mt-5 text-2xl">
            <h2>{`⚔️ Attack Damage: ${characterNFT.attackDamage}`}</h2>
          </div>
        </div>

      </div>
      )}
    </div>
  );
};

export default Arena;
