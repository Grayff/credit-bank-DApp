import { useState, useEffect } from "react";
import { ethers } from "ethers";
import scb_abi from "../artifacts/contracts/CreditBank.sol/CreditBank.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [scb, setscb] = useState(undefined);
  const [credit, setCredit] = useState(undefined);
  const [limit, setLimit] = useState(undefined);
  const [showStudentId, setShowStudentId] = useState(true);
  const [showCredits, setShowCredits] = useState(false);
  const [showCreditLimit, setShowCreditLimit] = useState(false);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const scbABI = scb_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getscbContract();
  };

  const getscbContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const scbContract = new ethers.Contract(contractAddress, scbABI, signer);

    setscb(scbContract);
  };

  const getCredits = async () => {
    if (scb) {
      setCredit((await scb.getCredits()).toNumber());
    }
  };
  const getLimit = async () => {
    if (scb) {
      setLimit((await scb.getLimit()).toNumber());
    }
  };

  const addCredit = async () => {
    if (scb) {
      let tx = await scb.addCredit(1);
      await tx.wait();
      getCredits();
      getLimit();
    }
  };

  const redeemCredit = async () => {
    if (scb) {
      let tx = await scb.redeemCredit(1);
      await tx.wait();
      getCredits();
      getLimit();
    }
  };

  const toggleStudentId = () => {
    setShowStudentId(true);
    setShowCredits(false);
    setShowCreditLimit(false);
  };

  const toggleCredits = () => {
    setShowStudentId(false);
    setShowCredits(true);
    setShowCreditLimit(false);
  };

  const toggleCreditLimit = () => {
    setShowStudentId(false);
    setShowCredits(false);
    setShowCreditLimit(true);
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this scb.</p>;
    }

    if (!account) {
      return (
        <button onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (credit === undefined) {
      getCredits();
    }
    if (limit === undefined) {
      getLimit();
    }

    return (
      <div>
        <button onClick={toggleStudentId} className="toggle-button" style={{ marginBottom: "10px", width: "150px" }}>
          Student ID
        </button>
        {showStudentId && (
          <div>
            <p>Student ID: {account}</p>
          </div>
        )}
        <br/>
        <button onClick={toggleCredits} className="toggle-button" style={{ marginBottom: "10px", width: "150px" }}>
          Credits
        </button>
       
        {showCredits && (
          <div>
            <p>Student Credit: {credit}</p>
          </div>
        )}
        <br/>
        <button onClick={addCredit} style={{ marginBottom: "10px", width: "150px" }}>
          Add Credit
        </button>
        <br/>
        <button onClick={redeemCredit} style={{ marginBottom: "10px", width: "150px" }}>
          Redeem Credit
        </button>
        <br/>
        <button onClick={toggleCreditLimit} className="toggle-button"  style={{ marginBottom: "10px", width: "150px" }}>
          Limit
        </button>
        {showCreditLimit && (
          <div>
            <p>Max credit limit left: {limit}</p>
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Student Credit Bank</h1>
      </header>
      <div className="user-container">{initUser()}</div>
      <style jsx>{`
        .container {
          text-align: center;
          background-color: #b2d8b2; /* Set the background color to green */
          min-height: 100vh; /* Ensure the background color extends to the full height */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .user-container {
          margin-top: 20px;
        }

        .action-button {
          width: 150px;
          background-color: #007bff;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
        }

        .toggle-button {
          background-color: #ffc107;
          color: black;
          border: none;
          padding: 5px 10px;
          border-radius: 5px;
          cursor: pointer;
          margin: 0 5px;
        }
      `}</style>
    </main>
  );
}
