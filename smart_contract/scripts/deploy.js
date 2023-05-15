const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
  const gameContract = await gameContractFactory.deploy( 
    1528, // chainlink subscriptionID                            
    ["Simopelta colony", "Leptogenys Colony", "Labidus Colony", "Eciton Colony", "Dorylus Colony", "Cheliomyrmex Colony", "Aruru Colony", "Protanilla Colony"],       
    ["https://bafkreib5zbyv6ohsdruqcqvbb2v4raoufp5blb4zd4y2utlxyzoehvh7t4.ipfs.nftstorage.link/", 
    "https://bafkreibjl2zkqvk3wzk5xqmysndrqnzppudmydcjy5cvzrqva22r6j7rcm.ipfs.nftstorage.link/",
    "https://bafkreidnt7xkklhdc4jzmrrnoupcy4sppu3pdvmlrukixcxfa7ryiz2ep4.ipfs.nftstorage.link/", 
    "https://bafkreihb3zsipobs7wqovyuzf5l34x5bobxsuagz2ns5jonsagmz5suyaa.ipfs.nftstorage.link/", 
    "https://bafkreiedh2xynj7fr34hdxm5h23z7wwvxvrpdif5fev3w2c4uzf6z2jpme.ipfs.nftstorage.link/",
    "https://bafkreid6r3um3gaeeuetvxdn7xhjxzvpyvl4gzoiz5izrpixidiokrj64m.ipfs.nftstorage.link/", 
    "https://bafkreig2uryk456r2avdyvyhpokifi4ae2ooushmwe4zlfzbdb6q7fjlbu.ipfs.nftstorage.link/",
    "https://bafkreigwipdnzykqtubxgzuywcqddyiyvaetmq46h5zek2sy6zxwq3qll4.ipfs.nftstorage.link/"],
    [500, 1000, 700, 840, 640, 720, 960, 1300 ],                    
    [200, 300, 500, 200, 50, 150, 100, 200],
    "Zant the Repeller", // Boss name
    "https://bafkreihzrod47vg2uho2rmd7x76jqicus2m3e4tjdsbf6jm64o4v2o55qm.ipfs.nftstorage.link/", // Boss image
    5000, // Boss hp
    100 // Boss attack damage
  );
  await gameContract.deployed();
  console.log("EpicGame Contract deployed to:", gameContract.address);


  fs.writeFileSync('../client/config.js', `
  export const epicGameAddress = "${gameContract.address}"
  `)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

