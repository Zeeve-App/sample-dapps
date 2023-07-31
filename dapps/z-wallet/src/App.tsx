import React, { useState } from "react";
import "./App.css";
import ZeeveLogo from "./assests/images/zeeve-logo.png";
import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import ConnectWallet from "./components/ConnectWallet";
import WalletInfo from "./components/WalletInfo";
import WalletConnectionStatus from "./components/WalletConnectionStatus";
import DisconnectWallet from "./components/DisconnectWallet";
import TransferToken from "./components/TransferToken";
import WalletOperations from "./components/WalletOperations";

/**
 * Main App JSX component of the application
 * @returns `JSX.Element`
 */
const App = () => {
  /** local state to manage rpc endpoint of the tezos node*/
  const [rpcUrl] = useState("https://tezos-ghostnet-3q8g82.zeeve.net/fJeC7kmxkSecmyDKYd2J");
  /** local state to manage indexer endpoint of the tezos indexing service*/
  const [indexerUrl] = useState("https://api.ghostnet.tzkt.io");
  /** local state to manage explorer application endpoint of the tezos*/
  const [explorerUrl] = useState("https://ghostnet.tzkt.io");
  /** local state to manage tezos tool kit intance initi */
  const [Tezos] = useState<TezosToolkit>(new TezosToolkit(rpcUrl));
  /** local state to manage wallet instance */
  const [wallet, setWallet] = useState<BeaconWallet | null>(null);
  /** local state to manage wallet connection status */
  const [beaconConnection, setBeaconConnection] = useState<boolean>(false);
  /** local state to manage wallet public address */
  const [userAddress, setUserAddress] = useState<string>("");
  /** local state to manage wallet balance */
  const [userBalance, setUserBalance] = useState<number>(0);
  /** local state to manage hide/unhide receive QR code */
  const [showQR, setShowQR] = useState(false);
  /** local state to manage hide/unhide of send token input form */
  const [showSendForm, setShowSendForm] = useState(false);

  return (
    <div className="h-100 d-flex align-items-center justify-content-center">
      <div className="card rounded-3 border-0 shadow my-5">
        <div className="card-header border-0 bg-muted d-flex align-items-center justify-content-between">
          <h5 className="text-dark my-2 fw-bold d-flex align-items-center justify-content-center">
            <img
              src={ZeeveLogo}
              width={"25rem"}
              className="me-2"
              alt="zeeve-logo"
            />
            WALLET
          </h5>
          <WalletConnectionStatus beaconConnection={beaconConnection} />
        </div>
        <div className="card-body px-5">
          <p className="text-muted fs-7">
            Welcome to{" "}
            <span className="text-dark fw-bold">Tezos India Hackathon!</span> in
            collaboration with <span className="text-dark fw-bold">Zeeve</span>{" "}
            as the officail Web3 Infrastructure partner.
            <br />
            This is a demo dApp for utilising the wallet management capability
            of Tezos and web3 infra automation & scalable capcability of Zeeve.
          </p>
          <WalletInfo
            userAddress={userAddress}
            userBalance={userBalance}
            setUserBalance={setUserBalance}
            Tezos={Tezos}
          />
          <TransferToken
            userAddress={userAddress}
            Tezos={Tezos}
            showQR={showQR}
            setShowQR={setShowQR}
            showSendForm={showSendForm}
            setShowSendForm={setShowSendForm}
          />
          {!userAddress && (
            <ConnectWallet
              wallet={wallet}
              setWallet={setWallet}
              setUserAddress={setUserAddress}
              setUserBalance={setUserBalance}
              setBeaconConnection={setBeaconConnection}
              Tezos={Tezos}
              rpcUrl={rpcUrl}
            />
          )}
          <WalletOperations
            userAddress={userAddress}
            showQR={showQR}
            showSendForm={showSendForm}
            indexerUrl={indexerUrl}
            explorerUrl={explorerUrl}
          />
          {userAddress && (
            <DisconnectWallet
              wallet={wallet as BeaconWallet}
              setWallet={setWallet}
              setUserAddress={setUserAddress}
              setUserBalance={setUserBalance}
              setBeaconConnection={setBeaconConnection}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
