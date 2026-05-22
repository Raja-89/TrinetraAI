import React, { createContext, useContext, useState, ReactNode } from "react";
import { Upload, FileSearch, PenTool, ScanLine, AlertTriangle, ShieldCheck } from "lucide-react";

// Types
export interface MetaRow {
  field: string;
  value: string;
  flagged: boolean;
}

export interface AITrait {
  label: string;
  severity: string;
  dot: string;
}

export interface ConfidenceField {
  field: string;
  value: string;
  conf: number;
}

export interface TimelineEvent {
  label: string;
  ts: string;
  color: string;
  Icon: React.ElementType;
  flag?: string;
}

export interface DocumentData {
  title: string;
  integrityScore: number;
  aiProbScore: number;
  anomalyCells: Set<number>;
  ocrText: { label: string; text: string; type: "normal" | "tampered" | "suspicious" }[];
  metaRows: MetaRow[];
  aiTraits: AITrait[];
  confidenceFields: ConfidenceField[];
  timelineEvents: TimelineEvent[];
}

// ─── Scenarios ─────────────────────────────────────────────────────────────

const RED = "#E85D75";
const TEAL = "#00B3A4";
const GREEN = "#2FBF71";
const AMBER = "#F59E0B";
const PURPLE = "#8B5CF6";

const SCENARIO_1: DocumentData = {
  title: "Rajesh Kumar - Form 16",
  integrityScore: 34,
  aiProbScore: 73,
  anomalyCells: new Set([7, 18, 27, 34, 43, 56, 61, 72]),
  ocrText: [
    { label: "Employee Name: ", text: "Rajesh Kumar", type: "suspicious" },
    { label: "\nMonthly Salary: ", text: "₹1,20,000", type: "tampered" },
    { label: "\nDate of Joining: 2019-01-10\nEmployee ID: TCS-", text: "4521-B", type: "suspicious" }
  ],
  metaRows: [
    { field: "PDF Creator", value: "Adobe Acrobat DC 2019", flagged: false },
    { field: "Modified Date", value: "2024-01-15 03:42", flagged: true },
    { field: "Producer", value: "Unknown", flagged: true },
    { field: "Page Count", value: "4", flagged: false },
    { field: "Compression", value: "Suspicious", flagged: true },
    { field: "Digital Signature", value: "None", flagged: true },
  ],
  aiTraits: [
    { label: "Synthetic noise pattern", severity: "high", dot: RED },
    { label: "GAN compression artifacts", severity: "detected", dot: AMBER },
    { label: "Unnatural pixel distribution", severity: "detected", dot: AMBER },
    { label: "Font inconsistency across layers", severity: "high", dot: RED },
    { label: "No authentic scanner metadata", severity: "flagged", dot: "rgba(255,255,255,0.35)" },
  ],
  confidenceFields: [
    { field: "Employee Name", value: "Rajesh Kumar", conf: 58 },
    { field: "Monthly Salary", value: "₹1,20,000", conf: 31 },
    { field: "Date of Joining", value: "2019-01-10", conf: 92 },
  ],
  timelineEvents: [
    { label: "Document Created", ts: "Dec 2023", color: "rgba(255,255,255,0.45)", Icon: FileSearch },
    { label: "Metadata Modified", ts: "Jan 2024, 03:42 AM", color: RED, Icon: PenTool, flag: "SUSPICIOUS TIME" },
    { label: "OCR Layer Added", ts: "Jan 2024", color: AMBER, Icon: ScanLine },
    { label: "Signature Pasted", ts: "Jan 2024", color: RED, Icon: PenTool, flag: "FORGED" },
    { label: "Uploaded for Verification", ts: "Feb 2024", color: PURPLE, Icon: Upload },
  ],
};

