import { LegalDocument, DocumentAnalysisReport, LegalAlert } from './types';

export const INITIAL_DOCUMENTS: LegalDocument[] = [
  {
    id: 'doc-1',
    name: 'Master Services Agreement.pdf',
    ref: 'MSA-2024-0892',
    type: 'Contract',
    date: 'Oct 24, 2023',
    size: '2.4 MB',
    status: 'Analyzed',
    updatedAt: '2 hours ago',
    isRecent: true,
  },
  {
    id: 'doc-2',
    name: 'Employment_Contract_v3.docx',
    ref: 'EMP-2023-0144',
    type: 'Employee Doc',
    date: 'Oct 22, 2023',
    size: '840 KB',
    status: 'Action Required',
    updatedAt: '1 day ago',
    isRecent: true,
  },
  {
    id: 'doc-3',
    name: 'Lease_Agreement.pdf',
    ref: 'LSE-2023-1102',
    type: 'Real Estate',
    date: 'Oct 19, 2023',
    size: '1.1 MB',
    status: 'Analyzed',
    updatedAt: '3 days ago',
    isRecent: true,
  },
  {
    id: 'doc-4',
    name: 'NDA_Standard_Template.pdf',
    ref: 'NDA-2023-0909',
    type: 'NDA',
    date: 'Sep 30, 2023',
    size: '512 KB',
    status: 'Processing',
    updatedAt: '1 week ago',
    isRecent: true,
  }
];

