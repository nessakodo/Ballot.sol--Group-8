import { ethers } from "hardhat";
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { Ballot__factory } from "../typechain-types";
dotenv.config();
// import express from 'express'  


function convertStringArrayToBytes32(array: string[]) {
  const bytes32Array = [];
  for (let index = 0; index < array.length; index++) {
    bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
  }
  return bytes32Array;
}

async function main() {
  console.log("Deploying Ballot Contract");
  console.log("Proposals: ");
  const proposals = process.argv.slice(2);
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}; ${element}`);
  });
  process.env.MY_PRIVATE_KEY;
  const provider = ethers.getDefaultProvider("goerli", {alchemy: process.env.ALCHEMY_API_KEY});
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
  const signer = wallet.connect(provider);
  console.log(`Connected to the wallet ${signer.address}`);
  const balance = await signer.getBalance();
  console.log(`This address has a balance of ${balance} wei`);
  if (balance.eq(0)) throw new Error("I'm too poor");
  const ballotContractFactory = new Ballot__factory(signer);
  const ballotContract = await ballotContractFactory.deploy(
    convertStringArrayToBytes32(proposals)
  );
  await ballotContract.deployed();
  console.log( `The ballot smart contract was deployed at ${ballotContract.address}`)
}



main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});