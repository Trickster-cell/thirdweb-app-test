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

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const { contract } = useContract(
    "0x553BC16Eb052b2297c64bef79423008D280b9768"
  );

  const { mutateAsync: executeRequest, isLoading2 } = useContractWrite(
    contract,
    "executeRequest"
  );

  const { data: latestResponse, isLoading: isLatestResponseLoading } =
    useContractRead(contract, "latestResponse");

  const [tempSource, setTempSource] = useState({});
  const [selectedFile, setSelectedFile] = useState("");

  const handleCall = async () => {
    try {
      setIsLoading(true);
      const data = await executeRequest({
        args: [
          tempSource,
          [],
          tempArr,
          1843,
          300000,
        ],
      });
      console.info("contract handleCall success", data);
    } catch (err) {
      console.error("contract handleCall failure", err);
    } finally {
      setIsLoading(false);
    }
  };

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
  // Rest of the code...
  const [tempArr, setTempArr] = useState([""]);
  const handleInputChange = (index, event) => {
    const newValue = event.target.value;
    const newArr = [...tempArr];
    newArr[index] = newValue;
    setTempArr(newArr);
  };

  const handleAddInput = () => {
    setTempArr([...tempArr, ""]);
  };

  return (
    <main className="container">
      <div className="connect">
        <ConnectWallet
          dropdownPosition={{ side: "bottom", align: "center" }}
          className="connect_button"
        />
      </div>
      <section className="file-input">
        <input type="file" onChange={handleFileChange} />
        <button
          disabled={isLoading}
          className="file_input_button"
          onClick={handleCall}
        >
          Submit
        </button>
      </section>

      {isLatestResponseLoading ? (
        <p>Loading latest response...</p>
      ) : (
        <p>Latest Response: {parseInt(latestResponse, 16)}</p>
      )}

      <section className="input-section">
        {tempArr.map((value, index) => (
          <input
            key={index}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(index, e)}
            placeholder="Enter input"
          />
        ))}
        <button className="input-section-button" onClick={handleAddInput}>Add More</button>
      </section>
    </main>
  );
}
