# 🚀 SolanaPay AI Agent

<div align="center">

<h3>🤖 Your Personal Solana Payment Assistant 🤖</h3>

<p align="center">
  <img src="https://img.shields.io/badge/Solana-Devnet-9945FF?style=for-the-badge&logo=solana" alt="Solana">
  <img src="https://img.shields.io/badge/ElizaOS-v2.0-FF6B35?style=for-the-badge&logo=robot" alt="ElizaOS">
  <img src="https://img.shields.io/badge/LLM-Qwen3.5-9B-00D9FF?style=for-the-badge" alt="Qwen">
  <img src="https://img.shields.io/badge/Platform-Nosana-00FF88?style=for-the-badge" alt="Nosana">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=for-the-badge" alt="License">
</p>

> ⚠️ **This agent runs on Solana DEVNET only. No real funds are used.**

</div>

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 💰 **Check Balance** | View your SOL balance instantly |
| 📤 **Send SOL** | Transfer SOL with secure confirmations |
| 📜 **Transaction History** | Track all your session transactions |
| 🔒 **Security First** | Explicit confirmation before any transaction |
| 💬 **Natural Language** | Chat with your agent naturally |

</div>

---

## 🏗️ Tech Stack

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                      SolanaPay AI Agent                       │
├─────────────────────────────────────────────────────────────┤
│  ElizaOS v2          │  Solana Web3.js    │  Ollama (Qwen)  │
│  ┌─────────────────┐ │  ┌──────────────┐ │  ┌────────────┐ │
│  │  AI Framework   │ │  │ Blockchain   │ │  │ LLM Model  │ │
│  │  & Plugins     │ │  │ Integration │ │  │ Inference  │ │
│  └─────────────────┘ │  └──────────────┘ │  └────────────┘ │
│         ▲                    ▲                   │             │
│         │                    │                   │             │
│         └──────────────────┴───────────────────┘             │
│                          │                                  │
│                    Solana Devnet                            │
└─────────────────────────────────────────────────────────────┘
```

| Technology | Purpose |
|------------|---------|
| **ElizaOS** | AI agent framework with plugin system |
| **Solana Web3.js** | Blockchain interaction |
| **Qwen3.5-9B** | Language model via Ollama |
| **Nosana** | Decentralized GPU compute |

</div>

---

## 🚀 Quick Start

### Prerequisites

- **Bun** runtime ([Install](https://bun.sh))
- **Solana CLI** ([Install](https://docs.solana.com/cli/install-solana-cli-tools))
- **Solana wallet** with devnet SOL

### Installation

```bash
# Clone the repository
git clone https://github.com/joshuapremkumar/SolanaPay-AI.git
cd SolanaPay-AI

# Install dependencies
bun install
```

### Configuration

Create your `.env` file:

```bash
cp .env.example .env
```

Edit `.env`:

```env
# ============================================
# 🤖 LLM Configuration (Ollama)
# ============================================
OLLAMA_API_ENDPOINT=https://your-ollama-endpoint
OLLAMA_MODEL=qwen3.5:9b
OLLAMA_SMALL_MODEL=qwen3.5:9b
OLLAMA_LARGE_MODEL=qwen3.5:9b

# ============================================
# 💰 Solana Configuration
# ============================================
SOLANA_RPC_URL=https://api.devnet.solana.com
SOLANA_PRIVATE_KEY=your_base58_private_key

# ============================================
# 🌐 Server Configuration
# ============================================
SERVER_PORT=3000
```

### Get Devnet SOL

```bash
# Generate a new keypair (optional)
solana-keygen new -o keypair.json

# Get airdrop for testing
solana airdrop 2

# Verify your balance
solana balance
```

### Run the Agent

```bash
bun run dev
```

🎉 **Open [http://localhost:3000](http://localhost:3000) in your browser!**

---

## 📖 Usage Examples

### 💰 Check Your Balance

```
👤 You: Check my SOL balance

🤖 Agent: The wallet 7xKXJG2...8VkY has a balance of 2.0000 SOL on Devnet.
```

### 📤 Send SOL

```
👤 You: Send 0.5 SOL to 7xKXJG2NWjdn5x2VvSSMLsQMKASJBXkPJvfk1kTLGWy

🤖 Agent: ⚠️ Confirmation Required

I need your explicit confirmation before sending:

