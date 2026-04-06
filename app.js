import {
  getUserInfo,
  signTransaction
} from "@stellar/freighter-api";

let userAddress = null;

// 🔗 Connect Wallet
async function connectWallet() {
    try {
        const user = await getUserInfo();
        userAddress = user.publicKey;
        document.getElementById("wallet").innerText = userAddress;
    } catch (e) {
        alert("Freighter not connected");
    }
}

// 📌 Issue Certificate
async function issueCert() {
    const hash = document.getElementById("certHash").value;

    console.log("Issuing cert:", hash);

    // TODO: Build and sign Soroban transaction here
    alert("Transaction logic needs Soroban RPC integration");
}

// 🔍 Verify Certificate
async function verifyCert() {
    const hash = document.getElementById("verifyHash").value;

    console.log("Verifying cert:", hash);

    // TODO: Call contract view function
    document.getElementById("result").innerText = "Verification pending...";
}
