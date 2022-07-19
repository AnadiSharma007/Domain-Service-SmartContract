const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("hellothere");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
   
    let txn = await domainContract.register("lightsaber",  {value: hre.ethers.utils.parseEther('0.01')});
    await txn.wait();
    console.log("Minted domain lightsaber.hellothere");
  
    txn = await domainContract.setRecord("lightsaber", "Am I a banana or a hello??");
    await txn.wait();
    console.log("Set record for lightsaber.hellothere");
  
    const address = await domainContract.getAddress("lightsaber");
    console.log("Owner of domain lightsaber:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
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