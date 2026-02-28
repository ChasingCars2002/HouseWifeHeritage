import { useState, useMemo } from 'react'
import { Diamond, Users } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import LegacyCard from '../components/LegacyCard'
import { filterHousewives, housewives } from '../data/housewives'

export default function VaultPage() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({ city: '', status: '', zodiac: '' })

  const results = useMemo(
    () => filterHousewives({ query, ...filters }),
    [query, filters]
  )

  const isFiltering = query || filters.city || filters.status || filters.zodiac

  // Stats
  const stats = useMemo(() => {
    const cityCount = new Set(housewives.map(h => h.city)).size
    const ogCount = housewives.filter(h => h.status === 'OG').length
    return { total: housewives.length, cities: cityCount, ogs: ogCount }
  }, [])

  return (
    <div className="min-h-screen marble-bg">
      {/* Header */}
      <div className="bg-gradient-to-b from-obsidian to-obsidian/95 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Diamond className="w-8 h-8 text-gold mx-auto mb-4" />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            The Vault
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/40 max-w-lg mx-auto">
            The complete searchable directory of every Real Housewife in franchise history.
          </p>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 sm:gap-10 mt-8">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-display font-bold text-gold">{stats.total}</p>
              <p className="text-[10px] sm:text-xs text-white/30 uppercase tracking-wider mt-1">Housewives</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-display font-bold text-gold">{stats.cities}</p>
              <p className="text-[10px] sm:text-xs text-white/30 uppercase tracking-wider mt-1">Cities</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-display font-bold text-gold">{stats.ogs}</p>
              <p className="text-[10px] sm:text-xs text-white/30 uppercase tracking-wider mt-1">OGs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          filters={filters}
          onFiltersChange={setFilters}
        />

        <div className="mt-6 mb-6 sm:mt-8 sm:mb-8 flex items-center gap-2">
          <Users className="w-4 h-4 text-obsidian/30" />
          <p className="text-xs text-obsidian/40">
            {isFiltering
              ? `${results.length} result${results.length !== 1 ? 's' : ''} found`
              : `Showing all ${results.length} Housewives`
            }
          </p>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
            {results.map((hw, i) => (
              <div
                key={hw.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <LegacyCard housewife={hw} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 sm:py-24">
            <Diamond className="w-12 h-12 text-gold/20 mx-auto mb-4" />
            <h3 className="font-display text-xl text-obsidian/40">No Results</h3>
            <p className="mt-2 text-sm text-obsidian/30">
              No Housewives match your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
