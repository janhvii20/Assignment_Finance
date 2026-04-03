import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useDashboard } from '../../context/DashboardContext'

export default function AddTransactionModal() {
  const { isModalOpen, setIsModalOpen, addTransaction } = useDashboard()
  const [form, setForm] = useState({
    title: '',
    amount: '',
    category: 'Food',
    type: 'expense',
    date: '2026-03-30',
  })

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.amount || !form.date) return
    addTransaction(form)
    setForm({
      title: '',
      amount: '',
      category: 'Food',
      type: 'expense',
      date: '2026-03-30',
    })
    setIsModalOpen(false)
  }

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            className="w-full max-w-lg rounded-[28px] border border-white/10 bg-white p-6 shadow-2xl dark:bg-[#101827]"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Add Transaction</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm dark:bg-white/10"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-white/10 dark:bg-slate-900/50"
              />

              <input
                name="amount"
                type="number"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-white/10 dark:bg-slate-900/50"
              />

              <div className="grid gap-4 md:grid-cols-3">
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-white/10 dark:bg-slate-900/50"
                >
                  <option>Food</option>
                  <option>Shopping</option>
                  <option>Transport</option>
                  <option>Utilities</option>
                  <option>Salary</option>
                  <option>Freelance</option>
                  <option>Investment</option>
                  <option>Entertainment</option>
                  <option>Housing</option>
                </select>

                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-white/10 dark:bg-slate-900/50"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>

                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 px-4 py-3 outline-none dark:border-white/10 dark:bg-slate-900/50"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 font-medium text-white dark:bg-blue-600"
              >
                Save Transaction
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}