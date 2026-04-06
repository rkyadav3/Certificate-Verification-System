#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, Env, Address, BytesN, Map, Symbol, symbol_short
};

#[contract]
pub struct CertificateContract;

#[contracttype]
#[derive(Clone)]
pub struct Certificate {
    pub issuer: Address,
    pub is_valid: bool,
}

#[contractimpl]
impl CertificateContract {

    // Issue a certificate (store hash)
    pub fn issue_certificate(
        env: Env,
        issuer: Address,
        cert_hash: BytesN<32>,
    ) {
        issuer.require_auth();

        let key = symbol_short!("CERTS");

        let mut certs: Map<BytesN<32>, Certificate> =
            env.storage().instance().get(&key).unwrap_or(Map::new(&env));

        // Prevent overwrite
        if certs.contains_key(cert_hash.clone()) {
            panic!("Certificate already exists");
        }

        let cert = Certificate {
            issuer: issuer.clone(),
            is_valid: true,
        };

        certs.set(cert_hash, cert);
        env.storage().instance().set(&key, &certs);
    }

    // Verify certificate
    pub fn verify_certificate(
        env: Env,
        cert_hash: BytesN<32>,
    ) -> bool {
        let key = symbol_short!("CERTS");

        let certs: Map<BytesN<32>, Certificate> =
            env.storage().instance().get(&key).unwrap_or(Map::new(&env));

        match certs.get(cert_hash) {
            Some(cert) => cert.is_valid,
            None => false,
        }
    }

    // Revoke certificate
    pub fn revoke_certificate(
        env: Env,
        issuer: Address,
        cert_hash: BytesN<32>,
    ) {
        issuer.require_auth();

        let key = symbol_short!("CERTS");

        let mut certs: Map<BytesN<32>, Certificate> =
            env.storage().instance().get(&key).unwrap_or(Map::new(&env));

        let mut cert = certs.get(cert_hash.clone()).expect("Certificate not found");

        // Only original issuer can revoke
        if cert.issuer != issuer {
            panic!("Unauthorized");
        }

        cert.is_valid = false;
        certs.set(cert_hash, cert);

        env.storage().instance().set(&key, &certs);
    }

    // Get issuer info
    pub fn get_certificate(
        env: Env,
        cert_hash: BytesN<32>,
    ) -> Option<Certificate> {
        let key = symbol_short!("CERTS");

        let certs: Map<BytesN<32>, Certificate> =
            env.storage().instance().get(&key).unwrap_or(Map::new(&env));

        certs.get(cert_hash)
    }
}