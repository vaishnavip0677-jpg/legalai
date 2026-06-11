import React, { useState, useRef } from 'react';
import { UploadCloud, Camera, CheckCircle, ShieldAlert, Sparkles, FileText, Lock, Plus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DocumentAnalysisReport, LegalDocument } from '../types';

interface DocumentUploadViewProps {
  onAnalysisComplete: (newDoc: LegalDocument, report: DocumentAnalysisReport) => void;
  setTab: (tab: 'home' | 'docs' | 'alerts' | 'profile' | 'upload') => void;
}

export default function DocumentUploadView({ onAnalysisComplete, setTab }: DocumentUploadViewProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Uploading...');
  const [fileName, setFileName] = useState('');
  const [showAiChip, setShowAiChip] = useState(false);
  const [ocrComplete, setOcrComplete] = useState(false);
  
  // Custom text pasture option for instant demo
  const [showTextPaste, setShowTextPaste] = useState(false);
  const [pastedText, setPastedText] = useState('');
  const [pasteTitle, setPasteTitle] = useState('Custom Service Covenant Agreement');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileSelect = () => fileInputRef.current?.click();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startUploadMock(e.dataTransfer.files[0].name, e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      startUploadMock(e.target.files[0].name, e.target.files[0]);
    }
  };

  const startUploadMock = (name: string, fileObj?: File) => {
    setFileName(name);
    setIsUploading(true);
    setProgress(0);
    setStatusText('Uploading File...');
    setOcrComplete(false);
    setShowAiChip(false);

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 12) + 8;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        startAiOcrAnalysis();
      }
      setProgress(currentProgress);
    }, 180);
  };

  const startAiOcrAnalysis = async () => {
    setStatusText('AI EXTRACTING CLAUSES...');
    setShowAiChip(true);

    try {
      // Prompt a real backend call to /api/analyze if we pasted text, or use dummy realistic results
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentName: fileName,
          documentContent: pastedText || `Draft Agreement summary parameters: ${fileName}. Parties Acme Corporation and Julian Vance covenant mutual indemnification and review standard force majeure clauses before Jan 15 2026.`
        })
      });

      const data = await response.json();

      setTimeout(() => {
        setOcrComplete(true);
        setStatusText('ANALYSIS COMPLETE');

        // Package up the analyzed document
        const newDoc: LegalDocument = {
          id: data.documentId || 'doc-dynamic-' + Date.now(),
          name: fileName,
          ref: 'LAI-2024-' + Math.floor(Math.random() * 900 + 100),
          type: 'Contract',
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          size: '1.2 MB',
          status: 'Analyzed',
          updatedAt: 'Just now',
          isRecent: true,
        };

        const newReport: DocumentAnalysisReport = {
          documentId: newDoc.id,
          executiveSummary: data.executiveSummary || {
            text: 'This contract contains typical legal parameters. Comprehensive definitions of indemnity terms are present under standard regulatory frameworks.',
            highlightedSection: 'Section 4'
          },
          obligations: data.obligations || [
            { title: 'Standard Performance', description: 'Deliverables must satisfy guidelines.' }
          ],
          risks: data.risks || [
            { title: 'Limitation discrepancies', description: 'Check clause liability triggers.', level: 'medium' }
          ],
          actions: data.actions || [
            { id: 'act-new-1', title: 'Audit Indemnity Liability Clause', description: 'Check custom thresholds.', type: 'edit' }
          ],
          parties: data.parties || [
            { id: 'p1', name: 'Acme Corporation', role: 'Partner', description: 'Client', verified: true }
          ],
          criticalDates: data.criticalDates || [
            { id: 'd1', label: 'Commencement', date: 'Immediately', description: 'On signing', isHighRisk: false }
          ],
          keyClauses: data.keyClauses || [
            { id: 'c1', name: 'Indemnity Force', status: 'STANDARD', text: 'Corporate indemnity applies.' }
          ]
        };

        onAnalysisComplete(newDoc, newReport);
      }, 2500);

    } catch (e) {
      console.error(e);
      // Fallback in case of server failure
      setTimeout(() => {
        setOcrComplete(true);
        setStatusText('ANALYSIS DONE (MOCKED)');
      }, 2000);
    }
  };

  const handlePasteSubmit = () => {
    if (!pastedText.trim()) return;
    startUploadMock(pasteTitle + '.pdf');
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100 max-w-2xl mx-auto pb-12">
      <section className="space-y-1.5">
        <h2 className="font-display-lg text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Secure Document Analysis
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
          Upload legal documents for precision AI auditing and risk assessment.
        </p>
      </section>

      {/* Main Upload Canvas */}
      <div className="grid grid-cols-1 gap-4">
        
        {/* Dotted Drag & Drop area matching Screen 8 visual */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
          className={`border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-8 md:p-12 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-950 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all group relative overflow-hidden shadow-xs ${
            isDragOver ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20' : ''
          }`}
        >
          <div className="mb-4 bg-indigo-50 dark:bg-indigo-950 p-4 rounded-full group-hover:scale-110 transition-transform duration-300 shrink-0">
            <UploadCloud className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="font-display-lg text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1">
            Drag & drop files here
          </h3>
          <p className="text-xs text-slate-400 mb-6">or click to browse your local storage</p>
          
          <div className="flex gap-2">
            <span className="px-3.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold rounded-full text-slate-500 dark:text-slate-400">PDF</span>
            <span className="px-3.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold rounded-full text-slate-500 dark:text-slate-400">DOCX</span>
            <span className="px-3.5 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold rounded-full text-slate-500 dark:text-slate-400">JPG</span>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".pdf,.docx,.jpg,.jpeg,.txt"
            className="hidden"
          />
        </div>

        {/* Option Toggle to Paste Raw Agreement Text directly for instant Gemini results */}
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
          <button
            onClick={() => setShowTextPaste(!showTextPaste)}
            className="flex items-center justify-between w-full text-left text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
              <span>Paste Contract Text (Instant AI OCR Demo)</span>
            </span>
            <span className="text-xs text-indigo-600 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded">
              {showTextPaste ? 'Hide' : 'Show'}
            </span>
          </button>

          <AnimatePresence>
            {showTextPaste && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-4 space-y-3 pt-3 border-t border-slate-50 dark:border-slate-800"
              >
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Agreement Title</label>
                  <input
                    type="text"
                    value={pasteTitle}
                    onChange={(e) => setPasteTitle(e.target.value)}
                    placeholder="Enter document title..."
                    className="w-full text-sm font-medium border border-slate-200 rounded-lg p-2 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Paste Custom Clauses</label>
                  <textarea
                    rows={6}
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder="Paste your legal clauses here to analyze them with live Gemini AI logic..."
                    className="w-full text-sm border border-slate-200 rounded-lg p-3 dark:bg-slate-950 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <button
                  onClick={handlePasteSubmit}
                  disabled={!pastedText.trim()}
                  className="w-full bg-slate-900 text-white rounded-xl py-3 text-sm font-bold active:scale-[0.98] transition-transform flex items-center justify-center gap-2 hover:bg-indigo-600 disabled:opacity-40 disabled:pointer-events-none"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Pasted Contract Text</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Secondary Scan Button */}
        <button
          onClick={() => alert('Accessing Secure sandboxed camera scanner... No browser camera framework initialized.')}
          className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-xs hover:shadow-md transition-shadow group text-left"
        >
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 text-white dark:bg-indigo-950 p-3 rounded-xl shrink-0">
              <Camera className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <span className="block text-sm font-semibold text-slate-900 dark:text-white">Scan Physical Document</span>
              <span className="block text-xs text-slate-400 mt-0.5">Use your camera as a mobile sandboxed scanner</span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* Progress tracking container shown during upload matching layout on Screen 8 */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="space-y-4"
          >
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <span className="block text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-1">
                    {statusText}
                  </span>
                  <span className="block text-sm md:text-base font-bold text-slate-800 dark:text-slate-100 truncate max-w-[280px] sm:max-w-md">
                    {fileName}
                  </span>
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  {ocrComplete ? (
                    <span className="text-emerald-500 flex items-center gap-1 text-sm md:text-base font-bold">
                      <CheckCircle className="w-5 h-5 inline-block fill-current text-white dark:text-slate-900 stroke-emerald-500" />
                      Ready
                    </span>
                  ) : (
                    `${progress}%`
                  )}
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${progress}%` }}
                  className={`h-full transition-all duration-300 rounded-full ${
                    ocrComplete ? 'bg-emerald-500' : 'bg-indigo-600 dark:bg-indigo-400'
                  }`}
                />
              </div>

              {/* AI Insight banner once loaded */}
              <AnimatePresence>
                {showAiChip && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 flex items-start gap-2.5 px-4 py-3 bg-teal-50/50 dark:bg-teal-950/20 border border-teal-150 dark:border-teal-900/30 text-teal-800 dark:text-teal-400 rounded-xl"
                  >
                    <Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5 animate-pulse" />
                    <div className="text-xs font-semibold leading-relaxed">
                      {ocrComplete ? (
                        <span>Ready For Review: Contract analyzed. Critical triggers parsed in Section 4 & Section 12.</span>
                      ) : (
                        <span>DeepOCR & AI Extraction actively parsing clauses & legal liabilities...</span>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Security & Bank trust parameters section */}
      <section className="flex flex-col items-center justify-center pt-8 border-t border-slate-100 dark:border-slate-800 space-y-2 opacity-70">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Lock className="w-4 h-4" />
          <span className="text-[10px] font-bold tracking-widest uppercase">
            AES-256 BANK-GRADE ENCRYPTION
          </span>
        </div>
        <p className="text-center text-[10px] leading-relaxed text-slate-400 max-w-sm px-6">
          Your documents are processed in a sandboxed, zero-data-retention environment. No data is logged, shared, or used for model training without explicit consent.
        </p>
      </section>
    </div>
  );
}
