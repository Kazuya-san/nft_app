import "./App.css";
import React from "react";
import HomePage from "./Pages/HomePage";
import Web3 from "web3";
import { ConnectWallet, Contract } from "./Services/Web3Connection";
import { store } from "./Redux/store";
const web3_ = new Web3(window.ethereum);
function App() {
  React.useEffect(async () => {
    if (window.ethereum !== undefined) {
      window.ethereum.on("chainChanged", (chain) => {
        console.log(chain);
        if ("0x1" !== chain) {
          window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x1" }],
          });
        }
      });
      window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
    }
  }, []);
  return (
    <div className="App">
      <main className="h-screen overflow-hidden">
        <HomePage />
      </main>
    </div>
  );
}

export default App;
