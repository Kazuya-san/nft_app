import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { BiPlus, BiMinus } from "react-icons/bi";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { getAllAccountDetails, connectToWallet } from "../Services/Index";
import { store } from "../Redux/store";
import { ConnectWallet, Contract, web3 } from "../Services/Web3Connection";
import ProgressBar from "../Components/ProgressBar";
import "./Slider.css";
import Slider from "../Components/Slider";
import moment from "moment";
import injectedModule from '@web3-onboard/injected-wallets'
import {
  init,
  useConnectWallet,
  useSetChain,
  useWallets
} from '@web3-onboard/react'
import walletConnectModule from '@web3-onboard/walletconnect'


const price = 0.11;
const EST = new Date().toLocaleString("en-US", {
  timeZone: "America/New_York",
});


const maxNFT = 20;
const injected = injectedModule()

const walletConnect = walletConnectModule()



const web3Onboard = init({
  wallets: [
    injected,
    walletConnect
  ],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: 'https://mainnet.infura.io/v3/ababf9851fd845d0a167825f97eeb12b'
    },
    {
      id: '0x3',
      token: 'tROP',
      label: 'Ethereum Ropsten Testnet',
      rpcUrl: 'https://ropsten.infura.io/v3/ababf9851fd845d0a167825f97eeb12b'
    },
    {
      id: '0x4',
      token: 'rETH',
      label: 'Ethereum Rinkeby Testnet',
      rpcUrl: 'https://rinkeby.infura.io/v3/ababf9851fd845d0a167825f97eeb12b'
    },
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Matic Mainnet',
      rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
    }
  ],
  appMetadata: {
    name: 'Bootbay',
    icon: `${process.env.PUBLIC_URL}/boot-bay-assets/NFT_82x82.png`,
    description: 'Bootbay nft minting app',
    recommendedInjectedWallets: [
      { name: 'MetaMask', url: 'https://metamask.io' },
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' }
    ]
  }
})


