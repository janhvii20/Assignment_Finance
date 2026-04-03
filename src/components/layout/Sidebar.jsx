import { LayoutDashboard, ArrowLeftRight, Lightbulb, Settings, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

const items = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Transactions', icon: ArrowLeftRight },
  { label: 'Insights', icon: Lightbulb },
  { label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-4 hidden h-[calc(100vh-2rem)] w-72 shrink-0 rounded-[28px] border border-white/50 bg-white/75 p-5 shadow-xl shadow-slate-200/60 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-black/10 lg:block"
    >
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-500 text-white shadow-lg">
          <Crown size={22} />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Finora</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Finance Dashboard</p>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map(({ label, icon: Icon }, index) => (
          <motion.button
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
              label === 'Dashboard'
                ? 'bg-slate-900 text-white shadow-lg dark:bg-blue-600'
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10'
            }`}
          >
            <Icon size={18} />
            <span className="font-medium">{label}</span>
          </motion.button>
        ))}
      </nav>

      <div className="mt-8 rounded-[24px] bg-gradient-to-br from-blue-600 to-indigo-500 p-5 text-white">
        <p className="text-sm opacity-90">
          Upgrade your dashboard experience with polished analytics and better control.
        </p>
      </div>
    </motion.aside>
  )
}