import React from 'react';
import StockkeeperPageCards from '../../component/StockkeeperPageCards'; 

const StockKeeperDashboard = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Stock Keeper Dashboard
        </p>
        <div className="mt-3 space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">Control inventory flows</h1>
          <p className="text-sm text-slate-500">
            Launch the action you need below to record received stock, distributions, and current balances in a single, consistent workspace.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <StockkeeperPageCards />
      </section>
    </div>
  );
};

export default StockKeeperDashboard;
 