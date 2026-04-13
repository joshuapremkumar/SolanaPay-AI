# SolanaPayAgent

A personal AI agent built with ElizaOS that can send and receive SOL on Solana devnet. This agent provides a conversational interface for managing Solana payments with built-in security confirmations.

![Solana](https://img.shields.io/badge/Solana-Devnet-9945FF?style=for-the-badge&logo=solana)
![ElizaOS](https://img.shields.io/badge/ElizaOS-v2-FF6B35?style=for-the-badge&logo=robot)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## Features

- **Check Balance** - View your SOL balance on Solana devnet
- **Send SOL** - Transfer SOL to any wallet address with confirmation
- **Transaction History** - Track all transactions made during the session
- **Conversational Interface** - Natural language interaction via ElizaOS
- **Security First** - Requires explicit confirmation before sending funds

## Prerequisites

- Node.js 23+
- [Bun](https://bun.sh) runtime
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) (for airdrops)
- A Solana wallet with SOL on devnet

## Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/joshuapremkumar/agent-challenge.git
cd agent-challenge
bun install
```

### 2. Configure Environment

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

Edit `.env` with your settings:

```env
# Ollama endpoint (Nosana devnet)
OLLAMA_API_ENDPOINT=https://your-ollama-endpoint
OLLAMA_MODEL=qwen3.5:9b
OLLAMA_SMALL_MODEL=qwen3.5:9b
OLLAMA_LARGE_MODEL=qwen3.5:9b

# Solana Configuration
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_PRIVATE_KEY=your_base58_private_key
```

### 3. Get Devnet SOL

```bash
# Generate a keypair if you don't have one
solana-keygen new -o keypair.json

# Get devnet SOL airdrop
solana airdrop 2
```

### 4. Run the Agent

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) to interact with your agent.

## Usage

### Check Balance

```
You: Check my SOL balance
Agent: The wallet 7xKXJG2... has a balance of 2.0000 SOL on Devnet.
```

### Send SOL

```
You: Send 0.5 SOL to 7xKXJG2NWjdn5x2VvSSMLsQMKASJBXkPJvfk1kTLGWy
Agent: ⚠️ Confirmation Required

I need your explicit confirmation before sending:

Amount: 0.5 SOL
To: 7xKXJG2...PJvfk
Network: Devnet

Reply with "CONFIRM SEND 0.5 SOL TO 7xKXJG2NWjdn5x2VvSSMLsQMKASJBXkPJvfk1kTLGWy" to proceed.
```

### Confirm Transaction

```
You: CONFIRM SEND 0.5 SOL TO 7xKXJG2NWjdn5x2VvSSMLsQMKASJBXkPJVFk
Agent: ✅ Transaction Successful!

Amount: 0.5 SOL
To: 7xKXJG2...PJvfk
Signature: 3Mx2fD...8z9v
Network: Devnet

View on Explorer: https://explorer.solana.com/tx/3Mx2fD...8z9v?cluster=devnet
```

### View Transaction History

```
You: Show my transaction history
Agent: 📜 Transaction History (1 transactions)

1. 0.5 SOL -> 7xKXJG2...
   Status: SUCCESS
   Sig: 3Mx2fD...8z9v
   Time: 2026-04-14T12:00:00.000Z
```

## Project Structure

```
├── characters/
│   └── agent.character.json    # Agent personality & configuration
├── packages/
│   └── solana-payment/        # Solana payment plugin
│       ├── src/
│       │   └── index.ts       # Plugin source code
│       ├── package.json
│       └── tsconfig.json
├── src/
│   └── index.ts               # Custom plugin entry point
├── .env                       # Environment variables
├── package.json
└── Dockerfile                 # For Nosana deployment
```

## Deploy to Nosana

This agent is designed to run on the Nosana decentralized GPU network.

### 1. Build Docker Image

```bash
docker build -t yourusername/solanapay-agent:latest .
docker push yourusername/solanapay-agent:latest
```

### 2. Configure Job Definition

Edit `nos_job_def/nosana_eliza_job_definition.json`:

```json
{
  "version": "0.1",
  "type": "container",
  "ops": [
    {
      "type": "container/run",
      "args": {
        "image": "yourusername/solanapay-agent:latest",
        "ports": ["3000:3000"],
        "env": {
          "OLLAMA_API_ENDPOINT": "https://your-endpoint",
          "OLLAMA_MODEL": "qwen3.5:9b",
          "SOLANA_RPC_URL": "https://api.devnet.solana.com",
          "SOLANA_PRIVATE_KEY": "${SOLANA_PRIVATE_KEY}"
        }
      }
    }
  ]
}
```

### 3. Deploy

Visit [Nosana Dashboard](https://dashboard.nosana.com) and deploy your job.

## Troubleshooting

### "Embedding error" warnings

The embedding service may fail if your Ollama endpoint doesn't support embeddings. This doesn't prevent the agent from generating text responses.

### Agent not responding

1. Check that your Ollama endpoint is accessible
2. Verify your `OLLAMA_MODEL` is available on the endpoint
3. Ensure your Solana private key is valid

### Transaction failed

1. Verify you have sufficient SOL balance
2. Check the devnet RPC URL is correct
3. Ensure the destination address is valid

## Technology Stack

- **ElizaOS** - AI agent framework
- **Solana Web3.js** - Blockchain interaction
- **Ollama** - LLM inference (Qwen3.5 via Nosana)
- **Nosana** - Decentralized compute network

## License

MIT License - See [LICENSE](LICENSE) for details.

## Contributing

Contributions welcome! Feel free to submit issues and pull requests.

---

**Built with ❤️ using ElizaOS and Solana**
