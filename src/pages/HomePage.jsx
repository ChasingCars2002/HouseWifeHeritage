import { useState, useMemo } from 'react'
import { Diamond } from 'lucide-react'
import FeaturedHero from '../components/FeaturedHero'
import SearchBar from '../components/SearchBar'
import LegacyCard from '../components/LegacyCard'
import { getFeaturedHousewife, filterHousewives } from '../data/housewives'

export default function HomePage() {
  const featured = getFeaturedHousewife()
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState({ city: '', status: '', zodiac: '' })

  const results = useMemo(
    () => filterHousewives({ query, ...filters }),
    [query, filters]
  )

  const isFiltering = query || filters.city || filters.status || filters.zodiac

  return (
    <div className="min-h-screen">
      {/* Featured Housewife Hero */}
      <FeaturedHero housewife={featured} />

      {/* Search and Grid Section */}
      <section className="marble-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Section header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Diamond className="w-4 h-4 text-gold" />
              <span className="text-xs font-medium text-gold uppercase tracking-[0.2em]">
                The Vault
              </span>
              <Diamond className="w-4 h-4 text-gold" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-obsidian">
              Legacy Collection
            </h2>
            <p className="mt-2 text-sm text-obsidian/40 max-w-lg mx-auto">
              Explore the complete heritage of every Real Housewife across every city.
            </p>
          </div>

          {/* Search */}
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            filters={filters}
            onFiltersChange={setFilters}
          />

          {/* Results count */}
          <div className="mt-6 mb-6 sm:mt-8 sm:mb-8">
            <p className="text-xs text-obsidian/40">
              {isFiltering
                ? `${results.length} result${results.length !== 1 ? 's' : ''} found`
                : `${results.length} Housewives in the collection`
              }
            </p>
          </div>

          {/* Grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
              {results.map((hw, i) => (
                <div
                  key={hw.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <LegacyCard housewife={hw} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 sm:py-24">
              <Diamond className="w-12 h-12 text-gold/20 mx-auto mb-4" />
              <h3 className="font-display text-xl text-obsidian/40">No Housewives Found</h3>
              <p className="mt-2 text-sm text-obsidian/30">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
