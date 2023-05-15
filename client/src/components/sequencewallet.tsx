import React from "react";
import { ETHAuth, Proof } from "@0xsequence/ethauth";
import { configureLogger } from "@0xsequence/utils";
import { sequence } from "0xsequence";

const ConnectSequence = () => {
  const network = "mumbai";
  const wallet = new sequence.Wallet(network);

  const connect = async (authorize: boolean = false) => {
    const connectDetails = await wallet.connect({
      app: "Soldier Ant Colony",
      authorize,
      keepWalletOpened: true
    });

    console.warn("connectDetails", { connectDetails });

    if (authorize) {
      const ethAuth = new ETHAuth();

      if (connectDetails.proof) {
        const decodedProof = await ethAuth.decodeProof(
          connectDetails.proof.proofString,
          true
        );
        console.warn({ decodedProof });

        const isValid = await wallet.utils.isValidTypedDataSignature(
          await wallet.getAddress(),
          connectDetails.proof.typedData,
          decodedProof.signature,
          await wallet.getAuthChainId()
        );
        console.log("isValid?", isValid);
        if (!isValid) throw new Error("sig invalid");
      }
    }

    // console.log("wallet address:", wallet.getAddress())
    console.log("provider is:", wallet.getProvider())

  };
  return (
    <><div>
        <button
          type="button"
          // onClick={getstarted}
          onClick={() => connect(true)}
          className="flex flex-row justify-center items-center bg-purple-300 py-5 px-20 mx-8 sm:mx-3 sm:py-2 sm:px-8 rounded-full cursor-pointer text-black font-semibold hover:bg-purple-600 hover:text-white"
        >
            Connect with Sequence
    
        </button>
      </div></>
  );
};

export default ConnectSequence;