import styled from "styled-components";
import Web3 from "web3";
import React, { useState, useEffect } from "react";
import { store } from "../Redux/store";
// import { PayoutTokenABI } from "../config/abi/PayoutContract";
// import { web3_ } from "./Web3Connection";
import Swal from "sweetalert2";
import { ConnectWallet } from "./Web3Connection";
let web3 = new Web3(window.ethereum);

function Index() {
  const [accountAddress, setAccountAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  // const [accountChainid, setAccountChainid] = useState("");

  let web = new Web3(window.ethereum);

  async function getAccount() {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    return account;
  }

  async function getAccountBalance() {
    let balance = (await web.eth.getBalance(accountAddress)) / Math.pow(10, 18);
    return balance;
  }

  async function handleClick() {
    if (typeof window !== "undefined") {
      getAccount().then((response) => {
        setAccountAddress(response);
      });
    }
  }

  function handleMouseEnter() {
    if (typeof window !== "undefined") {
      getAccountBalance().then((response) => {
        setAccountBalance(response);
      });
    }
  }
  return (
    <DropMenu>
      <div class="dropdown" onClick={handleClick}>
        {!!accountAddress
          ? accountAddress.slice(0, 6) +
            "..." +
            accountAddress.slice(
              accountAddress.length - 4,
              accountAddress.length
            )
          : "Connect"}
        <div class="dropdown-content">
          <a onMouseEnter={handleMouseEnter}>{`${accountBalance}`}</a>
        </div>
      </div>
    </DropMenu>
  );
}

const DropMenu = styled.div`
  .dropdown {
    display: inline-block;
    position: relative;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    width: 100%;
    overflow: auto;
    box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.4);
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }
  .dropdown-content a {
    display: block;
    color: #000000;
    padding: 5px;
    text-decoration: none;
  }
  .dropdown-content a:hover {
    color: #ffffff;
    background-color: #00a4bd;
  }
`;

export default Index;

// conncet Wallet
export async function connectToWallet() {
  // const accounts = await window.ethereum.request({
  //   method: "eth_requestAccounts",
  // });
  let data = await ConnectWallet();
  console.log(data, "data")
  const account = data?.address;
  console.log("account", account);
  return { accountAddress: account };
}
//Get user metamask balance
export async function getAccountBalance(netwokrAddress) {
  let balance = (await web3.eth.getBalance(netwokrAddress)) / Math.pow(10, 18);
  return { accountBalance: balance };
}

export async function getAllAccountDetails() {
  return connectToWallet().then(async (res) => {
    store.getState().ConnectivityReducer.metamaskAddress = res.accountAddress;
    console.log(res);
    return getAccountBalance(res.accountAddress).then(async (res) => {
      store.getState().ConnectivityReducer.metamaskBalance = res.accountBalance;
      console.log(res);
      return { result: await showCurrentNetwork() };
    });
  });
}
//check network
export async function showCurrentNetwork() {
  return web3.eth.getChainId().then(async (networkID) => {
    switch (networkID) {
      case 1:
        store.getState().ConnectivityReducer.metamaskNetwork = "Ethereum";
        return "Ethereum";
      // break;
      case 56:
        store.getState().ConnectivityReducer.metamaskNetwork = "Binance";
        return "Binance";
        break;
      case 97:
        store.getState().ConnectivityReducer.metamaskNetwork =
          "Binance:Testnet";
        break;
      default:
        store.getState().ConnectivityReducer.metamaskNetwork = "";
    }
    return networkID;
  });
}

// LOgout
export async function walletDisconnect() {
  console.log(store.getState());
  store.dispatch({ type: "WALLET_DISCONNECT" });
  console.log(store.getState());
  return true;
}

// export const _PayoutContract = async (
//   IDOContractAddress,
//   conAddress,
//   amount
// ) => {
//   const Contract = new web3_.eth.Contract(PayoutTokenABI, conAddress);
//   return Contract.methods
//     .approve(
//       IDOContractAddress,
//       web3_.utils.toWei("1000000000000000000", "ether")
//     )
//     .send({ from: store.getState().ConnectivityReducer.metamaskAddress })
//     .then(() => Swal.fire("Transaction successfull", "", "success"))
//     .catch(() => Swal.fire("Transaction Failed", "", "error"));
// };
