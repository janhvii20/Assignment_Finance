export function getCategoryBreakdown(transactions) {
  const expenses = transactions.filter((item) => item.type === 'expense')
  const grouped = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount
    return acc
  }, {})

  return Object.entries(grouped).map(([name, value]) => ({ name, value }))
}

export function calculateSummary(transactions) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    income,
    expenses,
    balance: income - expenses,
  }
}

export function getInsights(transactions) {
  const expenses = transactions.filter((t) => t.type === 'expense')
  const grouped = expenses.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount
    return acc
  }, {})

  const highest = Object.entries(grouped).sort((a, b) => b[1] - a[1])[0]

  const thisMonth = transactions
    .filter((t) => t.date.startsWith('2026-03'))
    .reduce((sum, t) => sum + (t.type === 'expense' ? t.amount : 0), 0)

  const prevMonth = 18800

  return {
    topCategory: highest ? highest[0] : 'N/A',
    topCategoryAmount: highest ? highest[1] : 0,
    monthlyChange: prevMonth ? (((thisMonth - prevMonth) / prevMonth) * 100).toFixed(1) : 0,
    transactionCount: transactions.length,
  }
}