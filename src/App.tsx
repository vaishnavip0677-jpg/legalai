import React, { useState } from 'react';
import Navigation from './components/Navigation';
import DashboardView from './components/DashboardView';
import MyDocsView from './components/MyDocsView';
import DocumentUploadView from './components/DocumentUploadView';
import DocumentAnalysisView from './components/DocumentAnalysisView';
import ChatView from './components/ChatView';
import AlertsView from './components/AlertsView';
import ProfileView from './components/ProfileView';

import { INITIAL_DOCUMENTS, INITIAL_REPORTS, INITIAL_ALERTS } from './data';
import { LegalDocument, DocumentAnalysisReport, LegalAlert } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, X } from 'lucide-react';

export default function App() {
  const [tab, setTab] = useState<'home' | 'docs' | 'alerts' | 'profile' | 'upload'>('home');
  const [documents, setDocuments] = useState<LegalDocument[]>(INITIAL_DOCUMENTS);
  const [reports, setReports] = useState<Record<string, DocumentAnalysisReport>>(INITIAL_REPORTS);
  const [alerts, setAlerts] = useState<LegalAlert[]>(INITIAL_ALERTS);

  const [selectedDocument, setSelectedDocument] = useState<LegalDocument | null>(null);
  const [showChatDrawer, setShowChatDrawer] = useState(false);

  // When a new document is uploaded & dynamically analyzed
  const handleAnalysisComplete = (newDoc: LegalDocument, newReport: DocumentAnalysisReport) => {
    setDocuments((prev) => [newDoc, ...prev]);
    setReports((prev) => ({ ...prev, [newDoc.id]: newReport }));
    setSelectedDocument(newDoc);
    setTab('docs');
  };

  const handleSelectDocument = (doc: LegalDocument) => {
    setSelectedDocument(doc);
    setTab('docs');
  };

  const handleReviewTrigger = (alertId: string) => {
    // Select MSA document as first match or doc 2 for the review
    const targetDoc = documents.find((d) => d.id === 'doc-1') || documents[0];
    if (targetDoc) {
      setSelectedDocument(targetDoc);
      setTab('docs');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 font-sans transition-colors duration-300">
      
      {/* Universal Sticky Top Bar & Side Bars */}
      <Navigation currentTab={tab} setTab={(newTab) => {
        setTab(newTab);
        // Clear selected doc on other non-doc clicks
        if (newTab !== 'docs') {
          setSelectedDocument(null);
        }
      }} />

      {/* Main Content Arena with dynamic margins for sidebar offset on desktops */}
      <div className="pt-20 pb-24 md:pb-12 md:pl-64 min-h-screen w-full">
        <main className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto space-y-6">
          <AnimatePresence mode="wait">
            {tab === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                <DashboardView
                  documents={documents}
                  onSelectDocument={handleSelectDocument}
                  onStartAnalysis={() => setTab('upload')}
                  onReviewInsight={() => {
                    const firstDoc = documents.find((d) => d.status === 'Analyzed');
                    if (firstDoc) {
                      setSelectedDocument(firstDoc);
                    }
                    setTab('docs');
                  }}
                />
              </motion.div>
            )}

            {tab === 'docs' && (
              <motion.div
                key="docs"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {selectedDocument ? (
                  <div className="space-y-4">
                    {/* Back Button */}
                    <button
                      onClick={() => setSelectedDocument(null)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 cursor-pointer p-1 rounded-lg"
                    >
                      ← Back to Document Library
                    </button>
                    
                    <DocumentAnalysisView
                      document={selectedDocument}
                      report={reports[selectedDocument.id] || reports['doc-1']}
                      onOpenChat={() => setShowChatDrawer(true)}
                      onApprove={() => {
                        // Mark as Analyzed and update state
                        setDocuments((prev) =>
                          prev.map((d) => (d.id === selectedDocument.id ? { ...d, status: 'Analyzed' } : d))
                        );
                        alert(`Agreement "${selectedDocument.name}" has been approved for internal routing!`);
                      }}
                    />
                  </div>
                ) : (
                  <MyDocsView
                    documents={documents}
                    onSelectDocument={handleSelectDocument}
                    onNewUpload={() => setTab('upload')}
                  />
                )}
              </motion.div>
            )}

            {tab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <DocumentUploadView
                  onAnalysisComplete={handleAnalysisComplete}
                  setTab={setTab}
                />
              </motion.div>
            )}

            {tab === 'alerts' && (
              <motion.div
                key="alerts"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <AlertsView
                  alerts={alerts}
                  onReviewAlert={handleReviewTrigger}
                />
              </motion.div>
            )}

            {tab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <ProfileView
                  onSignOut={() => {
                    alert('Signing out from Lumina Lex instance... Redirecting to splash.');
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Slide-out Interactive Instant AI Assistant Chat Drawer (Overlay) */}
      <AnimatePresence>
        {showChatDrawer && (
          <>
            {/* Backdrop click barrier */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChatDrawer(false)}
              className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
            />

            {/* Sliding Chat Drawer Node */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-full sm:w-[460px] md:w-[500px] bg-white dark:bg-slate-950 shadow-2xl z-[60] flex flex-col"
            >
              <div className="absolute top-4 left-4 z-10">
                <button
                  onClick={() => setShowChatDrawer(false)}
                  className="bg-slate-900 border border-slate-700 hover:bg-rose-600 text-white p-2 rounded-full shadow-lg transition-colors cursor-pointer"
                  title="Close Assistant Panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pad top to clear the closed controller */}
              <div className="flex-grow h-full pt-14">
                <ChatView selectedDocument={selectedDocument} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Float Chat bubble button in case no document index triggers it */}
      {!selectedDocument && tab !== 'profile' && (
        <div className="fixed bottom-24 right-5 sm:bottom-12 sm:right-12 z-30">
          <button
            onClick={() => setShowChatDrawer(true)}
            className="w-14 h-14 rounded-full bg-slate-900 hover:bg-indigo-600 text-white shrink shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative border border-slate-850"
            title="Ask LegalAI anything"
          >
            <MessageSquare className="w-6 h-6 stroke-[1.8px] fill-indigo-200 text-white" />
          </button>
        </div>
      )}

    </div>
  );
}
