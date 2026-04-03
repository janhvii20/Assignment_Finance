import { motion } from 'framer-motion'

export default function SummaryCard({ title, value, icon, hint, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="rounded-[28px] border border-white/50 bg-white/80 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-slate-500 dark:text-slate-400">{title}</span>
        <div className="rounded-2xl bg-slate-100 p-2 dark:bg-white/10">{icon}</div>
      </div>
      <h3 className="text-2xl font-semibold">{value}</h3>
      <p className="mt-2 text-sm text-emerald-500">{hint}</p>
    </motion.div>
  )
}