💸 Amount: 0.5 SOL
📬 To: 7xKXJG2...PJvfk
🌐 Network: Devnet

Reply with "CONFIRM SEND 0.5 SOL TO [address]" to proceed.
```

### ✅ Confirm Transaction

```
👤 You: CONFIRM SEND 0.5 SOL TO 7xKXJG2NWjdn5x2VvSSMLsQMKASJBXkPJvfk1kTLGWy

🤖 Agent: ✅ Transaction Successful!

💸 Amount: 0.5 SOL
📬 To: 7xKXJG2...PJvfk
🔗 Signature: 3Mx2fDhGv8z9vLkQpRsTjNwXy4Zm7EhKcL9Bn6VcU

🌐 View on Explorer: https://explorer.solana.com/tx/3Mx2fDhGv8z9v...devnet
```

### 📜 View Transaction History

```
👤 You: Show my transaction history

🤖 Agent: 📜 Transaction History (1 transaction)

1️⃣  0.5 SOL → 7xKXJG2...
    ✅ Status: SUCCESS
    🔗 Sig: 3Mx2fDh...VcU
    ⏰ Time: 2026-04-14T12:00:00.000Z
```

---

## 🏛️ Project Structure

```
SolanaPay-AI/
├── 📁 characters/
│   └── agent.character.json      # 🤖 Agent personality config
├── 📁 packages/
│   └── solana-payment/         # 💰 Solana payment plugin
│       └── src/
│           └── index.ts         # 🔧 Plugin implementation
├── 📁 src/
│   └── index.ts                # 🚪 Entry point
├── 📄 .env                      # ⚙️ Environment variables
├── 📄 .env.example              # 📝 Example config
├── 📄 package.json              # 📦 Dependencies
├── 📄 Dockerfile                # 🐳 For Nosana deployment
└── 📄 README.md                # 📖 Documentation
```

---

## 🚢 Deploy to Nosana

This agent is designed for the [Nosana](https://nosana.com) decentralized compute network.

### Step 1: Build Docker Image

```bash
# Build your image
docker build -t yourusername/solanapay-ai:latest .

# Login to Docker Hub
docker login

# Push to registry
docker push yourusername/solanapay-ai:latest
```

### Step 2: Configure Job Definition

Edit `nosana_job_definition.json`:

```json
{
  "version": "0.1",
  "type": "container",
  "meta": {
    "trigger": "cli"
  },
  "ops": [
    {
      "type": "container/run",
      "id": "solanapay-agent",
      "args": {
        "image": "yourusername/solanapay-ai:latest",
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

### Step 3: Deploy

1. Visit [Nosana Dashboard](https://dashboard.nosana.com)
2. Connect your Solana wallet
3. Upload your job definition
4. Deploy and get your public URL!

---

## 🎨 Screenshots

<div align="center">

```
┌─────────────────────────────────────────────────────────────┐
│                    💬 Chat Interface                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  🤖 SolanaPay Agent                          [Settings]      │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│                    💬 Message Thread                          │
│                                                              │
│  👤 User                    🤖 Agent                        │
│  ┌─────────────────────┐    ┌─────────────────────────┐    │
│  │ Check my balance    │    │ 💰 Your wallet has       │    │
│  │                     │    │    2.0000 SOL           │    │
│  └─────────────────────┘    │    on Devnet            │    │
│                             └─────────────────────────┘    │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Type a message...                          [Send]  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

</div>

---

## 🔧 Troubleshooting

### ❌ "Embedding Error" Warning

This is normal if your Ollama endpoint doesn't support embeddings. The agent will still generate text responses.

### ❌ Agent Not Responding

1. Check your Ollama endpoint is accessible
2. Verify `OLLAMA_MODEL` is available
3. Ensure Solana private key is valid

### ❌ Transaction Failed

1. Verify sufficient SOL balance
2. Check devnet RPC URL
3. Validate destination address

---

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [ElizaOS](https://elizaos.com) - Amazing AI agent framework
- [Solana](https://solana.com) - Fast blockchain
- [Nosana](https://nosana.com) - Decentralized compute
- [Qwen](https://huggingface.co/Qwen) - Powerful open LLM

---

<div align="center">

**Built with ❤️ using ElizaOS, Solana, and Nosana**

⭐ Star this repo if you found it useful!

</div>
