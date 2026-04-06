# 🎓 Stellar Certificate Verification System (Soroban)

## 📌 Project Description

This project is a decentralized certificate verification system built on the Stellar blockchain using Soroban smart contracts.

It allows institutions or authorized issuers to issue digital certificates by storing a cryptographic hash of the certificate on-chain. Anyone can verify the authenticity of a certificate by comparing its hash with the on-chain record.

The system ensures:

* Tamper-proof verification
* Decentralized trust
* Fast and low-cost validation

---

## ⚙️ What It Does

* Stores certificate hashes on-chain
* Allows issuers to register certificates
* Enables public verification of certificates
* Supports certificate revocation
* Ensures only the issuer can revoke their certificates

---

## 🚀 Features

### ✅ Certificate Issuance

* Issuers can upload a certificate hash
* Prevents duplicate certificates

### 🔍 Verification System

* Anyone can verify a certificate using its hash
* Returns validity status instantly

### ❌ Revocation Mechanism

* Issuers can revoke certificates
* Revoked certificates are marked invalid

### 🔐 Secure Authorization

* Uses Stellar wallet signatures (Freighter)
* Only issuer can modify their certificates

### ⚡ Efficient Design

* Stores only hash (not full certificate)
* Low storage cost on blockchain

---

## 🛠️ Tech Stack

* **Blockchain:** Stellar (Soroban Smart Contracts)
* **Language:** Rust
* **Wallet:** Freighter
* **Network:** Stellar Testnet

---

## 🔗 Deployed Smart Contract

> ⚠️ Replace this after deployment

Contract ID:
`YOUR_CONTRACT_ID_HERE`

Network: Stellar Testnet

---

## 🧪 How It Works

1. Generate SHA-256 hash of certificate (PDF/image)
2. Call `issue_certificate` via wallet (Freighter)
3. Store hash on blockchain
4. For verification:

   * Upload certificate
   * Generate hash
   * Compare with blockchain record

---

## 📈 Future Improvements

* Whitelisted issuers (universities only)
* Multi-signature approval system
* Certificate metadata support (name, course, date)
* Frontend dashboard for verification
* IPFS integration for certificate storage

---

## 💡 Use Cases

* University degree verification
* Online course certification
* Government-issued documents
* Professional licenses

---

## 👨‍💻 Author

Ravi Kumar Yadav
B.Tech CSE (AI)
Stellar + AI Developer
