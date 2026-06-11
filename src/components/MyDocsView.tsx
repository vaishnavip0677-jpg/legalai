import React, { useState } from 'react';
import { Search, Plus, FileText, FileCheck, ArrowUpRight, AlertTriangle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { LegalDocument } from '../types';

interface MyDocsViewProps {
  documents: LegalDocument[];
  onSelectDocument: (doc: LegalDocument) => void;
  onNewUpload: () => void;
}

type CategoryFilter = 'All' | 'Recent' | 'Shared' | 'Templates' | 'Archived';

export default function MyDocsView({ documents, onSelectDocument, onNewUpload }: MyDocsViewProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: CategoryFilter[] = ['All', 'Recent', 'Shared', 'Templates', 'Archived'];

  // Filter logic based on category and query string
  const filteredDocs = documents.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeCategory === 'All') return matchesSearch;
    if (activeCategory === 'Recent') return matchesSearch && doc.isRecent;
    if (activeCategory === 'Shared') return matchesSearch && doc.id === 'doc-3'; // Mock categories
    if (activeCategory === 'Templates') return matchesSearch && doc.id === 'doc-4';
    return matchesSearch;
  });

  return (
    <div className="space-y-6 relative pb-28 animate-fade-in text-slate-800 dark:text-slate-100">
      {/* Search Input Bar */}
      <section className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search legal documents..."
          className="block w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl font-medium text-sm transition-all shadow-sm dark:bg-slate-900 dark:border-slate-800 dark:text-white"
        />
      </section>

      {/* Horizontal Category Chips */}
      <section className="overflow-x-auto scrollbar-none flex gap-2 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full font-semibold text-xs transition-all whitespace-nowrap active:scale-95 ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-indigo-600 dark:text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </section>

      {/* Document Library Section */}
      <section className="space-y-4">
        <div>
          <h2 className="font-display-lg text-lg md:text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-1">
            Library
          </h2>
          <p className="text-xs text-slate-400">Manage, inspect and audit your current document vault.</p>
        </div>

        {filteredDocs.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 border border-slate-100 dark:border-slate-800 text-center space-y-4">
            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-slate-700 dark:text-slate-300">No documents found</p>
              <p className="text-slate-400 text-xs">Try adjusting your filters or upload a new file.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3.5">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => onSelectDocument(doc)}
                className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-xs border border-slate-100 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-400 transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                    <FileText className="w-6 h-6 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base group-hover:text-indigo-600 dark:group-hover:text-indigo-450 transition-colors">
                      {doc.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400">
                      <span>{doc.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800"></span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 border-slate-50 pt-2.5 sm:pt-0">
                  <span className="text-[10px] text-slate-400 sm:hidden">Swipe details</span>

                  {/* Status Badges exactly aligning with Screen 1 */}
                  <div className="flex items-center gap-2">
                    {doc.status === 'Analyzed' && (
                      <div className="bg-teal-50/80 text-teal-700 px-3 py-1 rounded-full flex items-center gap-1 border border-teal-100 text-[11px] font-semibold tracking-wide dark:bg-teal-950/20 dark:text-teal-400 dark:border-teal-900/30">
                        <FileCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                        <span>Analyzed</span>
                      </div>
                    )}
                    {doc.status === 'Action Required' && (
                      <div className="bg-rose-50/80 text-rose-700 px-3 py-1 rounded-full flex items-center gap-1 border border-rose-100 text-[11px] font-semibold tracking-wide dark:bg-rose-950/20 dark:text-rose-450 dark:border-rose-900/30">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                        <span>Action Required</span>
                      </div>
                    )}
                    {doc.status === 'Processing' && (
                      <div className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full flex items-center gap-1 border border-slate-250 text-[11px] font-semibold tracking-wide dark:bg-slate-800 dark:text-slate-400">
                        <RefreshCw className="w-3 h-3 text-slate-400 animate-spin" />
                        <span>Processing</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Floating Action Button (FAB) Bottom Right for Mobile/Desktop */}
      <button
        onClick={onNewUpload}
        className="fixed bottom-24 right-6 bg-slate-900 hover:bg-indigo-600 hover:scale-105 active:scale-95 text-white px-5 py-4 rounded-2xl shadow-xl flex items-center gap-2 transition-all duration-300 z-40 border border-slate-800"
      >
        <Plus className="w-5 h-5" />
        <span className="font-bold text-sm">New Upload</span>
      </button>
    </div>
  );
}
