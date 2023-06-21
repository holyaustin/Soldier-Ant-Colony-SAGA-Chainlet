const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const FaucetAnt = await hre.ethers.getContractFactory("FaucetAnt");
  const faucetAnt = await FaucetAnt.deploy();
  await faucetAnt.deployed();
  console.log("Ant Token faucet deployed to:", faucetAnt.address);

  fs.writeFileSync('../client/config3.js', `
  export const faucetAntAddress = "${faucetAnt.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });