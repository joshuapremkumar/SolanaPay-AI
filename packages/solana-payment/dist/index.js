import { elizaLogger } from "@elizaos/core";
import { Connection, Keypair, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram, sendAndConfirmTransaction, } from "@solana/web3.js";
import bs58 from "bs58";
const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || "https://api.devnet.solana.com";
const PRIVATE_KEY_BASE58 = process.env.SOLANA_PRIVATE_KEY || "";
let senderKeypair = null;
function getKeypair() {
    if (!senderKeypair) {
        if (!PRIVATE_KEY_BASE58) {
            throw new Error("SOLANA_PRIVATE_KEY not set in environment variables");
        }
        const decoded = bs58.decode(PRIVATE_KEY_BASE58);
        senderKeypair = Keypair.fromSecretKey(decoded);
    }
    return senderKeypair;
}
function getConnection() {
    return new Connection(SOLANA_RPC_URL, "confirmed");
}
async function getBalance(publicKey) {
    const connection = getConnection();
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
}
export const transactionLog = [];
const checkBalanceAction = {
    name: "CHECK_BALANCE",
    description: "Check the SOL balance of a wallet address or the sender's wallet",
    similes: ["BALANCE", "CHECK_BALANCE", "GET_BALANCE", "SOL_BALANCE"],
    validate: async (_runtime, message) => {
        const text = (message.content?.text ?? "").toLowerCase();
        return (text.includes("balance") ||
            text.includes("check balance") ||
            text.includes("how much sol"));
    },
    handler: async () => {
        try {
            const keypair = getKeypair();
            const balance = await getBalance(keypair.publicKey);
            const address = keypair.publicKey.toBase58();
            elizaLogger.log(`Balance check for ${address}: ${balance} SOL`);
            return {
                text: `The wallet ${address.slice(0, 8)}...${address.slice(-8)} has a balance of ${balance.toFixed(4)} SOL on ${SOLANA_RPC_URL.includes("devnet") ? "Devnet" : "Mainnet"}.`,
                success: true,
            };
        }
        catch (error) {
            elizaLogger.error("Balance check failed:", error instanceof Error ? error.message : String(error));
            return {
                text: `Failed to check balance: ${error instanceof Error ? error.message : "Unknown error"}`,
                success: false,
            };
        }
    },
    examples: [],
};
const sendSolAction = {
    name: "SEND_SOL",
    description: "Send SOL to a wallet address on devnet. Requires confirmation for security.",
    similes: ["SEND_SOL", "TRANSFER_SOL", "PAY_SOL", "SEND_TOKENS"],
    validate: async (_runtime, message) => {
        const text = (message.content?.text ?? "").toLowerCase();
        return (text.includes("send") &&
            text.includes("sol") &&
            !text.includes("confirm"));
    },
    handler: async (_runtime, message) => {
        try {
            const text = (message.content?.text) ?? "";
            const addressMatch = text.match(/[1-9A-HJ-NP-Za-km-z]{32,44}/);
            const amountMatch = text.match(/(\d+\.?\d*)\s*sol/i);
            if (!addressMatch) {
                return {
                    text: "Please provide a valid Solana wallet address to send to. Example: 'Send 1 SOL to 7xKXJG2NWjdn5x2VvSSMLsQMKASJBXkPJvfk1kTLGWy'",
                    success: false,
                };
            }
            if (!amountMatch) {
                return {
                    text: "Please specify the amount of SOL to send. Example: 'Send 1 SOL to 7xKXJG2NWjdn5x2VvSSMLsQMKASJBXkPJvfk1kTLGWy'",
                    success: false,
                };
            }
            const toAddress = addressMatch[0];
            const amount = parseFloat(amountMatch[1]);
            if (amount <= 0) {
                return {
                    text: "Amount must be greater than 0.",
                    success: false,
                };
            }
            elizaLogger.log(`Send request: ${amount} SOL to ${toAddress}`);
            return {
                text: `Confirmation Required\n\nI need your explicit confirmation before sending:\n\nAmount: ${amount} SOL\nTo: ${toAddress.slice(0, 8)}...${toAddress.slice(-8)}\nNetwork: Devnet\n\nReply with "CONFIRM SEND ${amount} SOL TO ${toAddress}" to proceed.`,
                success: true,
                requiresConfirmation: true,
            };
        }
        catch (error) {
            elizaLogger.error("Send SOL validation failed:", error instanceof Error ? error.message : String(error));
            return {
                text: `Failed to prepare transaction: ${error instanceof Error ? error.message : "Unknown error"}`,
                success: false,
            };
        }
    },
    examples: [],
};
const confirmSendAction = {
    name: "CONFIRM_SEND",
    description: "Confirm and execute a SOL transfer after user confirmation",
    similes: ["CONFIRM", "EXECUTE", "CONFIRM_SEND"],
    validate: async (_runtime, message) => {
        const text = (message.content?.text ?? "").toUpperCase();
        return text.includes("CONFIRM") && text.includes("SEND");
    },
    handler: async (_runtime, message) => {
        try {
            const text = (message.content?.text) ?? "";
            const addressMatch = text.match(/[1-9A-HJ-NP-Za-km-z]{32,44}/);
            const amountMatch = text.match(/(\d+\.?\d*)\s*sol/i);
            if (!addressMatch || !amountMatch) {
                return {
                    text: "Invalid confirmation format. Please use: CONFIRM SEND <amount> SOL TO <address>",
                    success: false,
                };
            }
            const toAddress = addressMatch[0];
            const amount = parseFloat(amountMatch[1]);
            const keypair = getKeypair();
            const connection = getConnection();
            elizaLogger.log(`Executing: ${amount} SOL to ${toAddress}`);
            const transaction = new Transaction().add(SystemProgram.transfer({
                fromPubkey: keypair.publicKey,
                toPubkey: new PublicKey(toAddress),
                lamports: Math.floor(amount * LAMPORTS_PER_SOL),
            }));
            const signature = await sendAndConfirmTransaction(connection, transaction, [keypair]);
            const logEntry = {
                timestamp: new Date(),
                type: "SOL_TRANSFER",
                from: keypair.publicKey.toBase58(),
                to: toAddress,
                amount,
                signature,
                status: "SUCCESS",
            };
            transactionLog.push(logEntry);
            elizaLogger.log(`Transaction successful: ${signature}`);
            return {
                text: `Transaction Successful!\n\nAmount: ${amount} SOL\nTo: ${toAddress.slice(0, 8)}...${toAddress.slice(-8)}\nSignature: ${signature}\nNetwork: Devnet\n\nView on Explorer: https://explorer.solana.com/tx/${signature}?cluster=devnet`,
                success: true,
                signature,
            };
        }
        catch (error) {
            elizaLogger.error("Transaction failed:", error instanceof Error ? error.message : String(error));
            return {
                text: `Transaction Failed\n\n${error instanceof Error ? error.message : "Unknown error"}\n\nPlease check your balance and try again.`,
                success: false,
            };
        }
    },
    examples: [],
};
const getTransactionHistoryAction = {
    name: "GET_TRANSACTION_HISTORY",
    description: "Get the history of transactions made during this session",
    similes: ["HISTORY", "TRANSACTIONS", "LOGS", "TX_HISTORY"],
    validate: async (_runtime, message) => {
        const text = (message.content?.text ?? "").toLowerCase();
        return (text.includes("transaction") ||
            text.includes("history") ||
            text.includes("logs") ||
            text.includes("past transfers"));
    },
    handler: async () => {
        if (transactionLog.length === 0) {
            return {
                text: "No transactions have been made during this session.",
                success: true,
            };
        }
        const history = transactionLog
            .map((tx, i) => `${i + 1}. ${tx.amount} SOL -> ${tx.to.slice(0, 8)}...\n   Status: ${tx.status}\n   Sig: ${tx.signature.slice(0, 16)}...\n   Time: ${tx.timestamp.toISOString()}`)
            .join("\n\n");
        return {
            text: `Transaction History (${transactionLog.length} transactions)\n\n${history}`,
            success: true,
        };
    },
    examples: [],
};
export const solanaPaymentPlugin = {
    name: "solana-payment",
    description: "Solana payment agent - check balance, send SOL on devnet, log transactions",
    actions: [checkBalanceAction, sendSolAction, confirmSendAction, getTransactionHistoryAction],
    providers: [],
    evaluators: [],
};
export default solanaPaymentPlugin;
