import React, { useMemo, useState } from "react";
import { Package, FileText, BarChart3 } from "lucide-react";
import ReceivedBottles from "./ReceivedBottles";
import InsertSales from "./InsertSales";
import SellingHistory from "./SellingHistory";

const sectionConfig = [
  {
    id: "received",
    label: "የተቀበሉ ቦታሎች",
    description: "ከመደብሩ የተቀበሉትን የውሃ ቦታሎች ይቆጣጠሩ።",
    icon: Package,
    component: ReceivedBottles,
  },
  {
    id: "insert",
    label: "የሽያጭ መዝገብ",
    description: "አዲስ የሽያጭ ዝውውሮችን በፍጥነት ይመዝግቡ።",
    icon: FileText,
    component: InsertSales,
  },
  {
    id: "history",
    label: "የሽያጭ ታሪክ",
    description: "ሙሉ የሽያጭ ታሪክዎን ይመልከቱ እና ይዘምኑ።",
    icon: BarChart3,
    component: SellingHistory,
  },
];

function Salesperson() {
  const [activeSection, setActiveSection] = useState(sectionConfig[0].id);

  const activeMeta = useMemo(
    () => sectionConfig.find((section) => section.id === activeSection) ?? sectionConfig[0],
    [activeSection]
  );

  const ActiveSectionComponent = activeMeta.component;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Sales Dashboard
        </p>
        <div className="mt-3 space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">
            Manage daily activities
          </h1>
          <p className="text-sm text-slate-500">
            Select one of the workspaces below to keep every sales flow aligned with
            the rest of the system.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {sectionConfig.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveSection(id)}
              aria-pressed={activeSection === id}
              className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                activeSection === id
                  ? "border-blue-500 bg-blue-600 text-white shadow-lg"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-white hover:text-blue-700"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 border-b border-slate-100 pb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Current module
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-900">
            {activeMeta.label}
          </h2>
          <p className="text-sm text-slate-500">{activeMeta.description}</p>
        </div>
        <div
          key={activeSection}
          className="rounded-xl bg-slate-50/60 p-2 sm:p-4"
        >
          <ActiveSectionComponent />
        </div>
      </section>
    </div>
  );
}

export default Salesperson;
