export interface LegalDocument {
  id: string;
  name: string;
  ref: string;
  type: string;
  date: string;
  size: string;
  status: 'Analyzed' | 'Processing' | 'Action Required';
  updatedAt: string;
  isRecent?: boolean;
}

export interface KeyParty {
  id: string;
  name: string;
  role: string;
  description: string;
  verified: boolean;
}

export interface CriticalDate {
  id: string;
  label: string;
  date: string; // "Jan 15"
  year?: string; // "2024"
  description: string;
  isHighRisk?: boolean;
}

export interface KeyClause {
  id: string;
  name: string;
  status: 'STANDARD' | 'REVIEW REQ' | 'CRITICAL';
  text: string;
}

export interface ExecutiveSummary {
  text: string;
  highlightedSection?: string;
}

export interface KeyObligation {
  title: string;
  description: string;
}

export interface PotentialRisk {
  title: string;
  description: string;
  level: 'high' | 'medium' | 'low';
}

export interface PriorityActionItem {
  id: string;
  title: string;
  description: string;
  type: 'edit' | 'signature' | 'attachment';
}

export interface DocumentAnalysisReport {
  documentId: string;
  executiveSummary: ExecutiveSummary;
  obligations: KeyObligation[];
  risks: PotentialRisk[];
  actions: PriorityActionItem[];
  parties: KeyParty[];
  criticalDates: CriticalDate[];
  keyClauses: KeyClause[];
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  citations?: { section: string; title: string }[];
}

export interface LegalAlert {
  id: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
  title: string;
  description: string;
  aiInsight?: string;
}
