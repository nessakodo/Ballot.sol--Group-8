import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

// Contract Address: 0xb4C73d7D395A2c6E6E2c966c8BB7bCd166C9C786

async function main() {
  console.log("Adding new address with voting rights");
  const contractAddress = process.argv[2]
  const targetAddress = process.argv[3];
  const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
  const signer = wallet.connect(provider);
  const ballotContractFactory = new Ballot__factory(signer);
  const ballotContract = await ballotContractFactory.attach(contractAddress)
  const tx = await ballotContract.giveRightToVote(targetAddress);
  await tx.wait();
  console.log(`Transaction Completed: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});