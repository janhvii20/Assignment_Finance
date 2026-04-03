import { motion } from 'framer-motion'
import { useDashboard } from '../../context/DashboardContext'
import { formatCurrency, formatDate } from '../../utils/formatters'
import EmptyState from '../common/EmptyState'

export default function TransactionTable() {
  const { filteredTransactions, role } = useDashboard()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[28px] border border-white/50 bg-white/80 p-5 shadow-lg shadow-slate-200/60 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Transactions</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Search, filter and monitor financial activity
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium dark:bg-white/10">
          Role: {role}
        </span>
      </div>

      {filteredTransactions.length === 0 ? (
        <EmptyState
          title="No transactions found"
          subtitle="Try changing the filters or add a new transaction as admin."
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
                <th className="py-3">Title</th>
                <th className="py-3">Date</th>
                <th className="py-3">Category</th>
                <th className="py-3">Type</th>
                <th className="py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-b border-slate-100 text-sm last:border-none dark:border-white/5"
                >
                  <td className="py-4 font-medium">{item.title}</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">{formatDate(item.date)}</td>
                  <td className="py-4">{item.category}</td>
                  <td className="py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.type === 'income'
                          ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400'
                          : 'bg-rose-100 text-rose-600 dark:bg-rose-500/15 dark:text-rose-400'
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td
                    className={`py-4 text-right font-semibold ${
                      item.type === 'income' ? 'text-emerald-500' : 'text-rose-500'
                    }`}
                  >
                    {item.type === 'income' ? '+' : '-'} {formatCurrency(item.amount)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}