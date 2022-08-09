import './App.css';
import List from"./components/List.jsx"
import { useState,useEffect } from 'react';
import abi from "./utils/todo.json"
import { ethers } from "ethers";


function App() {                  
  const [text, setTxt] = useState("");
  const [arr, setArr] = useState([]);
  const [currentAccount, setCurrentAccount] = useState("");

  function changed(e){
    try{
    setArr([...arr,text]);
    e.preventDefault()}

    catch(error){console.log(error)}
  }

  const contractAddress = "0xb0cb039c35771859a4d5e96c5770acd6f590496f";
  const contractABI = abi.abi;

  
  const publish = async () => {
    try {
      const { ethereum } = window;


      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const todoContract = new ethers.Contract(contractAddress, contractABI, signer);


        const todoTxn = await todoContract.store(arr);
        console.log(todoTxn)
        console.log("Mining...", todoTxn.hash);

        await todoTxn.wait();
        console.log("Mined -- ", todoTxn.hash);

        // var count = await todoContract.retrieve();
        // console.log("Retrieved total wave count...",);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  //end

  //store data

  //end

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])


  return (
    <div classnamename="App">
      <div style={{margin: "100px"}}>
<h1>Decentralised Todo-list</h1>
<form>

<div className="form-group">
<label>Text</label>
<input type="text" className="form-control"  placeholder="Type your Text Here" onChange={e => setTxt(e.target.value)}/>
</div>
<button type="submit" className="btn btn-primary" onClick={changed}>Add</button>
</form>
<br/>
<List arr={arr}/>
<button type="submit" className="btn btn-primary" onClick={publish}>Publish</button>
<button type="submit" className="btn btn-primary" onClick={connectWallet}>Connect</button>

</div>
    </div>
  );
}

export default App;
