# <div align="center">TRINETRA AI</div>

<div align="center">
  <img src="./public/favicon.svg" alt="TrinetraAI Logo" width="120" />
</div>

<h3 align="center">Real-Time Underwriting Intelligence & Fraud Detection Platform</h3>

---

## 🌟 Overview

**TRINETRA AI** is an AI-powered underwriting intelligence platform designed to help banks and financial institutions detect fraud, document tampering, financial inconsistencies, and synthetic identities in real time.

Traditional verification systems focus on validating documents individually. TRINETRA AI introduces a next-generation approach by analyzing the entire financial identity ecosystem of an applicant through:

- Cross-document intelligence
- Behavioral anomaly detection
- AI forensic analysis
- Relationship graph intelligence
- Explainable underwriting AI
- Real-time monitoring

The platform transforms underwriting from a manual verification process into an intelligent investigation workflow.

---

## 🚩 Problem Statement

Modern financial institutions face increasing threats from:
- AI-generated fake documents & forged salary slips
- Manipulated bank statements & tampered land records
- Synthetic identities & fake collateral documentation
- Financial timeline inconsistencies & Organized fraud networks

Current verification systems are manual, slow, fragmented, difficult to scale, and reactive instead of proactive. 

**Banks need intelligent fraud detection, explainable AI, real-time anomaly detection, cross-document verification, and faster underwriting decisions.** 

TRINETRA AI solves these challenges.

---

## 💡 Key Innovation

Unlike traditional systems that only check whether a document is fake, TRINETRA AI asks:

> **“Does the entire financial story make logical sense?”**

The system reasons across salary slips, bank statements, GST records, land records, identity documents, behavioral patterns, metadata, and timelines to detect inconsistencies and fraud signals.

---

## 🛠️ Core Features

### 1. Document Forensics Engine
Advanced forensic analysis system for detecting document manipulation.
- OCR extraction & Metadata inspection
- PDF tampering & compression artifact analysis
- Signature & Font inconsistency detection
- AI-generated document fingerprinting

### 2. Cross-Document Contradiction Engine
The core intelligence layer of the platform detects income inconsistencies, timeline anomalies, ownership mismatches, and impossible transaction patterns.
- *Example:* Declared Salary: ₹1,20,000/month | Detected Bank Inflow: ₹38,000 average ➡️ **Cross-document financial inconsistency detected.**

### 3. AI Investigator
An explainable AI co-pilot for analysts. Instead of only generating fraud scores, the AI explains why a case was flagged, provides supporting evidence, and recommends actions.
- *Example Output:* “Salary growth increased by 240% within 2 months without matching GST turnover or bank inflow patterns.”

### 4. Fraud Knowledge Graph
Interactive graph intelligence engine that maps relationships between applicants, accounts, employers, phone numbers, IP addresses, and properties to detect fraud rings and hidden relationships.

### 5. Real-Time Monitoring Center
Live fraud intelligence dashboard featuring an anomaly stream, fraud heatmaps, active investigations, and a live AI risk pulse.

### 6. Explainable Risk Scoring
Transparent AI risk analysis detailing fraud probability, anomaly severity, evidence references, and confidence indicators.

### 7. Compliance Intelligence
Regulatory support system including RBI compliance checks, AML risk indicators, missing KYC detection, and underwriting policy verification.

---

## 🏗️ System Architecture

```text
                    ┌────────────────────┐
                    │ Document Uploads   │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ OCR & Extraction   │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ Forensics Engine   │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ Contradiction AI   │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ Risk Intelligence  │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ AI Investigator    │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ Analyst Dashboard  │
                    └────────────────────┘
```

---

## 💻 Tech Stack

### Frontend
- React.js, Vite, Tailwind CSS
- Framer Motion, Recharts, React Flow
- TypeScript

### Backend
- FastAPI, Node.js, Express.js

### AI / ML
- Python, PyTorch, Scikit-learn
- Isolation Forest, Autoencoders, Sentence Transformers, LayoutLMv3

### OCR & Forensics
- PaddleOCR, OpenCV, Tesseract OCR, PDF metadata analysis

### Database
- PostgreSQL, MongoDB, Neo4j (Fraud Graph)

### AI Agent Framework
- LangChain, CrewAI, OpenAI API / Gemini API

---

## 🎨 UI/UX Philosophy

The platform is designed as an **“AI Investigation Workspace”** instead of a traditional dashboard.

**Design Goals:** Trustworthy, Explainable, Minimal, Human-centric, Enterprise-ready, and Investigation-focused.

### Major Modules
1. **Intelligence Hub:** Mission control dashboard with live fraud pulse.
2. **Investigation Workspace:** Interactive forensic analysis environment.
3. **Contradiction Engine:** Cross-document financial consistency analysis.
4. **Fraud Graph Explorer:** Relationship intelligence visualization.
5. **Monitoring Center:** Real-time fraud monitoring.
6. **AI Investigator:** Human + AI collaborative investigation.
7. **Reporting Center:** Executive-level underwriting reports.

---

## 🔄 Workflow

1. **Upload**: User uploads salary slips, bank statements, land records, identity docs.
2. **Extract**: OCR and metadata extraction begin automatically.
3. **Analyze**: Forensic AI analyzes tampering, edits, metadata inconsistencies.
4. **Cross-Reference**: Cross-document intelligence compares financial claims and timelines.
5. **Score**: Anomaly detection models generate fraud scores and alerts.
6. **Explain**: AI Investigator explains findings with supporting evidence.
7. **Report**: Analysts review cases and generate reports.

---

## 🎯 Real-World Use Cases

- **Loan Underwriting**: Detect forged income and collateral documents.
- **Land Verification**: Identify manipulated ownership records.
- **KYC Validation**: Detect synthetic identities and fake submissions.
- **SME Lending**: Verify GST and business legitimacy.
- **Insurance Fraud**: Analyze claim inconsistencies and forged evidence.

---

## ⚡ Why TRINETRA AI Is Different

| Traditional Systems | TRINETRA AI |
| :--- | :--- |
| Static verification | Intelligent reasoning |
| Single document checks | Cross-document intelligence |
| Black-box AI | Explainable AI |
| Manual review | AI-assisted investigations |
| Reactive fraud detection | Real-time anomaly detection |
| Isolated analysis | Relationship intelligence |

---

## 📈 Scalability & Future Scope

The architecture is designed for microservices, distributed AI pipelines, and enterprise deployment. Potential integrations include DigiLocker, CKYC, GST APIs, and Core banking systems.

**Future Scope:**
- Deepfake KYC video detection
- Federated fraud intelligence
- Adaptive fraud learning
- Blockchain-backed audit trails

---

## 🔒 Security & Privacy

TRINETRA AI prioritizes encrypted document handling, secure AI processing, privacy-preserving analytics, role-based access control, and audit logging.

---

## 💻 Getting Started (Local Development)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Raja-89/TrinetraAI.git
   ```
2. Navigate to the project directory:
   ```bash
   cd TrinetraAI
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🏆 Project Status & Contributors

**Built for the SuRaksha Hackathon under the theme:**
### Real-Time Anomaly Detection

**Focused on:**
- Banking security
- Intelligent underwriting
- Explainable AI
- Fraud prevention
- Financial trust systems

*Current Development Stage:* UI/UX Design, AI Architecture Planning, Fraud Intelligence Engine Development, and Investigation Workflow Prototyping.

> **Team Vision:** We envision a future where AI assists analysts instead of replacing them, underwriting becomes intelligent and explainable, and financial trust becomes scalable. TRINETRA AI is built to become the next-generation intelligence layer for digital banking systems.