const SCENARIO_2: DocumentData = {
  title: "Priya Sharma - Bank Statement",
  integrityScore: 95,
  aiProbScore: 4,
  anomalyCells: new Set([]),
  ocrText: [
    { label: "Account Holder: ", text: "Priya Sharma", type: "normal" },
    { label: "\nAccount Number: ", text: "XXXX-XXXX-9012", type: "normal" },
    { label: "\nClosing Balance: ", text: "₹4,50,000", type: "normal" }
  ],
  metaRows: [
    { field: "PDF Creator", value: "HDFC Bank Core System", flagged: false },
    { field: "Modified Date", value: "2024-02-10 10:15", flagged: false },
    { field: "Producer", value: "iText 2.1.7", flagged: false },
    { field: "Page Count", value: "12", flagged: false },
    { field: "Compression", value: "Standard PDF", flagged: false },
    { field: "Digital Signature", value: "Valid (HDFC)", flagged: false },
  ],
  aiTraits: [
    { label: "Natural pixel distribution", severity: "low", dot: GREEN },
    { label: "Consistent font rendering", severity: "low", dot: GREEN },
    { label: "Valid cryptographic signature", severity: "low", dot: GREEN },
  ],
  confidenceFields: [
    { field: "Account Holder", value: "Priya Sharma", conf: 99 },
    { field: "Closing Balance", value: "₹4,50,000", conf: 98 },
    { field: "Account Number", value: "XXXX-XXXX-9012", conf: 99 },
  ],
  timelineEvents: [
    { label: "Statement Generated", ts: "Feb 10 2024, 10:14 AM", color: GREEN, Icon: FileSearch },
    { label: "Digitally Signed", ts: "Feb 10 2024, 10:15 AM", color: GREEN, Icon: ShieldCheck },
    { label: "Uploaded for Verification", ts: "Feb 12 2024", color: PURPLE, Icon: Upload },
  ],
};

const SCENARIO_3: DocumentData = {
  title: "Amit Patel - Utility Bill",
  integrityScore: 62,
  aiProbScore: 45,
  anomalyCells: new Set([12, 14, 25, 30, 48]),
  ocrText: [
    { label: "Customer Name: ", text: "Amit Patel", type: "normal" },
    { label: "\nBilling Amount: ", text: "₹14,500", type: "tampered" },
    { label: "\nDue Date: ", text: "2024-03-01", type: "suspicious" }
  ],
  metaRows: [
    { field: "PDF Creator", value: "macOS Quartz PDFContext", flagged: true },
    { field: "Modified Date", value: "2024-02-28 11:20", flagged: true },
    { field: "Producer", value: "Preview", flagged: true },
    { field: "Page Count", value: "1", flagged: false },
    { field: "Compression", value: "Re-compressed", flagged: true },
    { field: "Digital Signature", value: "None", flagged: true },
  ],
  aiTraits: [
    { label: "Text alignment mismatch", severity: "high", dot: RED },
    { label: "Inconsistent JPEG artifacts", severity: "detected", dot: AMBER },
    { label: "Metadata editor trace", severity: "high", dot: RED },
  ],
  confidenceFields: [
    { field: "Customer Name", value: "Amit Patel", conf: 85 },
    { field: "Billing Amount", value: "₹14,500", conf: 42 },
    { field: "Due Date", value: "2024-03-01", conf: 60 },
  ],
  timelineEvents: [
    { label: "Original PDF Created", ts: "Feb 20 2024", color: "rgba(255,255,255,0.45)", Icon: FileSearch },
    { label: "Opened in Preview (macOS)", ts: "Feb 28 2024, 11:15 AM", color: AMBER, Icon: ScanLine },
    { label: "Text Layer Modified", ts: "Feb 28 2024, 11:20 AM", color: RED, Icon: PenTool, flag: "TAMPERED" },
    { label: "Uploaded for Verification", ts: "Mar 01 2024", color: PURPLE, Icon: Upload },
  ],
};

const SCENARIOS = [SCENARIO_1, SCENARIO_2, SCENARIO_3];

interface DocumentContextType {
  data: DocumentData;
  mockUpload: () => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const mockUpload = () => {
    // Cycle through the scenarios
    setCurrentIndex((prev) => (prev + 1) % SCENARIOS.length);
  };

  return (
    <DocumentContext.Provider value={{ data: SCENARIOS[currentIndex], mockUpload }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error("useDocument must be used within a DocumentProvider");
  }
  return context;
}
