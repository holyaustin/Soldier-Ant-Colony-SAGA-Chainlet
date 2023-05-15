const main = async () => {
    // eslint-disable-next-line no-undef
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    
    const gameContract = await gameContractFactory.deploy(                        
      ["Simopelta colony", "Leptogenys Colony", "Labidus Colony", "Eciton Colony", "Dorylus Colony", "Cheliomyrmex Colony", "Aruru Colony", "Protanilla Colony"],       
      ["https://gateway.pinata.cloud/ipfs/QmTEBgcjAaAAwzDiPsW6mtqpZNiePtD6XgCTmhUbu5YZMX", 
      "https://gateway.pinata.cloud/ipfs/QmTVY5jDksCTLcANHnq2v81G6LoBiCpoNHWUMCXwqmyRLV",
      "https://gateway.pinata.cloud/ipfs/QmZmiX5GGuiCBYJhBCHMK6NR8q9GCoMooZZxxjy6xv59Gu", 
      "https://gateway.pinata.cloud/ipfs/QmREg5639jGpj4oMnXZ1emZfzaRUx57fx8XNxU93YXiB8d", 
      "https://gateway.pinata.cloud/ipfs/QmQPm6UnPWTfn7hGLRGjumb2ZQptcFSjkz2yQhfn7CSMTm",
      "https://gateway.pinata.cloud/ipfs/QmWmf8wQ3k9mCmcwsHgDdB1FFaEYr61fH1o6JCLrnX7wGH", 
      "https://gateway.pinata.cloud/ipfs/QmXjTmbPy4LMz47gjfRb4USdqp4d87iv5iiUFUk3xvWfbB",
      "https://gateway.pinata.cloud/ipfs/QmaTRxkE9XToE4J8TWUmAxdi8B5V8krNdaKx6w17fuuop9"],
      [200, 120, 100, 240, 140, 120, 160, 1300 ],                    
      [100, 60, 50, 100, 50, 50, 100, 100],
      "Zant the Repeller", // Boss name
      "https://gateway.pinata.cloud/ipfs/QmVjgWQD8yXFgYx5XfevE8yc1P7HJdcdRA5zZ2xV4XYc3D", // Boss image
      1000, // Boss hp
      100 // Boss attack damage
    );
  
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);
  
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