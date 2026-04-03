export default function EmptyState({ title, subtitle }) {
  return (
    <div className="rounded-[24px] border border-dashed border-slate-300 p-8 text-center dark:border-white/10">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
    </div>
  )
}