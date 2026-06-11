import React, { useState } from 'react';
import {
  Sparkles, Share2, Download, CheckCircle, Info, Warning,
  AlertTriangle, Play, FileText, Check, ChevronRight, Edit2,
  Paperclip, ZoomIn, ZoomOut, Printer, Users, Calendar, Gavel, FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LegalDocument, DocumentAnalysisReport } from '../types';

interface DocumentAnalysisViewProps {
  document: LegalDocument;
  report: DocumentAnalysisReport;
  onOpenChat: () => void;
  onApprove: () => void;
}

export default function DocumentAnalysisView({
  document: doc,
  report,
  onOpenChat,
  onApprove
}: DocumentAnalysisViewProps) {
  // Tabs: 'summary' (Screen 2) | 'split' (Screen 3)
  const [activeViewMode, setActiveViewMode] = useState<'summary' | 'split'>('summary');
  const [isApproved, setIsApproved] = useState(false);

  const handleApproveClick = () => {
    setIsApproved(true);
    onApprove();
  };

  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* Top Action Breadcrumb Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/45 dark:text-indigo-400 text-xs font-bold rounded-full uppercase tracking-wider">
            AI Analysis Complete
          </span>
          <h2 className="font-display-lg text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1.5 flex items-center gap-2">
            {doc.name}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Ref: {doc.ref} • Updated {doc.updatedAt}
          </p>
        </div>

        {/* View Mode Switcher Selector */}
        <div className="flex bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-xl p-1 shrink-0 self-start sm:self-auto shadow-inner">
          <button
            onClick={() => setActiveViewMode('summary')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeViewMode === 'summary'
                ? 'bg-white text-slate-950 dark:bg-slate-800 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Summary Report
          </button>
          <button
            onClick={() => setActiveViewMode('split')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeViewMode === 'split'
                ? 'bg-white text-slate-950 dark:bg-slate-800 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            PDF Split Inspector
          </button>
        </div>
      </div>

      {/* View Mode Rendering */}
      <AnimatePresence mode="wait">
        {activeViewMode === 'summary' ? (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Action CTAs matching Screen 2 */}
            <div className="flex gap-2 justify-start items-center">
              <button
                onClick={() => alert('Co-counsel share link generated. Copying to clipboard!')}
                className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300 font-semibold text-xs rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>Share with Counsel</span>
              </button>
              <button
                onClick={() => alert('Exporting summary PDF...')}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white font-semibold text-xs rounded-xl hover:bg-indigo-600 transition-all cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Export Summary</span>
              </button>
            </div>

            {/* Executive Summary Card with decorative auto_awesome style */}
            <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2 mb-4">
                <span className="p-1.5 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="w-5 h-5 fill-indigo-100 dark:fill-none" />
                </span>
                <h3 className="font-display-lg text-base md:text-lg font-bold text-slate-900 dark:text-white">
                  Executive Summary
                </h3>
              </div>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {report.executiveSummary.text.split(report.executiveSummary.highlightedSection || '').map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && (
                      <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-950/65 dark:text-indigo-300 px-1.5 py-0.5 rounded-md font-bold inline-block mx-0.5 text-xs">
                        {report.executiveSummary.highlightedSection}
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </section>

            {/* Bento columns: Key Obligations & Potential Risks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
              
              {/* Key Obligations (Left) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-50 dark:border-slate-800 pb-3">
                  <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-display-lg text-base font-bold text-slate-900 dark:text-white">
                    Key Obligations
                  </h3>
                </div>
                <ul className="space-y-4">
                  {report.obligations.map((ob, i) => (
                    <li key={i} className="flex gap-3">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-100 text-sm">{ob.title}</p>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{ob.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Potential Risks (Right) */}
              <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-xs">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-50 dark:border-slate-800 pb-3">
                  <AlertTriangle className="w-5 h-5 text-rose-500" />
                  <h3 className="font-display-lg text-base font-bold text-slate-900 dark:text-white">
                    Potential Risks
                  </h3>
                </div>
                <ul className="space-y-4">
                  {report.risks.map((risk, i) => {
                    const isHigh = risk.level === 'high';
                    return (
                      <li
                        key={i}
                        className={`flex gap-3 p-3 rounded-xl border transition-colors ${
                          isHigh
                            ? 'bg-rose-50/50 border-rose-100/60 dark:bg-rose-950/10 dark:border-rose-900/40 text-rose-900 dark:text-rose-450'
                            : 'bg-slate-50/40 border-slate-100 dark:bg-slate-900 dark:border-slate-800 text-slate-800 dark:text-slate-350'
                        }`}
                      >
                        <AlertTriangle className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${isHigh ? 'text-rose-600' : 'text-slate-400'}`} />
                        <div>
                          <p className="font-bold text-sm">{risk.title}</p>
                          <p className={`text-xs mt-1 leading-relaxed ${isHigh ? 'text-rose-800/80 dark:text-rose-350' : 'text-slate-400'}`}>
                            {risk.description}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Priority Action Items matching Screen 2 wrapped in clear border */}
            <section className="bg-white dark:bg-slate-900 border-2 border-indigo-900 dark:border-slate-800 rounded-2xl p-6 shadow-md">
              <div className="flex items-center gap-2.5 mb-5 shrink-0">
                <FileCheck className="w-5 h-5 text-indigo-700 dark:text-indigo-400 stroke-[2px]" />
                <h3 className="font-display-lg text-base md:text-lg font-bold text-slate-950 dark:text-white">
                  Priority Action Items
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {report.actions.map((act) => {
                  let Icon = Edit2;
                  let bgCol = 'bg-slate-900 text-white';
                  if (act.type === 'signature') {
                    Icon = Edit2;
                    bgCol = 'bg-indigo-500 text-white';
                  } else if (act.type === 'attachment') {
                    Icon = Paperclip;
                    bgCol = 'bg-amber-500 text-white';
                  }

                  return (
                    <div
                      key={act.id}
                      onClick={() => alert(`Action launched: ${act.title}`)}
                      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 hover:bg-slate-100/50 dark:hover:bg-slate-900 rounded-xl transition-all cursor-pointer group"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`w-9 h-9 rounded-full ${bgCol} flex items-center justify-center`}>
                          <Icon className="w-4 h-4 stroke-[2.2px]" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-950 dark:text-slate-200 text-xs md:text-sm">{act.title}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{act.description}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Screen 2 "Original Document Context" skeleton preview with floating annotation */}
            <section className="bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
              <div className="px-4 py-3 bg-slate-100/80 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-slate-400">Original Document Context</span>
                <span className="w-4 h-4 rounded bg-slate-200" />
              </div>
              <div className="p-8 relative">
                <div className="space-y-3 opacity-30 select-none">
                  <div className="h-4 bg-slate-400 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-400 rounded w-full"></div>
                  <div className="h-4 bg-slate-400 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-400 text-xs italic py-2">Consultant covenanted indemnifications as part of general contractor terms and liability standards.</div>
                  <div className="h-4 bg-slate-400 rounded w-2/3"></div>
                </div>

                {/* Overlap highlighted annotation float block */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border border-indigo-200 dark:border-indigo-900 p-4 rounded-xl shadow-xl max-w-xs space-y-1 hover:scale-102 transition-transform">
                    <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                      <span>AI Extraction Focused Here</span>
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">
                      "...party shall indemnify the other from and against any third-party claims..."
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </motion.div>
        ) : (
          <motion.div
            key="split"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col lg:flex-row h-screen border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm shadow-indigo-950/5 "
          >
            {/* Left side: Simulated PDF Document Canvas matching Screen 3 */}
            <section className="flex-1 bg-slate-50 dark:bg-slate-900/80 p-6 md:p-8 overflow-y-auto max-h-[750px] relative">
              <div className="absolute top-4 right-4 p-2 flex gap-1.5 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 z-10">
                <button className="p-1 rounded-md hover:bg-slate-50"><ZoomIn className="w-4 h-4" /></button>
                <button className="p-1 rounded-md hover:bg-slate-50"><ZoomOut className="w-4 h-4" /></button>
                <button className="p-1 rounded-md hover:bg-slate-50"><Printer className="w-4 h-4" /></button>
              </div>

              <div className="max-w-xl mx-auto space-y-6 bg-white dark:bg-slate-950 p-8 md:p-12 min-h-[900px] shadow-sm rounded-2xl border border-slate-150 relative">
                <div className="text-center mb-10">
                  <h1 className="font-display-lg text-lg uppercase tracking-widest text-slate-900 dark:text-white font-bold">
                    Service Agreement
                  </h1>
                  <p className="text-[10px] text-slate-400 mt-1">Contract ID: #LAI-2023-9981</p>
                </div>

                {/* PDF paragraphs with highlights matching Screen 3 */}
                <div className="space-y-6 text-slate-600 dark:text-slate-300 text-xs md:text-sm leading-relaxed">
                  <p>
                    This MASTER SERVICES AGREEMENT (the "Agreement") is entered into as of{' '}
                    <span className="bg-amber-100 border-b-2 border-amber-400 px-1 font-bold text-slate-900">
                      January 15, 2024
                    </span>{' '}
                    (the "Effective Date") by and between{' '}
                    <span className="bg-amber-100 border-b-2 border-amber-400 px-1 font-bold text-slate-900">
                      Acme Corporation
                    </span>{' '}
                    , a Delaware corporation ("Client"), and{' '}
                    <span className="bg-amber-100 border-b-2 border-amber-400 px-1 font-bold text-slate-900">
                      John Doe Consulting Group
                    </span>{' '}
                    ("Consultant").
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-bold uppercase text-slate-800 dark:text-white">1. Services and Payment</h4>
                    <p>
                      Consultant shall provide software engineering and architectural review services as described in Exhibit A. Client shall pay Consultant a monthly retainer of $15,000 USD due on the first of each month.
                    </p>
                  </div>

                  {/* AI Detected section highlighting matching Screen 3 style */}
                  <div className="space-y-3 p-4 rounded-xl bg-teal-50/50 border border-teal-150 dark:bg-teal-950/10 dark:border-teal-900/40 relative group">
                    <div className="absolute -left-2 top-4 w-1 h-12 bg-teal-500 rounded-full" />
                    <h4 className="font-bold uppercase text-slate-800 dark:text-white flex items-center gap-1.5">
                      <span>4. Indemnification</span>
                      <span className="text-[9px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider dark:bg-teal-900 dark:text-teal-300">
                        AI Detected
                      </span>
                    </h4>
                    <p className="italic text-slate-500 dark:text-slate-400">
                      Each party shall indemnify, defend and hold harmless the other party and its officers, directors, and employees from and against any and all claims, losses, liabilities, damages, and expenses (including reasonable attorneys' fees) arising out of or related to the gross negligence or willful misconduct of the indemnifying party.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold uppercase text-slate-800 dark:text-white">7. Termination</h4>
                    <p>
                      Either party may terminate this Agreement for convenience upon sixty (60) days' written notice to the other party. In the event of a material breach, the non-breaching party may terminate immediately. The final{' '}
                      <span className="bg-amber-100 border-b-2 border-amber-400 px-1 font-bold text-slate-900">
                        Termination Date
                      </span>{' '}
                      shall not exceed{' '}
                      <span className="bg-amber-100 border-b-2 border-amber-400 px-1 font-bold text-slate-900">
                        January 15, 2026
                      </span>{' '}
                      unless extended in writing.
                    </p>
                  </div>

                  <div className="space-y-3 p-4 rounded-xl bg-teal-50/50 border border-teal-150 dark:bg-teal-950/10 dark:border-teal-900/40 relative">
                    <div className="absolute -left-2 top-4 w-1 h-12 bg-teal-500 rounded-full" />
                    <h4 className="font-bold uppercase text-slate-800 dark:text-white flex items-center gap-1.5">
                      <span>12. Force Majeure</span>
                      <span className="text-[9px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">
                        AI Detected
                      </span>
                    </h4>
                    <p className="italic text-slate-500">
                      Neither party shall be liable for any failure or delay in performance under this Agreement (other than for delay in the payment of money due and payable hereunder) to the extent said failures or delays are caused by causes beyond that party's reasonable control...
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Right side: Detailed Extracted Insights Sidebar column matching Screen 3 */}
            <aside className="w-full lg:w-96 bg-white dark:bg-slate-950 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800 flex flex-col max-h-[750px] overflow-y-auto scrollbar-thin">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/25">
                <h3 className="font-display-lg text-base font-bold text-slate-900 dark:text-white">
                  Extracted Insights
                </h3>
                <Sparkles className="w-4 h-4 text-indigo-650 animate-pulse" />
              </div>

              <div className="p-5 space-y-6">
                
                {/* Key Parties Sidebar section */}
                <section className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Key Parties</h4>
                  </div>
                  <div className="space-y-2">
                    {report.parties.map((pt) => (
                      <div
                        key={pt.id}
                        className="p-3 border border-slate-100 dark:border-slate-800 bg-slate-50/30 rounded-xl flex items-center justify-between"
                      >
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{pt.name}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{pt.role} | {pt.description}</p>
                        </div>
                        {pt.verified && (
                          <span className="text-emerald-500 bg-emerald-50 p-1 rounded-full dark:bg-emerald-950/20">
                            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Critical Dates Sidebar calendar styles block */}
                <section className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Critical Dates</h4>
                  </div>
                  <div className="space-y-2">
                    {report.criticalDates.map((dt) => (
                      <div
                        key={dt.id}
                        className={`flex items-center gap-3 p-3 bg-slate-50/60 dark:bg-slate-900 dark:border-slate-800 rounded-xl border-l-4 ${
                          dt.isHighRisk ? 'border-rose-500' : 'border-indigo-500'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex flex-col items-center justify-center font-bold text-center shrink-0 ${
                          dt.isHighRisk ? 'bg-rose-500 text-white' : 'bg-slate-900 text-white dark:bg-indigo-950 dark:text-indigo-300'
                        }`}>
                          <span className="text-[9px] uppercase font-bold leading-none">{dt.date.split(' ')[0]}</span>
                          <span className="text-sm font-extrabold leading-none mt-1">{dt.date.split(' ')[1]}</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{dt.label}</p>
                          <p className={`text-[10px] ${dt.isHighRisk ? 'text-rose-600 font-semibold' : 'text-slate-400'}`}>
                            {dt.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Risk Key Clauses tag badges */}
                <section className="space-y-3.5">
                  <div className="flex items-center gap-2">
                    <Gavel className="w-4 h-4 text-slate-400" />
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Key Clauses</h4>
                  </div>
                  <div className="space-y-3">
                    {report.keyClauses.map((cls) => {
                      const isReview = cls.status === 'REVIEW REQ';
                      return (
                        <div
                          key={cls.id}
                          className={`p-3.5 rounded-xl border text-xs leading-relaxed space-y-2 ${
                            isReview
                              ? 'bg-amber-50 hover:bg-amber-50/80 border-amber-250 dark:bg-slate-900 dark:border-slate-800'
                              : 'bg-teal-50 hover:bg-teal-50/80 border-teal-200 dark:bg-slate-900 dark:border-slate-800'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`font-bold uppercase ${isReview ? 'text-amber-800' : 'text-teal-800'}`}>
                              {cls.name}
                            </span>
                            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full ${
                              isReview ? 'bg-amber-100/80 text-amber-900' : 'bg-teal-100 text-teal-900'
                            }`}>
                              {cls.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 hover:text-slate-700 transition-colors line-clamp-2">
                            {cls.text}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              {/* Action layout bottom side actions bar */}
              <div className="mt-auto p-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2 shrink-0">
                <button
                  onClick={() => alert('Downloading legal insight package...')}
                  className="py-2.5 bg-white border border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300 dark:bg-slate-950 rounded-xl text-xs font-bold hover:bg-slate-50 active:scale-95 transition-all text-center"
                >
                  Export Zip
                </button>
                <button
                  onClick={handleApproveClick}
                  className={`py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all text-center ${
                    isApproved
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-900 text-white hover:bg-indigo-600'
                  }`}
                >
                  {isApproved ? 'Approved!' : 'Approve Docs'}
                </button>
              </div>
            </aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Embedded Action Floating Ask AI Button Trigger matching Screens bottom right */}
      <div className="fixed bottom-24 right-5 sm:bottom-12 sm:right-12 z-40">
        <button
          onClick={onOpenChat}
          className="w-14 h-14 rounded-full bg-slate-900 hover:bg-indigo-600 text-white shrink shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative border border-slate-850"
          title="Ask LegalAI anything"
        >
          <Sparkles className="w-6 h-6 shrink-0 fill-indigo-200 text-white" />
          <div className="absolute right-full mr-3 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide whitespace-nowrap opacity-0 group-hover:opacity-100 shadow-xl transition-all duration-300 pointer-events-none hover:block">
            Ask LegalAI anything
          </div>
        </button>
      </div>
    </div>
  );
}
