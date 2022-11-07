import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

// Contract Address: 0xb4C73d7D395A2c6E6E2c966c8BB7bCd166C9C786

async function main() {
  const contractAddress = process.argv[2]
  console.log("And the winner is...");
  const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
  // Grab first wallet
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
  const signer = wallet.connect(provider);
  // Gets Ballot contract
  const ballotContractFactory = new Ballot__factory(signer);
  const ballotContract = await ballotContractFactory.attach(contractAddress)
  // Get the winning proposal name
  const winner = await ballotContract.winnerName();
  console.log(ethers.utils.parseBytes32String(winner));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});