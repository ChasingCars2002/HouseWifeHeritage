import { Search, SlidersHorizontal, X } from 'lucide-react'
import { useState } from 'react'
import { cities, statuses, zodiacSigns } from '../data/housewives'

export default function SearchBar({ query, onQueryChange, filters, onFiltersChange }) {
  const [showFilters, setShowFilters] = useState(false)
  const hasActiveFilters = filters.city || filters.status || filters.zodiac

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Main search input */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gold/60 group-focus-within:text-gold transition-colors" />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search housewives, cities, taglines..."
          className="w-full pl-12 pr-24 py-4 bg-white rounded-2xl border border-gold/20 text-obsidian placeholder:text-obsidian/30 focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 text-sm sm:text-base font-sans shadow-sm transition-all"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {(query || hasActiveFilters) && (
            <button
              onClick={() => {
                onQueryChange('')
                onFiltersChange({ city: '', status: '', zodiac: '' })
              }}
              className="p-2 rounded-lg text-obsidian/40 hover:text-obsidian hover:bg-marble/50 bg-transparent border-none cursor-pointer transition-colors"
              title="Clear all"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-colors bg-transparent border-none cursor-pointer ${
              showFilters || hasActiveFilters
                ? 'text-gold bg-gold/10'
                : 'text-obsidian/40 hover:text-obsidian hover:bg-marble/50'
            }`}
            title="Toggle filters"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter dropdowns */}
      {showFilters && (
        <div className="mt-3 flex flex-wrap gap-3 animate-fade-in-up">
          <FilterSelect
            label="City"
            value={filters.city}
            options={cities}
            onChange={(city) => onFiltersChange({ ...filters, city })}
          />
          <FilterSelect
            label="Status"
            value={filters.status}
            options={statuses}
            onChange={(status) => onFiltersChange({ ...filters, status })}
          />
          <FilterSelect
            label="Zodiac"
            value={filters.zodiac}
            options={zodiacSigns}
            onChange={(zodiac) => onFiltersChange({ ...filters, zodiac })}
          />
        </div>
      )}

      {/* Active filter chips */}
      {hasActiveFilters && (
        <div className="mt-3 flex flex-wrap gap-2">
          {filters.city && (
            <FilterChip
              label={filters.city}
              onRemove={() => onFiltersChange({ ...filters, city: '' })}
            />
          )}
          {filters.status && (
            <FilterChip
              label={filters.status}
              onRemove={() => onFiltersChange({ ...filters, status: '' })}
            />
          )}
          {filters.zodiac && (
            <FilterChip
              label={filters.zodiac}
              onRemove={() => onFiltersChange({ ...filters, zodiac: '' })}
            />
          )}
        </div>
      )}
    </div>
  )
}

function FilterSelect({ label, value, options, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 min-w-[140px] px-3 py-2.5 bg-white rounded-xl border border-gold/20 text-sm text-obsidian focus:outline-none focus:border-gold/50 focus:ring-2 focus:ring-gold/10 cursor-pointer font-sans appearance-none"
      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' fill=\'%23C5A55A\' viewBox=\'0 0 16 16\'%3E%3Cpath d=\'M8 11L3 6h10l-5 5z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center' }}
    >
      <option value="">All {label}s</option>
      {options.map(opt => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  )
}

function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gold/10 text-gold-dark text-xs font-medium rounded-full">
      {label}
      <button
        onClick={onRemove}
        className="p-0.5 hover:bg-gold/20 rounded-full bg-transparent border-none cursor-pointer text-gold-dark"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}
