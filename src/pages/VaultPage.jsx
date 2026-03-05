import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Filter, Heart, Search, Sparkles } from 'lucide-react'
import { CastStatus, ControversyStatus, ControversyType, RoleType } from '../data/schema'
import { getFranchises, searchPeople } from '../data/selectors'

const roleLabels = {
  [RoleType.FULL_TIME]: 'Full-Time',
  [RoleType.FRIEND_OF]: 'Friend Of',
  [RoleType.GUEST]: 'Guest',
  [RoleType.SPOUSE_PARTNER]: 'Spouse/Partner',
}

const castStatusLabels = {
  [CastStatus.CURRENT]: 'Current',
  [CastStatus.ALUM]: 'Alum',
  [CastStatus.PAUSED]: 'Paused',
}

export default function VaultPage() {
  const franchises = getFranchises()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({
    franchiseId: '',
    roleType: '',
    castStatus: '',
    hasNotableSpouse: false,
    controversyType: '',
    controversyStatus: '',
    minSeverity: '',
    rumorPolicy: 'show_labeled',
  })

  const people = useMemo(
    () => searchPeople(query, {
      ...filters,
      franchiseId: filters.franchiseId || undefined,
      roleType: filters.roleType || undefined,
      castStatus: filters.castStatus || undefined,
      controversyType: filters.controversyType || undefined,
      controversyStatus: filters.controversyStatus || undefined,
      minSeverity: filters.minSeverity ? Number(filters.minSeverity) : undefined,
    }),
    [query, filters]
  )

  return (
    <div className="min-h-screen marble-bg">
      <div className="bg-gradient-to-b from-obsidian to-obsidian/95 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Sparkles className="w-8 h-8 text-gold mx-auto mb-4" />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">Knowledge Vault</h1>
          <p className="mt-3 text-sm sm:text-base text-white/45 max-w-2xl mx-auto">
            Main cast, side cast, notable spouses, and sourced controversies across Bravo core franchises.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 grid lg:grid-cols-[300px_1fr] gap-6">
        <aside className="bg-white rounded-2xl border border-gold/10 p-5 space-y-4 h-fit">
          <h2 className="font-display text-lg flex items-center gap-2 text-obsidian">
            <Filter className="w-4 h-4 text-gold" />
            Filters
          </h2>

          <label className="block">
            <span className="text-xs text-obsidian/50">Search</span>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-obsidian/30" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Name, alias, franchise..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gold/20 text-sm"
              />
            </div>
          </label>

          <Select
            label="Franchise"
            value={filters.franchiseId}
            onChange={(franchiseId) => setFilters((prev) => ({ ...prev, franchiseId }))}
            options={franchises.map((franchise) => ({ label: franchise.name, value: franchise.id }))}
          />

          <Select
            label="Role"
            value={filters.roleType}
            onChange={(roleType) => setFilters((prev) => ({ ...prev, roleType }))}
            options={Object.entries(roleLabels).map(([value, label]) => ({ value, label }))}
          />

          <Select
            label="Cast Status"
            value={filters.castStatus}
            onChange={(castStatus) => setFilters((prev) => ({ ...prev, castStatus }))}
            options={Object.entries(castStatusLabels).map(([value, label]) => ({ value, label }))}
          />

          <Select
            label="Controversy Type"
            value={filters.controversyType}
            onChange={(controversyType) => setFilters((prev) => ({ ...prev, controversyType }))}
            options={Object.values(ControversyType).map((value) => ({ value, label: value.replace('_', ' ') }))}
          />

          <Select
            label="Controversy Status"
            value={filters.controversyStatus}
            onChange={(controversyStatus) => setFilters((prev) => ({ ...prev, controversyStatus }))}
            options={Object.values(ControversyStatus).map((value) => ({ value, label: value }))}
          />

          <Select
            label="Min Severity"
            value={filters.minSeverity}
            onChange={(minSeverity) => setFilters((prev) => ({ ...prev, minSeverity }))}
            options={[1, 2, 3, 4, 5].map((value) => ({ value: String(value), label: `${value}+` }))}
          />

          <label className="flex items-center justify-between text-sm text-obsidian/70">
            Notable spouse only
            <input
              type="checkbox"
              checked={filters.hasNotableSpouse}
              onChange={(event) => setFilters((prev) => ({ ...prev, hasNotableSpouse: event.target.checked }))}
            />
          </label>

          <label className="flex items-center justify-between text-sm text-obsidian/70">
            Show labeled rumors
            <input
              type="checkbox"
              checked={filters.rumorPolicy === 'show_labeled'}
              onChange={(event) => setFilters((prev) => ({ ...prev, rumorPolicy: event.target.checked ? 'show_labeled' : 'hide' }))}
            />
          </label>
        </aside>

        <section>
          <p className="text-xs text-obsidian/40 mb-4">
            {people.length} profiles matched
          </p>

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {people.map((person) => (
              <Link
                key={person.id}
                to={`/housewife/${person.id}`}
                className="bg-white rounded-2xl border border-gold/10 p-4 no-underline hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-base font-display text-obsidian">{person.displayName}</p>
                    <p className="text-xs text-obsidian/45 mt-0.5">{person.bioShort}</p>
                  </div>
                  <span className="text-[10px] px-2 py-1 rounded-full bg-gold/10 text-gold-dark">
                    {roleLabels[person.currentRoleType]}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-[10px]">
                  <span className="px-2 py-1 rounded-full bg-marble text-obsidian/60">{castStatusLabels[person.castStatus]}</span>
                  <span className="px-2 py-1 rounded-full bg-marble text-obsidian/60">{person.controversyCount} controversies</span>
                  {person.notableSpouseCount > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-rose-light/50 text-rose">
                      <Heart className="w-3 h-3" />
                      notable spouse
                    </span>
                  )}
                </div>

                {person.controversyCount > 0 && (
                  <div className="mt-3 text-xs text-obsidian/50 inline-flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    Includes sourced controversy records
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function Select({ label, value, options, onChange }) {
  return (
    <label className="block">
      <span className="text-xs text-obsidian/50">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-1 w-full px-3 py-2.5 rounded-xl border border-gold/20 text-sm"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
