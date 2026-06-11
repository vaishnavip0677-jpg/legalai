import React from 'react';
import { Lock, CreditCard, Bell, Globe, BookOpen, ShieldAlert, LogOut, CheckCircle, Edit, ExternalLink, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileViewProps {
  onSignOut: () => void;
}

export default function ProfileView({ onSignOut }: ProfileViewProps) {
  return (
    <div className="space-y-6 max-w-2xl mx-auto pb-12 animate-fade-in text-slate-800 dark:text-slate-100">
      
      {/* Hero Profile Card matching Screen 6 exactly */}
      <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="relative group shrink-0">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUJlcBgQ1UeSnDOSATfqyjo-86p69cZcLizdgFKKKQ15MATCJSw_vj1IwQ48XVk0ODcqgKi3DcToNee-kPv641wx4hEhQPRWSaf-_F3sq6qV6njLJFBZ2NULiSqgYDAkWhRAX6ckIKeB9iIQYvDdCACrv2dRWTf62w14daO1Ss1IxJNdl3SxRVAzYDFgZTovFqcnGACu7Daq6RcZMynDCCDQ0U0ssFpOHHG9VlD1cE0f_FDhmuo4mjio6BvhxrSV4M9xlDhOw2h3k0"
            alt="Julian Vance Avatar Headshot"
            className="w-24 h-24 rounded-full border-2 border-indigo-150 p-1 bg-slate-50 dark:border-slate-800"
            referrerPolicy="no-referrer"
          />
          <button
            onClick={() => alert('Launching local profile photo editor...')}
            className="absolute bottom-0 right-0 bg-slate-900 hover:bg-indigo-600 text-white p-2 rounded-full shadow-md border-2 border-white dark:border-slate-900 transition-transform hover:scale-105 active:scale-95"
            aria-label="Edit Profile Photo"
          >
            <Edit className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="text-center md:text-left flex-1 space-y-2">
          <h2 className="font-display-lg text-lg md:text-xl font-bold text-slate-950 dark:text-white">
            Julian Vance
          </h2>
          <p className="text-xs md:text-sm text-slate-500">Senior Legal Counsel</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-1.5 pt-1">
            <span className="bg-teal-50 text-teal-800 border border-teal-100 dark:bg-teal-950/20 dark:border-teal-900/30 dark:text-teal-400 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 leading-none select-none">
              <CheckCircle className="w-3 h-3 text-teal-650" />
              <span>Professional Plan</span>
            </span>
            <span className="bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-full leading-none select-none">
              ID: LL-99234
            </span>
          </div>
        </div>

        <button
          onClick={() => alert('Redirecting to your legal public credential page...')}
          className="bg-slate-950 text-white dark:bg-indigo-600 hover:bg-indigo-600 hover:text-white transition-all px-4 py-3 rounded-xl font-bold text-xs tracking-wide cursor-pointer w-full md:w-auto shadow-xs active:scale-[0.985]"
        >
          View Public Profile
        </button>
      </section>

      {/* Grouped Settings Panels list exactly matching Screen 6 */}
      <div className="space-y-6">
        
        {/* Account Section */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Account & Security</h3>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            <div
              onClick={() => alert('Accessing Two-Factor authentication settings...')}
              className="flex items-center justify-between p-4 hover:bg-slate-50 hover:dark:bg-slate-950 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-850 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <Lock className="w-5 h-5 stroke-[1.8px]" />
                </div>
                <div>
                  <p className="font-semibold text-xs md:text-sm text-slate-900 dark:text-white">Security & Password</p>
                  <p className="text-[10px] text-slate-400 mt-1">2FA enabled · Last changed 2m ago</p>
                </div>
              </div>
              <ChevronRightIcon />
            </div>

            <div
              onClick={() => alert('Redirecting to stripe checkout portal...')}
              className="flex items-center justify-between p-4 hover:bg-slate-50 hover:dark:bg-slate-950 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-850 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <CreditCard className="w-5 h-5 stroke-[1.8px]" />
                </div>
                <div>
                  <p className="font-semibold text-xs md:text-sm text-slate-900 dark:text-white">Subscription & Billing</p>
                  <p className="text-[10px] text-slate-400 mt-1">Professional Monthly · Next bill Oct 12</p>
                </div>
              </div>
              <ChevronRightIcon />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Preferences</h3>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            <div
              onClick={() => alert('Accessing smart notifications router...')}
              className="flex items-center justify-between p-4 hover:bg-slate-50 hover:dark:bg-slate-950 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-850 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <Bell className="w-5 h-5 stroke-[1.8px]" />
                </div>
                <div>
                  <p className="font-semibold text-xs md:text-sm text-slate-900 dark:text-white">Notifications</p>
                  <p className="text-[10px] text-slate-400 mt-1">Push, Email, and Slack integrations</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white dark:bg-indigo-650 px-2.5 py-1 rounded">
                  Smart Alerts On
                </span>
                <ChevronRightIcon />
              </div>
            </div>

            <div
              onClick={() => alert('Accessing language locale translator...')}
              className="flex items-center justify-between p-4 hover:bg-slate-50 hover:dark:bg-slate-950 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-850 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <Globe className="w-5 h-5 stroke-[1.8px]" />
                </div>
                <div>
                  <p className="font-semibold text-xs md:text-sm text-slate-900 dark:text-white">Language & Region</p>
                  <p className="text-[10px] text-slate-400 mt-1">English (US) · UTC-5 (EST)</p>
                </div>
              </div>
              <ChevronRightIcon />
            </div>
          </div>
        </div>

        {/* Legal Resources Section */}
        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Legal Resources</h3>
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-100 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
            <div
              onClick={() => alert('Opening template repository with 2,400+ contracts...')}
              className="flex items-center justify-between p-4 hover:bg-slate-50 hover:dark:bg-slate-950 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-850 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <BookOpen className="w-5 h-5 stroke-[1.8px]" />
                </div>
                <div>
                  <p className="font-semibold text-xs md:text-sm text-slate-900 dark:text-white">Template Library</p>
                  <p className="text-[10px] text-slate-400 mt-1">Access 2,400+ verified legal documents</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
            </div>

            <div
              onClick={() => alert('Connecting 24/7 dedicated support priority line...')}
              className="flex items-center justify-between p-4 hover:bg-slate-50 hover:dark:bg-slate-950 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-850 flex items-center justify-center text-slate-700 dark:text-slate-300">
                  <HelpCircle className="w-5 h-5 stroke-[1.8px]" />
                </div>
                <div>
                  <p className="font-semibold text-xs md:text-sm text-slate-900 dark:text-white">Concierge Support</p>
                  <p className="text-[10px] text-slate-400 mt-1">Priority 24/7 legal tech assistance</p>
                </div>
              </div>
              <ChevronRightIcon />
            </div>
          </div>
        </div>

      </div>

      {/* Logout button danger zone matches Screen 6 exactly */}
      <div className="py-6 space-y-4">
        <button
          onClick={onSignOut}
          className="w-full flex items-center justify-center gap-2.5 bg-white text-rose-600 border border-rose-100 hover:bg-rose-50/50 hover:border-rose-300 px-6 py-4 rounded-2xl font-bold shadow-xs active:scale-[0.99] transition-all cursor-pointer dark:bg-slate-900 dark:border-rose-950/20"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out of Lumina Lex</span>
        </button>
        <p className="text-center text-[10px] tracking-wide text-slate-400 font-semibold select-none">
          Lumina Lex v4.2.1-stable • Trusted by 500+ law firms globally
        </p>
      </div>

    </div>
  );
}

// Minimal reusable caret right indicator icon matching designs exactly
function ChevronRightIcon() {
  return (
    <svg
      className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}
