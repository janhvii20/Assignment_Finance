import { Search, MoonStar, SunMedium, Plus } from 'lucide-react'
import { useDashboard } from '../../context/DashboardContext'
import { motion } from 'framer-motion'

export default function Topbar() {
  const { role, setRole, darkMode, setDarkMode, search, setSearch, setIsModalOpen } = useDashboard()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-col gap-4 rounded-[28px] border border-white/50 bg-white/75 p-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-white/10 dark:bg-white/5 md:flex-row md:items-center md:justify-between"
    >
      <div>
        <h1 className="text-2xl font-semibold">Welcome back</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Track, manage and understand your finances beautifully.
        </p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-white/10 dark:bg-slate-900/50">
          <Search size={16} className="text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search transactions"
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400 md:w-52"
          />
        </div>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none dark:border-white/10 dark:bg-slate-900/50"
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="rounded-2xl border border-slate-200 bg-slate-50 p-2.5 transition hover:scale-105 dark:border-white/10 dark:bg-slate-900/50"
        >
          {darkMode ? <SunMedium size={18} /> : <MoonStar size={18} />}
        </button>

        {role === 'admin' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:bg-blue-600"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}
      </div>
    </motion.div>
  )
}