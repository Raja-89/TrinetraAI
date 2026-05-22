# TrinetraAI - Live Fraud Intelligence System

TrinetraAI is an advanced web application prototype demonstrating a conceptual AI-powered document forensics and underwriting intelligence system. It is designed to detect fraud, forged documents, and financial contradictions in real time.

## 🚀 Features

- **Landing Page**: A beautiful, modern marketing page with a responsive hero section and 3D floating cards showing risk assessment mockups.
- **Interactive "How It Works" Demo**: A full 4-stage pipeline visualization (Ingest, Analyze, Cross-Reference, Report) explaining the AI fraud detection process.
- **Dynamic Theming**: Custom-built context for switching seamlessly between a sleek Dark Mode (default) and a crisp Light Mode, avoiding hardcoded colors.
- **Global Workspace Navigation**: A robust internal dashboard layout featuring sidebar navigation, active case monitoring, and a highly detailed user profile modal.
- **Evidence Locker & Document Forensics**: An immersive workspace view designed for fraud investigators. It features:
  - An **Evidence Locker** sidebar with status tags, anomaly counts, document types, and upload dates.
  - A dynamic **Center Panel** providing deep dives into OCR extraction confidence, detailed Metadata timeline anomalies, and interactive Pixel-Level Forgery Heatmaps.
  - **Reasoning Cards** in the right panel offering AI-driven explanations for flagged risks and confidence scoring.
- **Interactive Document Upload**: A stylized drop-zone modal simulating document processing, metadata extraction, and automatic routing to the forensics dashboard.

## 💻 Tech Stack

- **React (Vite)**: Fast frontend tooling and component-based architecture.
- **React Router DOM**: Client-side routing between the marketing pages and internal workspace.
- **Framer Motion**: Used extensively for micro-interactions, page transitions, interactive 3D card swapping, and layout animations.
- **Lucide React**: Clean, consistent SVG iconography.
- **Vanilla CSS & Inline Styles**: Customized design token system utilizing a ThemeProvider without the overhead of heavy CSS frameworks.

## 🛠️ Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
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

The application should now be running locally. Check your terminal for the exact localhost URL (usually `http://localhost:5173`).

## 🎨 Design System

TrinetraAI implements a custom, fully reactive design token system via `ThemeContext.tsx`. 
- **Dark Mode**: High-contrast dark backgrounds (`#06080F`), deep indigo accents (`#5227FF`), and subtle gradients designed to look like high-end cybersecurity software.
- **Light Mode**: Ultra-clean white surfaces with soft gray borders and highly readable typography for extended investigative work.

### Core Brand Colors
- **Accent**: Indigo (`#5227FF`)
- **Alert / High Risk**: Crimson Red (`#E85D75`)
- **Verified / Normal**: Emerald Green (`#2FBF71`)
- **Warning / Suspicious**: Amber (`#F59E0B`)
- **Info / Identity**: Teal (`#00B3A4`)

## 📁 Project Structure

- `src/app/context/`: Contains global state providers (`ThemeContext`, `DocumentContext`).
- `src/app/pages/`: Main route views (`LandingPage`, `HowItWorksPage`, Workspace features).
- `src/app/components/`: Reusable UI components (`Navbar`, `Footer`, `Hero`, `CardSwap`).
- `public/`: Static assets including the custom SVG favicon.

## 🤝 Contributing

This project is a conceptual prototype. Feel free to fork it, modify the UI components, or hook it up to a real backend AI pipeline!