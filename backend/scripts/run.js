const main = async () => {
    const todo = await hre.ethers.getContractFactory("todo");
    const todoContract = await todo.deploy();
    await todoContract.deployed();
    console.log("Contract deployed to:", todoContract.address);
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