import { motion } from 'framer-motion'

export default function InsightCard({ title, value, subtext, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="rounded-[24px] border border-white/50 bg-white/80 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
    >
      <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
      <h4 className="mt-2 text-xl font-semibold">{value}</h4>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtext}</p>
    </motion.div>
  )
}