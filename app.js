import {
  getUserInfo,
  signTransaction
} from "@stellar/freighter-api";

import {
  SorobanRpc,
  TransactionBuilder,
  Networks,
  BASE_FEE,
  xdr
} from "@stellar/stellar-sdk";

// 🔧 CONFIG
const CONTRACT_ID = "CBWX4MINLHS743UIHAZC2MYBFO3UIXEEYCIFRYNJJMC6YWYG2QA3PFV6";
const RPC_URL = "https://soroban-testnet.stellar.org";
const server = new SorobanRpc.Server(RPC_URL);

let userAddress = null;

// 🔗 Connect Wallet
async function connectWallet() {
  try {
    const user = await getUserInfo();
    userAddress = user.publicKey;

    document.getElementById("wallet").innerText = userAddress;
    console.log("Connected:", userAddress);
  } catch (e) {
    console.error(e);
    alert("Freighter connection failed");
  }
}

// 🔍 VERIFY CERTIFICATE (READ ONLY)
async function verifyCert() {
  const hash = document.getElementById("verifyHash").value;

  try {
    const account = await server.getAccount(userAddress);

    const tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        xdr.Operation.invokeHostFunction({
          func: xdr.HostFunction.hostFunctionTypeInvokeContract(),
        })
      )
      .setTimeout(30)
      .build();

    const simulated = await server.simulateTransaction(tx);

    console.log("Simulation:", simulated);

    document.getElementById("result").innerText =
      "Check console (verify logic connected)";
  } catch (e) {
    console.error(e);
    alert("Verification failed");
  }
}

// 📌 ISSUE CERTIFICATE (WRITE)
async function issueCert() {
  const hash = document.getElementById("certHash").value;

  try {
    const account = await server.getAccount(userAddress);

    let tx = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        xdr.Operation.invokeHostFunction({
          func: xdr.HostFunction.hostFunctionTypeInvokeContract(),
        })
      )
      .setTimeout(30)
      .build();

    // 🧠 Simulate first (required in Soroban)
    const sim = await server.simulateTransaction(tx);

    if (sim.error) {
      console.error(sim);
      alert("Simulation failed");
      return;
    }

    // 🖊️ Sign with Freighter
    const signedTx = await signTransaction(tx.toXDR(), {
      networkPassphrase: Networks.TESTNET,
    });

    // 🚀 Send transaction
    const send = await server.sendTransaction(
      TransactionBuilder.fromXDR(signedTx, Networks.TESTNET)
    );

    console.log("Transaction sent:", send);

    document.getElementById("result").innerText =
      "Certificate issued (check console)";
  } catch (e) {
    console.error(e);
    alert("Issue failed");
  }
}

// 🌍 Attach to window (for HTML buttons)
window.connectWallet = connectWallet;
window.issueCert = issueCert;
window.verifyCert = verifyCert;
