import React from 'react';
import { Sparkles, FileText, Upload, ChevronRight, Gavel, FileCheck, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { LegalDocument } from '../types';

interface DashboardViewProps {
  documents: LegalDocument[];
  onSelectDocument: (doc: LegalDocument) => void;
  onStartAnalysis: () => void;
  onReviewInsight: () => void;
}

export default function DashboardView({
  documents,
  onSelectDocument,
  onStartAnalysis,
  onReviewInsight
}: DashboardViewProps) {
  // Stats dataset matching Screen 4 layout exactly
  const stats = [
    { label: 'TOTAL DOCS', value: '124', colorClass: 'text-slate-900 dark:text-slate-100' },
    { label: 'RISKS FOUND', value: '08', colorClass: 'text-rose-600 dark:text-rose-400 font-bold' },
    { label: 'ACTIVE LABS', value: '03', colorClass: 'text-indigo-600 dark:text-indigo-400' },
    { label: 'SAVINGS', value: '$4.2k', colorClass: 'text-emerald-600 dark:text-emerald-400' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Header */}
      <section className="space-y-1">
        <h2 className="font-display-lg text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Welcome back, Counselor
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
          Your AI assistant has analyzed 12 new clauses since your last visit.
        </p>
      </section>

      {/* Prominent Hero Action Card */}
      <section>
        <div
          onClick={onStartAnalysis}
          className="relative overflow-hidden bg-slate-900 dark:bg-slate-950 text-white rounded-2xl p-6 md:p-8 cursor-pointer group hover:shadow-xl hover:shadow-indigo-900/10 active:scale-[0.99] transition-all duration-300 border border-slate-800"
        >
          {/* Neon decorative background glow */}
          <div className="absolute right-0 top-0 w-48 h-48 bg-indigo-600 opacity-25 blur-3xl group-hover:opacity-40 transition-opacity pointer-events-none" />
          <div className="absolute left-1/3 bottom-0 w-32 h-32 bg-teal-500 opacity-10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5" /> High Precision OCR
              </span>
              <h3 className="font-display-lg text-xl md:text-2xl font-bold tracking-tight">
                Analyze New Document
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                Upload PDF or DocX to identify critical risk areas, non-standard terms, and extract metadata instantly.
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartAnalysis();
              }}
              className="flex items-center justify-center gap-2 bg-white text-slate-950 hover:bg-indigo-400 hover:text-white transition-all px-6 py-3 rounded-xl font-bold shadow-md text-sm cursor-pointer whitespace-nowrap self-start md:self-auto"
            >
              <Upload className="w-4 h-4 stroke-[2.5px]" />
              <span>Start Analysis</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid Stats Bento Box */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-800 flex flex-col justify-between"
          >
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 tracking-wider uppercase">
              {stat.label}
            </span>
            <p className={`text-2xl md:text-3xl font-extrabold mt-2 tracking-tight ${stat.colorClass}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      {/* Recent Documents Table List */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-display-lg text-lg md:text-xl font-bold text-slate-900 dark:text-slate-100">
            Recent Documents
          </h3>
          <button
            onClick={onStartAnalysis}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            Show All Docs
          </button>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => onSelectDocument(doc)}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:shadow-md dark:hover:border-slate-700 transition-all cursor-pointer group active:scale-[0.995]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300">
                  <FileText className="w-6 h-6 stroke-[1.5px]" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm md:text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {doc.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                    <span>{doc.type}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800"></span>
                    <span>{doc.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Visual Status Pills exactly matching Screen 1 & 4 */}
                {doc.status === 'Analyzed' && (
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 text-xs font-semibold rounded-full flex items-center gap-1.5 border border-emerald-100 dark:border-emerald-900/30">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    Analyzed
                  </span>
                )}
                {doc.status === 'Processing' && (
                  <span className="px-3 py-1 bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400 text-xs font-semibold rounded-full flex items-center gap-1.5 border border-amber-100 dark:border-amber-900/30">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                    Processing
                  </span>
                )}
                {doc.status === 'Action Required' && (
                  <span className="px-3 py-1 bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 text-xs font-semibold rounded-full flex items-center gap-1.5 border border-rose-100 dark:border-rose-900/30">
                    <span className="w-1.5 h-1.5 bg-rose-500 rounded-full"></span>
                    Action Required
                  </span>
                )}
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic AI Legal Recommendation Insight card */}
      <section className="mt-8">
        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-slate-900 dark:to-slate-900/40 p-6 rounded-2xl relative overflow-hidden border border-indigo-100/30 dark:border-slate-800">
          <div className="absolute top-0 right-0 p-6 opacity-5 dark:opacity-10 pointer-events-none">
            <Sparkles className="w-24 h-24 text-indigo-600" />
          </div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-400 font-semibold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>AI Legal Insight</span>
            </div>
            <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl font-medium">
              "Your recent TechCorp agreement contains a liability cap that is 20% lower than your typical firm standard. Review Clause 14.2."
            </p>
            <button
              onClick={onReviewInsight}
              className="inline-flex items-center gap-1 text-xs md:text-sm font-bold text-slate-950 dark:text-indigo-300 hover:gap-2 transition-all p-0"
            >
              <span>Review Discrepancy</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
