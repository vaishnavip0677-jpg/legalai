import React from 'react';
import { AlertCircle, AlertTriangle, Info, Bell, CheckCircle, MoreVertical, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { LegalAlert } from '../types';

interface AlertsViewProps {
  alerts: LegalAlert[];
  onReviewAlert: (alertId: string) => void;
}

export default function AlertsView({ alerts, onReviewAlert }: AlertsViewProps) {
  return (
    <div className="space-y-6 animate-fade-in text-slate-800 dark:text-slate-100 max-w-2xl mx-auto pb-12">
      {/* Screen Header */}
      <section className="space-y-1.5">
        <h2 className="font-display-lg text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          Alerts Center
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
          Real-time AI compliance monitoring and exposure alerts for your legal portfolio.
        </p>
      </section>

      {/* Alerts list matching Screen 7 */}
      <div className="flex flex-col gap-4">
        {alerts.map((alert) => {
          const isHigh = alert.priority === 'high';
          const isMed = alert.priority === 'medium';
          
          let alertBorderClass = 'border-slate-350 dark:border-slate-800';
          let borderHighlightCol = 'w-1.5 bg-slate-300';
          let pillCol = 'bg-slate-100/80 text-slate-700 dark:bg-slate-850 dark:text-slate-300';

          if (isHigh) {
            alertBorderClass = 'border-rose-100 dark:border-rose-950/20';
            borderHighlightCol = 'w-1.5 bg-rose-500';
            pillCol = 'bg-rose-50 text-rose-805 font-bold dark:bg-rose-950/35 dark:text-rose-300';
          } else if (isMed) {
            alertBorderClass = 'border-amber-100 dark:border-amber-950/20';
            borderHighlightCol = 'w-1.5 bg-amber-400';
            pillCol = 'bg-amber-50 text-amber-800 font-bold dark:bg-amber-950 dark:text-amber-400';
          }

          return (
            <div
              key={alert.id}
              className={`bg-white dark:bg-slate-900 hover:shadow-md transition-all rounded-max overflow-hidden flex shadow-xs border ${alertBorderClass}`}
            >
              {/* Vertical border stripe highlighting match */}
              <div className={borderHighlightCol} />

              <div className="p-5 flex-grow space-y-3.5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full ${pillCol}`}>
                      {alert.priority === 'high' ? 'High Priority' : alert.priority === 'medium' ? 'Medium' : 'Low'}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">{alert.time}</span>
                  </div>
                  <button className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm md:text-base">
                    {alert.title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                    {alert.description}
                  </p>
                </div>

                {/* Sub insight teal chip matching Screen 7 */}
                {alert.aiInsight && (
                  <div className="bg-teal-50 border border-teal-100 text-teal-800 dark:bg-teal-950/20 dark:border-teal-900/30 dark:text-teal-400 p-2.5 rounded-lg w-fit flex items-center gap-2 text-xs font-bold leading-none select-none">
                    <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 animate-pulse" />
                    <span>{alert.aiInsight}</span>
                  </div>
                )}

                <div className="flex justify-end pt-3 border-t border-slate-50 dark:border-slate-800/60">
                  <button
                    onClick={() => onReviewAlert(alert.id)}
                    className="bg-slate-900 hover:bg-indigo-600 hover:text-white dark:bg-slate-800 text-white font-bold text-xs rounded-xl px-5 py-2.5 cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    Review Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {/* Foot Compliance indicator matches Screen 7 */}
        <div className="py-8 text-center space-y-3">
          <div className="bg-emerald-50 dark:bg-emerald-950/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-emerald-500 border border-emerald-100 dark:border-emerald-900/30 shadow-inner">
            <CheckCircle className="w-6 h-6 stroke-[2px]" />
          </div>
          <p className="text-xs text-slate-400 font-semibold tracking-wide">
            All other documents are currently in compliance.
          </p>
        </div>
      </div>
    </div>
  );
}
