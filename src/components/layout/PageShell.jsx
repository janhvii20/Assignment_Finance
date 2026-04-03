export default function PageShell({ sidebar, topbar, children }) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 transition-colors duration-300 dark:bg-[#0b1220] dark:text-slate-100">
      <div className="mx-auto flex max-w-[1600px] gap-6 p-4 md:p-6">
        {sidebar}
        <div className="min-w-0 flex-1">
          {topbar}
          {children}
        </div>
      </div>
    </div>
  )
}