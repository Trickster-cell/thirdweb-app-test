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
  const [isLoading, setIsLoading] = useState(false);
  const { contract } = useContract(
    "0x553BC16Eb052b2297c64bef79423008D280b9768"
  );
  const { data } = useContractRead(contract, "latestResponse");
  const { mutateAsync: executeRequest, isLoading2 } = useContractWrite(
    contract,
    "executeRequest"
  );
  // const temp = "";
  const [tempSource, setTempSource] = useState({});
  const handleCall = async () => {
    try {
      setIsLoading(true);
      const data = await executeRequest({
        args: [
          tempSource,
          [],
          ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
          1843,
          300000,
        ],
      });
      console.info("contract handleCall successs", data);
    } catch (err) {
      console.error("contract handleCall failure", err);
    } finally {
      setIsLoading(false);
    }
    // console.log(contract);
  };
  const [selectedFile, setSelectedFile] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setTempSource(fileContent);
      // executeContract(fileContent); // handleCall the executeContract function with the file content
    };
    reader.readAsText(file);
    // console.log(tempSource);
  };

  useEffect(() => {
    console.log(typeof tempSource); // Print the updated tempSource value
  }, [tempSource]);

  return (
    <main className="container">
      <div className="connect">
        <ConnectWallet
          dropdownPosition={{ side: "bottom", align: "center" }}
          className="connect_button"
        />
      </div>
      <section className="file-input">
        <input type="file" onChange={handleFileChange}/>
        <button
          disabled={isLoading}
          className="file_input_button"
          onClick={handleCall}
        >
          Submit
        </button>
      </section>
    </main>
  );
}
