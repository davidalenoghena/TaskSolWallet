import { Connection, Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import wallet from '../dev-wallet.json';

async function getWalletBalance(): Promise<number> {
    try {
        // Create a connection to Solana's devnet
        const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
        
        // Create keypair from wallet
        const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));
        
        // Get the public key
        const publicKey = keypair.publicKey;
        
        // Fetch the balance
        const balance = await connection.getBalance(publicKey);
        
        // Convert lamports to SOL
        const solBalance = balance / LAMPORTS_PER_SOL;
        
        return solBalance;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to fetch balance: ${error.message}`);
        }
        throw new Error('An unknown error occurred');
    }
}

// Example usage
async function main() {
    try {
        const balance = await getWalletBalance();
        //const publicKey = keypair.publicKey.toBase58();
        //console.log(`Public Key: ${keypair.publicKey.toBase58()}`);
        console.log(`Wallet balance: ${balance} SOL`);
    } catch (error) {
        console.error(error);
    }
}

main();

//Wallet balance: 2 SOL