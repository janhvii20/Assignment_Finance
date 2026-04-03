import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { initialTransactions, trendData } from '../data/mockData'
import { calculateSummary, getCategoryBreakdown, getInsights } from '../utils/helpers'

const DashboardContext = createContext(null)

const getStored = (key, fallback) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : fallback
}

export function DashboardProvider({ children }) {
  const [transactions, setTransactions] = useState(() => getStored('fd_transactions', initialTransactions))
  const [role, setRole] = useState(() => localStorage.getItem('fd_role') || 'admin')
  const [darkMode, setDarkMode] = useState(() => getStored('fd_dark_mode', true))
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('fd_transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('fd_role', role)
  }, [role])

  useEffect(() => {
    localStorage.setItem('fd_dark_mode', JSON.stringify(darkMode))
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const categories = useMemo(() => {
    return ['all', ...new Set(transactions.map((t) => t.category))]
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    const result = transactions.filter((t) => {
      const matchesSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase())
      const matchesType = typeFilter === 'all' || t.type === typeFilter
      const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter
      return matchesSearch && matchesType && matchesCategory
    })

    switch (sortBy) {
      case 'amount-high':
        return [...result].sort((a, b) => b.amount - a.amount)
      case 'amount-low':
        return [...result].sort((a, b) => a.amount - b.amount)
      case 'oldest':
        return [...result].sort((a, b) => new Date(a.date) - new Date(b.date))
      default:
        return [...result].sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  }, [transactions, search, typeFilter, categoryFilter, sortBy])

  const summary = useMemo(() => calculateSummary(transactions), [transactions])
  const categoryData = useMemo(() => getCategoryBreakdown(transactions), [transactions])
  const insights = useMemo(() => getInsights(transactions), [transactions])

  const addTransaction = (newTransaction) => {
    setTransactions((prev) => [
      { id: Date.now(), ...newTransaction, amount: Number(newTransaction.amount) },
      ...prev,
    ])
  }

  return (
    <DashboardContext.Provider
      value={{
        filteredTransactions,
        summary,
        categoryData,
        insights,
        trendData,
        role,
        setRole,
        darkMode,
        setDarkMode,
        search,
        setSearch,
        typeFilter,
        setTypeFilter,
        categoryFilter,
        setCategoryFilter,
        sortBy,
        setSortBy,
        categories,
        addTransaction,
        isModalOpen,
        setIsModalOpen,
      }}
    >
      {children}
    </DashboardContext.Provider>
  )
}

export const useDashboard = () => useContext(DashboardContext)