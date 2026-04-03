import { Wallet, TrendingUp, TrendingDown } from 'lucide-react'
import PageShell from '../components/layout/PageShell'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import SummaryCard from '../components/cards/SummaryCard'
import InsightCard from '../components/cards/InsightCard'
import BalanceTrendChart from '../components/charts/BalanceTrendChart'
import SpendingPieChart from '../components/charts/SpendingPieChart'
import FiltersBar from '../components/transactions/FiltersBar'
import TransactionTable from '../components/transactions/TransactionTable'
import AddTransactionModal from '../components/transactions/AddTransactionModal'
import { useDashboard } from '../context/DashboardContext'
import { formatCurrency } from '../utils/formatters'

export default function DashboardPage() {
  const { summary, categoryData, insights, trendData } = useDashboard()

  return (
    <PageShell sidebar={<Sidebar />} topbar={<Topbar />}>
      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <SummaryCard
            title="Total Balance"
            value={formatCurrency(summary.balance)}
            hint="Net value after all expenses"
            icon={<Wallet size={18} />}
            index={0}
          />
          <SummaryCard
            title="Income"
            value={formatCurrency(summary.income)}
            hint="Steady positive cash flow"
            icon={<TrendingUp size={18} />}
            index={1}
          />
          <SummaryCard
            title="Expenses"
            value={formatCurrency(summary.expenses)}
            hint="Monitor your spending habits"
            icon={<TrendingDown size={18} />}
            index={2}
          />
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
          <BalanceTrendChart data={trendData} />
          <SpendingPieChart data={categoryData} />
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <InsightCard
            title="Highest Spending Category"
            value={insights.topCategory}
            subtext={`${formatCurrency(insights.topCategoryAmount)} spent`}
            index={0}
          />
          <InsightCard
            title="Monthly Comparison"
            value={`${insights.monthlyChange}%`}
            subtext="Compared to previous month"
            index={1}
          />
          <InsightCard
            title="Total Transactions"
            value={String(insights.transactionCount)}
            subtext="Across all tracked records"
            index={2}
          />
        </section>

        <section>
          <FiltersBar />
          <TransactionTable />
        </section>
      </div>

      <AddTransactionModal />
    </PageShell>
  )
}