function HomePage() {
  const [Counter, setCounter] = useState(1);
  const [Connect, setConnect] = useState(false);
  const [isTransaction, setisTransaction] = useState(false);
  const [supply, setSupply] = useState(1000);
  useEffect(async () => {
    if (store.getState().ConnectivityReducer.metamaskConnect === true) {
      setSupply(await Contract.methods.supply().call());
    }
  }, []);

  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const connectedWallets = useWallets()

  console.log(wallet, "wallet")
  console.log(connecting, "connecting")
  console.log(connectedWallets, "connected wallets")

  async function _HandleConnect() {
    await getAllAccountDetails()
      .then(async (res) => {
        if (res.result !== "") {
          setConnect(true);
          store.getState().ConnectivityReducer.metamaskConnect = true;
        }
      })
      .catch((err) => alert(err));
    // ConnectWallet()
    //   .then((res) => {
    //     setConnect(true);
    //     store.getState().ConnectivityReducer.metamaskConnect = true;
    //   })
    //   .catch((err) => alert(err));
  }

  function handleIncrement() {
    if (Counter < 20) {
      setCounter(Counter + 1);
    }
  }
  function handleDecrement() {
    if (Counter === 1) {
      setCounter(1);
    } else setCounter(Counter - 1);
  }
  async function setMax() {
    setCounter(20);
  }
  async function Buy() {
    await Contract.methods
      .balanceOf(store.getState().ConnectivityReducer.metamaskAddress)
      .call()
      .then(async (res) => {
        setisTransaction(true);
        if (res >= 5) {
          alert(
            `You Don't mint NFT more than 5 on Same Address,You Only  Can Mint ${
              res - 5
            } NFT`
          );
          setisTransaction(false);
        } else {
          await Contract.methods
            .mintBuy(parseInt(Counter))
            .send({
              from: store.getState().ConnectivityReducer.metamaskAddress,
              value: web3.utils.toWei(`${Counter * price}`, "ether"),
              gas: 150000,
              gasPrice: "30000000000",
            })
            .on("transactionHash", function (hash) {})
            .on("confirmation", function (confirmationNumber, receipt) {})
            .then(function (data) {
              console.log(data);
              setisTransaction(false);
              setConnect(false);
              setCounter(1);
            })
            .catch((err) => {
              setisTransaction(false);
              setConnect(false);
              setCounter(1);
              alert("User Rejected Transaction");
            });
        }
      });
  }
  return (
    <>
      <div className="h-full overflow-y-scroll">
        <div className=" max-w-[1080px] h-full relative mx-auto relative flex flex-col-reverse md:flex-row ">
          <div className="hidden md:block overflow-hidden flex-1 relative  md:mb-0 mb-[40px] ">
            <Slider />
          </div>
          <div className=" flex-1 flex items-center h-screen py-[50px]">
            <div className="relative rounded flex flex-col md:justify-center md:flex-1 w-full md:max-w-4xl mx-auto h-full">
              <div className=" text-white text-xl text-center font-semibold ">
                <div className=" text-white text-xl text-center font-semibold ">
                  Special Price for Discord Members
                </div>
                <div className=" text-white text-base text-center font-semibold ">
                  {moment(new Date(EST).getTime())
                    .format("MMM D - hh:mm a")
                    .toString()
                    .toLocaleUpperCase()}{" "}
                  EST
                </div>
              </div>
              <div className="px-2 my-[25px] text-white text-xl text-center flex justify-between font-semibold">
                <div>
                  <div>Supply</div>
                  <div>{supply}</div>
                </div>
                <div>
                  <div>Price</div>
                  <div>{price}&nbsp;ETH</div>
                </div>
                <div>
                  <div>MAX</div>
                  <div>{maxNFT} PER WALLET</div>
                </div>
              </div>
              <div className="opacity-100 ">
                <div className=" rounded-[15px] overflow-y-auto h-full opacity-100 mx-auto">
                  <div className=" rounded-md max-w-[520px] mx-auto w-full h-full bg-[#0b0b08cc] p-[32px]">
                    <div className=" w-full">
                      {" "}
                      <div className="text-white font-bold text-[40px] py-4">
                        BONUS SALE
                      </div>
                      {/* NFT Block */}
                      <div className="mb-[32px] items-center p-[12px] border-2 border-white text-white rounded-md flex justify-between p-[12px]">
                        <div className="bg-black rounded-md">
                          <img
                            width="82px"
                            className="rounded-md"
                            src={
                              process.env.PUBLIC_URL +
                              "boot-bay-assets/NFT_82x82.png"
                            }
                          ></img>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">Price per NFT</div>
                          <div className="text-white text-2xl">
                            {price} ETH Each
                          </div>
                        </div>
                      </div>
                      {/* Counter */}
                      <div>
                        <div className="mb-[32px] border-2 border-white rounded-md flex justify-between p-[12px] bg-[#7b7b7b69]">
                          <div className="flex items-center text-white justify-center ">
                            <span
                              className="text-xl mx-2 text-white cursor-pointer"
                              onClick={handleDecrement}
                            >
                              <BiMinus />
                            </span>
                            <span className="" max={5}>
                              {Counter}
                            </span>
                            <span
                              className="text-xl mx-2 text-white cursor-pointer"
                              onClick={handleIncrement}
                            >
                              <BiPlus />
                            </span>
                          </div>
                          {/* Set MAximaum Limit */}
                          <div
                            className="bg-white text-[12px] py-[5px] px-[15px] shadow-white shadow-lg cursor-pointer"
                            onClick={setMax}
                            style={{ boxShadow: "0 0 10px 2px #fff" }}
                          >
                            SET MAX
                          </div>
                        </div>
                        <hr className=""></hr>
                        <div className="h-[65px] items-center flex justify-between font-bold text-base xl:text-base  text-white">
                          <span>Total</span>
                          <span>
                            {" "}
                            {parseFloat(Counter * price).toFixed(2)}
                            &nbsp; ETH
                          </span>
                        </div>
                        <hr className="mb-[32px]"></hr>
                        <div className="">
                          {Connect ? (
                            <button
                              className="xl:text-sm py-[5px] px-[15px]  w-auto text-sm bg-white text-black font-bold"
                              style={{ boxShadow: "0 0 10px 2px #fff" }}
                              onClick={Buy}
                            >
                              MINT
                            </button>
                          ) : (
                            <button
                              className=" xl:text-base  py-[5px] px-[15px] mb-2 w-auto text-sm bg-white text-black font-bold "
                              onClick={() =>_HandleConnect()}
                              style={{ boxShadow: "0 0 10px 2px #fff" }}
                            >
                              CONNECT WALLET
                            </button>
                          )}
                          <div>
                            <ProgressBar />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:hidden block py-[20px]">
                <Slider />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
