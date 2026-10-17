import React from 'react';
import { ActivityLog, SupportedLanguage } from '../types/index';
import { PlusCircle, ShoppingBag, Search, AlertTriangle, CheckCircle2, DollarSign, History } from 'lucide-react';
import { TRANSLATIONS, getLocalizedActivityMessage } from '../services/translations';

interface ActivityFeedProps {
  activities: ActivityLog[];
  language: SupportedLanguage;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  language
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const aTrans = t.activity;

  // Format relative time
  const getRelativeTime = (timestamp: number) => {
    const diffSeconds = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSeconds < 60) {
      return aTrans.justNow;
    }
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      return `${diffMinutes} ${aTrans.minAgo}`;
    }
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours} ${aTrans.hrAgo}`;
    }
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} ${aTrans.daysAgo}`;
  };

  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'ADD_STOCK':
        return <PlusCircle className="w-4 h-4 text-blue-600" />;
      case 'SALE':
        return <ShoppingBag className="w-4 h-4 text-emerald-600" />;
      case 'CHECK_STOCK':
        return <Search className="w-4 h-4 text-slate-600" />;
      case 'CHECK_EARNINGS':
        return <DollarSign className="w-4 h-4 text-amber-600" />;
      case 'LOW_STOCK':
        return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-slate-600" />;
    }
  };

  const latestActivities = activities.slice(0, 10);

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-6 mb-6 select-none">
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center space-x-2">
            <History className="w-4 h-4 text-slate-600" />
            <span>{aTrans.title}</span>
          </h3>
          <p className="text-xs text-slate-400 font-semibold mt-0.5">
            {aTrans.subtitle}
          </p>
        </div>
        <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          {aTrans.liveLog}
        </span>
      </div>

      <div className="flow-root">
        <ul className="-mb-4">
          {latestActivities.length === 0 ? (
            <li className="py-8 text-center text-xs text-slate-400 font-bold">
              {aTrans.noActivity}
            </li>
          ) : (
            latestActivities.map((act, actIdx) => {
              const localizedMsg = getLocalizedActivityMessage(act, language);

              return (
                <li key={act.id}>
                  <div className="relative pb-4">
                    {actIdx !== latestActivities.length - 1 ? (
                      <span
                        className="absolute top-4 left-3.5 -ml-px h-full w-0.5 bg-slate-100"
                        aria-hidden="true"
                      />
                    ) : null}
                    <div className="relative flex items-start space-x-3">
                      <div className="relative px-0.5">
                        <div className="h-7 w-7 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shadow-2xs">
                          {getActivityIcon(act.type)}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1 flex justify-between space-x-2 pt-0.5">
                        <p className="text-xs font-bold text-slate-800 leading-snug">
                          {localizedMsg}
                        </p>
                        <span className="text-[10px] whitespace-nowrap text-slate-400 font-medium">
                          {getRelativeTime(act.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};
