import { useMemo, useState } from 'react'
import { AlertTriangle, ArrowUpDown } from 'lucide-react'
import { ControversyType } from '../data/schema'
import { getControversyFeed, getFranchises } from '../data/selectors'

export default function DatabasePage() {
  const franchises = getFranchises()
  const [filters, setFilters] = useState({
    franchiseId: '',
    controversyType: '',
    rumorPolicy: 'show_labeled',
    sortBy: 'latest',
  })

  const rows = useMemo(() => getControversyFeed({
    ...filters,
    franchiseId: filters.franchiseId || undefined,
    controversyType: filters.controversyType || undefined,
  }), [filters])

  return (
    <div className="min-h-screen marble-bg">
      <div className="bg-gradient-to-b from-obsidian to-obsidian/95 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AlertTriangle className="w-8 h-8 text-gold mx-auto mb-4" />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">Controversy Database</h1>
          <p className="mt-3 text-sm sm:text-base text-white/40 max-w-lg mx-auto">
            Filter controversies by franchise, type, severity and status. Rumors are always labeled.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        <div className="bg-white border border-gold/10 rounded-2xl p-4 flex flex-wrap gap-3">
          <select value={filters.franchiseId} onChange={(event) => setFilters((prev) => ({ ...prev, franchiseId: event.target.value }))} className="px-3 py-2 rounded-lg border border-gold/20 text-sm">
            <option value="">All franchises</option>
            {franchises.map((franchise) => <option key={franchise.id} value={franchise.id}>{franchise.name}</option>)}
          </select>

          <select value={filters.controversyType} onChange={(event) => setFilters((prev) => ({ ...prev, controversyType: event.target.value }))} className="px-3 py-2 rounded-lg border border-gold/20 text-sm">
            <option value="">All types</option>
            {Object.values(ControversyType).map((type) => <option key={type} value={type}>{type}</option>)}
          </select>

          <select value={filters.sortBy} onChange={(event) => setFilters((prev) => ({ ...prev, sortBy: event.target.value }))} className="px-3 py-2 rounded-lg border border-gold/20 text-sm">
            <option value="latest">Latest</option>
            <option value="severe">Most severe</option>
            <option value="ongoing">Ongoing first</option>
          </select>

          <label className="text-sm text-obsidian/60 inline-flex items-center gap-2">
            Show rumors
            <input
              type="checkbox"
              checked={filters.rumorPolicy === 'show_labeled'}
              onChange={(event) => setFilters((prev) => ({ ...prev, rumorPolicy: event.target.checked ? 'show_labeled' : 'hide' }))}
            />
          </label>
        </div>

        <div className="text-xs text-obsidian/40 inline-flex items-center gap-1">
          <ArrowUpDown className="w-3.5 h-3.5" />
          {rows.length} records
        </div>

        <div className="space-y-3">
          {rows.map((item) => (
            <article key={item.id} className="bg-white border border-gold/10 rounded-xl p-4">
              <div className="flex flex-wrap justify-between gap-2">
                <div>
                  <p className="font-semibold text-obsidian">{item.title}</p>
                  <p className="text-xs text-obsidian/40 mt-1">{item.person?.displayName} • {item.startYear}</p>
                </div>
                <div className="flex gap-2 text-[10px]">
                  <span className="px-2 py-1 rounded-full bg-marble text-obsidian/60">{item.type}</span>
                  <span className="px-2 py-1 rounded-full bg-marble text-obsidian/60">{item.status}</span>
                  <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700">{item.severity}/5</span>
                  {item.isRumor && <span className="px-2 py-1 rounded-full bg-red-100 text-red-700">rumor</span>}
                </div>
              </div>
              <p className="mt-2 text-sm text-obsidian/60">{item.summary}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.sources.map((source) => (
                  <a key={source.id} href={source.url} target="_blank" rel="noreferrer" className="text-[10px] px-2 py-1 rounded-full bg-marble text-obsidian/60 no-underline">
                    {source.publisher} ({source.reliabilityScore}/5)
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
