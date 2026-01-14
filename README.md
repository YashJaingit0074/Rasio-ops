
# RasoiOps: AI-Driven Inventory & Sustainability Engine

**RasoiOps** is an end-to-end sustainability platform designed for smart households and small-scale restaurants. It leverages Computer Vision and Retrieval-Augmented Generation (RAG) to digitize food inventory and minimize wastage.

---

## 🛠️ Technical Stack
- **Frontend:** React 18, TypeScript, Tailwind CSS
- **AI Engine:** Gemini 3-Flash (Vision & LLM Inference)
- **Data Visualization:** Recharts
- **Architecture:** Native ESM (No-Build Pipeline)

## 📐 Architectural Note: Free Tier vs. Production
As this is a professional prototype using the **Gemini Free Tier**, specific architectural patterns were implemented:
1. **Exponential Backoff:** Custom retry mechanism for `429 Too Many Requests`.
2. **Context Compression:** RAG optimization for TPM (Tokens Per Minute) efficiency.

---

## 🚀 Deployment (Vercel Friendly)
This project is optimized for Vercel. 

### One-Click Setup:
1. Push this code to a GitHub Repository.
2. Import the project into **Vercel**.
3. **Environment Variables:** In the Vercel dashboard, go to Settings > Environment Variables and add:
   - `API_KEY`: *Your Gemini API Key from Google AI Studio*.
4. Click **Deploy**.

---

## 📐 Key Modules
### 1. Vision-to-Inventory
Automates inventory logging using multi-modal LLMs. Processes images of groceries or receipts to extract structured data.

### 2. RAG-Based Recipe Planner
Suggests meal plans strictly based on available on-hand inventory. Uses current inventory as the "Knowledge Base" for retrieval.

### 3. Sustainability Dashboard
Visualizes CO2 offset, financial savings, and waste reduction trends using Recharts.
