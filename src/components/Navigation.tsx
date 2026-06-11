import React, { useState } from 'react';
import { Menu, Search, Bell, Home, FileText, AlertTriangle, User, LogOut, BookOpen, Settings, HelpCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavigationProps {
  currentTab: 'home' | 'docs' | 'alerts' | 'profile' | 'upload';
  setTab: (tab: 'home' | 'docs' | 'alerts' | 'profile' | 'upload') => void;
}

export default function Navigation({ currentTab, setTab }: NavigationProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'docs', label: 'My Docs', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  return (
    <>
      {/* Top Header App Bar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm h-16 border-b border-slate-100 dark:bg-slate-900 dark:border-slate-800 transition-colors">
        <div className="flex items-center justify-between px-6 h-full w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDrawer}
              id="header_menu_btn"
              className="hover:bg-slate-50 active:scale-95 transition-all p-2 rounded-full dark:hover:bg-slate-800"
              aria-label="Toggle Navigation Drawer"
            >
              <Menu className="w-6 h-6 text-slate-800 dark:text-slate-100" />
            </button>
            <h1 className="font-display-lg text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span className="text-indigo-600 dark:text-indigo-400">Lumina</span>Lex
              <span className="hidden sm:inline-block text-[10px] uppercase font-semibold tracking-wider bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 px-2 py-0.5 rounded">
                AI Legal Suite
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTab('docs')}
              className="hover:bg-slate-50 transition-colors active:scale-95 p-2 rounded-full dark:hover:bg-slate-800"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-slate-600 dark:text-slate-300" />
            </button>
            <button
              onClick={() => setTab('alerts')}
              className="relative hover:bg-slate-50 transition-colors active:scale-95 p-2 rounded-full dark:hover:bg-slate-800"
              aria-label="Alerts Center"
            >
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            </button>

            {/* User Profile Emblem */}
            <div
              onClick={() => setTab('profile')}
              className="w-9 h-9 rounded-full bg-indigo-900 border border-indigo-200 text-white flex items-center justify-center text-xs font-bold cursor-pointer hover:border-indigo-500 transition-all active:scale-95 shadow-sm"
              title="View Profile"
            >
              JV
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Persistent Left Sidebar Drawer */}
      <aside className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-slate-950 border-r border-slate-100 dark:border-slate-800 flex-col py-6 transition-colors shadow-sm">
        <div className="px-6 mb-8 flex flex-col gap-1">
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950/50 flex items-center justify-center mb-2">
            <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <p className="font-semibold text-slate-800 dark:text-slate-100">Julian Vance</p>
          <p className="text-xs text-slate-400 dark:text-slate-500">Senior Legal Counsel</p>
          <span className="w-fit text-[10px] font-semibold text-teal-600 bg-teal-50 dark:bg-teal-950/30 dark:text-teal-400 border border-teal-100 dark:border-teal-900 px-2.5 py-0.5 rounded-full mt-1.5">
            Professional Plan
          </span>
        </div>

        <nav className="flex flex-col gap-1 px-3 flex-grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={() => setTab('upload')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
              currentTab === 'upload'
                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'
            }`}
          >
            <FileText className="w-5 h-5 text-indigo-500" />
            <span>Upload Panel</span>
          </button>
        </nav>

        <div className="px-3 border-t border-slate-100 dark:border-slate-800 pt-4">
          <button
            onClick={() => setTab('profile')}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
        </div>
      </aside>

      {/* Overlay Drawer (For menu button click) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop click barrier */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={toggleDrawer}
              className="fixed inset-0 bg-black z-50 backdrop-blur-xs"
            />

            {/* Sliding Drawer Pane */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white dark:bg-slate-950 z-[60] p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                      JV
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-100">Julian Vance</h4>
                      <p className="text-xs text-slate-400">Senior Legal Counsel</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleDrawer}
                    className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-500" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setTab('home');
                      setIsDrawerOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all text-left"
                  >
                    <Home className="w-5 h-5 text-indigo-500" />
                    <span className="font-medium text-sm">Legal Dashboard</span>
                  </button>
                  <button
                    onClick={() => {
                      setTab('docs');
                      setIsDrawerOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all text-left"
                  >
                    <FileText className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium text-sm">My Document Library</span>
                  </button>
                  <button
                    onClick={() => {
                      setTab('alerts');
                      setIsDrawerOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all text-left"
                  >
                    <Bell className="w-5 h-5 text-amber-500" />
                    <span className="font-medium text-sm">Alerts & Exposures</span>
                  </button>
                  <button
                    onClick={() => {
                      setTab('upload');
                      setIsDrawerOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all text-left"
                  >
                    <Settings className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-sm">Contract Uploader</span>
                  </button>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setTab('profile');
                      setIsDrawerOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 transition-all"
                  >
                    <BookOpen className="w-5 h-5 text-cyan-500" />
                    <span className="font-medium text-sm">Template Resource Central</span>
                  </a>
                </nav>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                <button
                  onClick={() => {
                    setTab('profile');
                    setIsDrawerOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all font-medium text-sm text-left"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span>Concierge Helpdesk</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Sticky Bottom Navigation Bar (Hidden on Desktop) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-2xl border-t border-slate-200/80 h-16 dark:bg-slate-900 dark:border-slate-800 transition-colors">
        <div className="flex justify-around items-center h-full px-4 max-w-lg mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors min-w-[60px] ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 scale-105 font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'}`} />
                <span className="text-[10px] font-medium mt-1">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
