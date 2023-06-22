import { ConnectWallet } from "@thirdweb-dev/react";
import "./styles/Home.css";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import { useState } from "react";
import { useEffect } from "react";
import {
  useContract,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
// const contract = await sdk.getContract("0x553BC16Eb052b2297c64bef79423008D280b9768");
// const path = require("path")

export default function Home() {
  const { contract } = useContract(
    "0x553BC16Eb052b2297c64bef79423008D280b9768"
  );
  const { data, isLoading } = useContractRead(contract, "latestResponse");
  const { mutateAsync: executeRequest, isLoading2 } = useContractWrite(
    contract,
    "executeRequest"
  );
  // const temp = "";
  const [tempSource, setTempSource] = useState({});
  const call = async () => {
    try {
      const data = await executeRequest({
        args: [
          tempSource,
          [],
          ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          1843,
          300000,
        ],
      });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
    // console.log(contract);
  };
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async (event) => {
    const file = await event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setTempSource(fileContent);
      // executeContract(fileContent); // Call the executeContract function with the file content
    };
    reader.readAsText(file);
    // console.log(tempSource);
  };

  useEffect(() => {
    console.log(typeof(tempSource)); // Print the updated tempSource value
  }, [tempSource]);


  return (
    <div className="container">
      <main className="main">
        <h1 className="title">
          Welcome to <a href="https://thirdweb.com/">thirdweb</a>!
        </h1>

        <p className="description">
          Get started by configuring your desired network in{" "}
          <code className="code">src/index.js</code>, then modify the{" "}
          <code className="code">src/App.js</code> file!
        </p>

        <div className="connect">
          <ConnectWallet
            dropdownPosition={{ side: "bottom", align: "center" }}
          />
        </div>
        <div className="file-input">
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className="submit-button">
          <button onClick={call}>Submit</button>
        </div>
        <div className="grid">
          <a href="https://portal.thirdweb.com/" className="card">
            <h2>Portal &rarr;</h2>
            <p>
              Guides, references and resources that will help you build with
              thirdweb.
            </p>
          </a>

          <a href="https://thirdweb.com/dashboard" className="card">
            <h2>Dashboard &rarr;</h2>
            <p>
              Deploy, configure and manage your smart contracts from the
              dashboard.
            </p>
          </a>

          <a href="https://portal.thirdweb.com/templates" className="card">
            <h2>Templates &rarr;</h2>
            <p>
              Discover and clone template projects showcasing thirdweb features.
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
