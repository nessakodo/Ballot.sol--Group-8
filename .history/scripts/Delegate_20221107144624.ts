import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

// Contract Address: 0xb4C73d7D395A2c6E6E2c966c8BB7bCd166C9C786

async function main() {
  const contractAddress = process.argv[2]
  const targetAddress = process.argv[3];
  console.log(`Delegating vote to address: ${targetAddress}`);
  const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
  // Grabs the second address from Mnemonic
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "", "m/44'/60'/0'/0/1");
  const signer = wallet.connect(provider);
  // Gets Ballot contract
  const ballotContractFactory = new Ballot__factory(signer);
  const ballotContract = await ballotContractFactory.attach(contractAddress)
  // Delegates to target address
  const tx = await ballotContract.delegate(targetAddress);
  await tx.wait();
  console.log(`Transaction Completed: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});