export const INITIAL_REPORTS: Record<string, DocumentAnalysisReport> = {
  'doc-1': {
    documentId: 'doc-1',
    executiveSummary: {
      text: 'This agreement establishes a standard commercial framework for digital service provision. The document is largely favorable to the Client, but contains critical indemnification triggers in Section 12.4. The term is perpetual unless terminated with 90-days notice. The AI has identified a potential conflict between the confidentiality obligations and the open-source software usage disclosure requirements.',
      highlightedSection: 'Section 12.4'
    },
    obligations: [
      {
        title: 'Quarterly Audit Access',
        description: 'Must provide infrastructure access within 5 business days of request.'
      },
      {
        title: 'Data Encryption Standards',
        description: 'Maintain AES-256 at rest and TLS 1.3 in transit for all client PII.'
      },
      {
        title: 'Insurance Coverage',
        description: 'Maintain $5M Professional Liability and $2M Cyber Insurance.'
      }
    ],
    risks: [
      {
        title: 'Uncapped Liability',
        description: 'Section 8.2 implies no cap for indirect damages caused by data breaches.',
        level: 'high'
      },
      {
        title: 'Ambiguous Termination',
        description: '"Convenience" termination lacks clear refund mechanics for prepaid credits.',
        level: 'medium'
      },
      {
        title: 'Jurisdiction Conflict',
        description: 'Contract governed by UK Law while arbitration is set in Delaware, USA.',
        level: 'low'
      }
    ],
    actions: [
      {
        id: 'act-1',
        title: 'Review Clause 4.2: Payment Terms',
        description: 'Negotiate Net-30 to replace current Net-15 terms.',
        type: 'edit'
      },
      {
        id: 'act-2',
        title: 'Requires Executive Signature',
        description: 'Pending approval from Head of Legal and CTO.',
        type: 'signature'
      },
      {
        id: 'act-3',
        title: 'Attach Exhibit B: Security Addendum',
        description: 'Mandatory technical requirements document missing from draft.',
        type: 'attachment'
      }
    ],
    parties: [
      {
        id: 'party-1',
        name: 'Acme Corporation',
        role: 'Client',
        description: 'Delaware Corp',
        verified: true
      },
      {
        id: 'party-2',
        name: 'John Doe Consulting',
        role: 'Consultant',
        description: 'Individual',
        verified: false
      }
    ],
    criticalDates: [
      {
        id: 'date-1',
        label: 'Effective Date',
        date: 'Jan 15',
        year: '2024',
        description: 'Standard term start',
        isHighRisk: false
      },
      {
        id: 'date-2',
        label: 'Termination Date',
        date: 'Jan 15',
        year: '2026',
        description: 'Expires in 23 months',
        isHighRisk: true
      }
    ],
    keyClauses: [
      {
        id: 'clause-1',
        name: 'Indemnity',
        status: 'STANDARD',
        text: 'Each party shall indemnify, defend and hold harmless the other party and its officers, directors, and employees from and against any and all claims, losses, liabilities, damages, and expenses (including reasonable attorneys\' fees) arising out of or related to the gross negligence or willful misconduct of the indemnifying party.'
      },
      {
        id: 'clause-2',
        name: 'Force Majeure',
        status: 'REVIEW REQ',
        text: 'Neither party shall be liable for any failure or delay in performance under this Agreement (other than for delay in the payment of money due and payable hereunder) to the extent said failures or delays are caused by causes beyond that party\'s reasonable control...'
      }
    ]
  },
  'doc-2': {
    documentId: 'doc-2',
    executiveSummary: {
      text: 'Standard high-level executive employment contract for technical personnel. It contains a high-priority risk regarding non-solicitation, which spans 24 months post-termination. Intellectual property assignment terms are comprehensive, vesting absolute ownership with the Employer upon generation.',
      highlightedSection: 'Section 6.1'
    },
    obligations: [
      {
        title: 'Devotion of Time',
        description: 'Employee must devote substantially all professional working hours to Employer business.'
      },
      {
        title: 'Prompt IP Disclosure',
        description: 'Must notify employer within 10 days of inventing any system, process, or asset.'
      }
    ],
    risks: [
      {
        title: 'Restrictive Non-Compete Scope',
        description: '24-month duration is exceptionally long and potentially unenforceable in CA.',
        level: 'high'
      },
      {
        title: 'Forfeiture of Prior Works',
        description: 'Clause 9.3 implies prior inventions not logged explicitly are assigned to employer.',
        level: 'medium'
      }
    ],
    actions: [
      {
        id: 'act-2-1',
        title: 'Verify Non-Compete Jurisdiction',
        description: 'Request adjustment to conform to California labor laws.',
        type: 'edit'
      },
      {
        id: 'act-2-2',
        title: 'Execute NDA Supplementary Seal',
        description: 'Requires Vance\'s private witness seal prior to payroll registration.',
        type: 'signature'
      }
    ],
    parties: [
      {
        id: 'party-2-1',
        name: 'Lumina Tech SA',
        role: 'Employer',
        description: 'Parent Organization',
        verified: true
      },
      {
        id: 'party-2-2',
        name: 'Julian Vance',
        role: 'Employee',
        description: 'Senior Legal Counsel',
        verified: true
      }
    ],
    criticalDates: [
      {
        id: 'date-2-1',
        label: 'Start Date',
        date: 'Nov 01',
        year: '2023',
        description: 'Probationary term initiates',
        isHighRisk: false
      }
    ],
    keyClauses: [
      {
        id: 'clause-2-1',
        name: 'Non-Compete covenant',
        status: 'CRITICAL',
        text: 'Employee shall not engage in any competing software legal consultancy projects for a continuous period of twenty-four (24) months post employment termination.'
      }
    ]
  }
};

export const INITIAL_ALERTS: LegalAlert[] = [
  {
    id: 'alert-1',
    priority: 'high',
    time: '14:22 PM',
    title: 'New Risk Detected in Service Agreement',
    description: 'AI detected a non-standard liability cap in the "Force Majeure" section of the NeoTech SA.',
    aiInsight: 'AI Insights: Liability exposure exceeds policy by 15%'
  },
  {
    id: 'alert-2',
    priority: 'medium',
    time: '10:45 AM',
    title: 'Contract Expiring in 30 Days',
    description: 'Vendor lease agreement for "Main Street Plaza" requires renewal notice by month end.',
  },
  {
    id: 'alert-3',
    priority: 'low',
    time: 'Yesterday',
    title: 'Signature Pending for Vendor Contract',
    description: 'Document "V-882-CleanServices" is awaiting internal approval from the HR department.',
  }
];
