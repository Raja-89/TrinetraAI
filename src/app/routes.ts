import { createBrowserRouter, redirect } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { FeaturesPage } from "./pages/FeaturesPage";
import { HowItWorksPage } from "./pages/HowItWorksPage";
import { ArchitecturePage } from "./pages/ArchitecturePage";
import { WorkspaceShell } from "./pages/workspace/WorkspaceShell";

// Lazy-friendly imports — all named exports from the workspace pages
// Using synchronous imports for simplicity (hackathon build)
import { IntelligenceHub } from "./pages/workspace/IntelligenceHub";
import { InvestigationWorkspace } from "./pages/workspace/InvestigationWorkspace";
import { DocumentForensics } from "./pages/workspace/DocumentForensics";
import { ContradictionEngine } from "./pages/workspace/ContradictionEngine";
import { FraudGraph } from "./pages/workspace/FraudGraph";
import { RealTimeMonitoring } from "./pages/workspace/RealTimeMonitoring";
import { HeatmapAnalyzer } from "./pages/workspace/HeatmapAnalyzer";
import { AIInvestigator } from "./pages/workspace/AIInvestigator";
import { Reports } from "./pages/workspace/Reports";
import { Compliance } from "./pages/workspace/Compliance";
import { TeamWorkspace } from "./pages/workspace/TeamWorkspace";
import { Settings } from "./pages/workspace/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/features",
    Component: FeaturesPage,
  },
  {
    path: "/how-it-works",
    Component: HowItWorksPage,
  },
  {
    path: "/architecture",
    Component: ArchitecturePage,
  },
  {
    path: "/workspace",
    Component: WorkspaceShell,
    children: [
      {
        index: true,
        loader: () => redirect("/workspace/hub"),
      },
      { path: "hub", Component: IntelligenceHub },
      { path: "investigations", Component: InvestigationWorkspace },
      { path: "forensics", Component: DocumentForensics },
      { path: "contradictions", Component: ContradictionEngine },
      { path: "graph", Component: FraudGraph },
      { path: "monitoring", Component: RealTimeMonitoring },
      { path: "heatmap", Component: HeatmapAnalyzer },
      { path: "ai", Component: AIInvestigator },
      { path: "reports", Component: Reports },
      { path: "compliance", Component: Compliance },
      { path: "team", Component: TeamWorkspace },
      { path: "settings", Component: Settings },
    ],
  },
]);
