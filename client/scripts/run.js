//const hre = require("hardhat");
const main = async () => {
    // eslint-disable-next-line no-undef
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(                        
      ["Woman", "Aang", "Meta"],       
      ["bafybeicosobit5nnjojvvq6smnwmochkyeoccgv5343dckpbaub7bipohy", 
      "bafybeihv3mucelwvki252eevtfjioj5uqs7dqxn2emovq5baikmjgu3nc4", 
      "bafybeigha7y4d3kqkum2zbeeg6c447eyljerlgf5p2iazecyl6ovk24epu"],
      [100, 200, 300],                    
      [100, 50, 25],
      "Elon Musk", // Boss name
      "bafybeihuoiezwtl7vqisctglrox66mlbbaj6lqtldqzuklpwtxe2cj2jom", // Boss image
      10000, // Boss hp
      50 // Boss attack damage
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    
    let txn;
    // We only have three characters.
    // an NFT w/ the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();
    
    txn = await gameContract.attackBoss();
    await txn.wait();
    
    txn = await gameContract.attackBoss();
    await txn.wait();
    
    // Get the value of the NFT's URI.
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);

  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();