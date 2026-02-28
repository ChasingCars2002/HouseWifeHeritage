import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Clock, MapPin, ChevronDown, Star } from 'lucide-react'
import { cities, getHousewifesByCity } from '../data/housewives'

export default function ChronologyPage() {
  const [selectedCity, setSelectedCity] = useState(cities[0])

  const cityHousewives = useMemo(
    () => getHousewifesByCity(selectedCity),
    [selectedCity]
  )

  // Calculate season range for the city
  const allSeasons = useMemo(() => {
    const seasons = new Set()
    cityHousewives.forEach(hw => hw.seasonsArray.forEach(s => seasons.add(s)))
    return [...seasons].sort((a, b) => a - b)
  }, [cityHousewives])

  return (
    <div className="min-h-screen marble-bg">
      {/* Header */}
      <div className="bg-gradient-to-b from-obsidian to-obsidian/95 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Clock className="w-8 h-8 text-gold mx-auto mb-4" />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
            Cast Chronology
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/40 max-w-lg mx-auto">
            See how the cast of each city has evolved from Season 1 to the present.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* City selector */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all border-none cursor-pointer ${
                selectedCity === city
                  ? 'bg-gold text-obsidian shadow-md shadow-gold/20'
                  : 'bg-white text-obsidian/50 hover:text-obsidian hover:bg-marble-dark border border-gold/10'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              {city}
            </button>
          ))}
        </div>

        {/* Timeline Grid */}
        <div className="bg-white rounded-2xl border border-gold/10 overflow-hidden shadow-sm">
          {/* Header row — season numbers */}
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid gap-px bg-gold/10" style={{ gridTemplateColumns: `200px repeat(${allSeasons.length}, 1fr)` }}>
                {/* Corner cell */}
                <div className="bg-obsidian p-3 flex items-center">
                  <span className="text-xs font-medium text-gold uppercase tracking-wider">Housewife</span>
                </div>
                {/* Season headers */}
                {allSeasons.map(season => (
                  <div key={season} className="bg-obsidian p-2 text-center">
                    <span className="text-[10px] text-white/30 block">Season</span>
                    <span className="text-sm font-semibold text-gold">{season}</span>
                  </div>
                ))}

                {/* Housewife rows */}
                {cityHousewives.map((hw) => (
                  <>
                    {/* Name cell */}
                    <Link
                      key={`name-${hw.id}`}
                      to={`/housewife/${hw.id}`}
                      className="bg-white p-3 flex items-center gap-2 hover:bg-marble/50 transition-colors no-underline border-t border-gold/5"
                    >
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white font-display font-bold text-[10px] shrink-0"
                        style={{ background: hw.color }}
                      >
                        {hw.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-obsidian truncate">{hw.name}</p>
                        <p className="text-[10px] text-obsidian/30">{hw.status}</p>
                      </div>
                    </Link>
                    {/* Season cells */}
                    {allSeasons.map(season => {
                      const isActive = hw.seasonsArray.includes(season)
                      return (
                        <div
                          key={`${hw.id}-${season}`}
                          className={`flex items-center justify-center border-t border-gold/5 ${
                            isActive ? '' : 'bg-marble/30'
                          }`}
                        >
                          {isActive && (
                            <div
                              className="w-6 h-6 rounded-full flex items-center justify-center"
                              style={{ background: `${hw.color}20` }}
                              title={`${hw.name} - Season ${season}`}
                            >
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ background: hw.color }}
                              />
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-obsidian/40">
          <span className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gold" />
            Active Season
          </span>
          <span className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-marble-dark" />
            Not on Cast
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="w-3 h-3 text-gold" />
            OG = Original Cast Member
          </span>
        </div>

        {/* Cast cards for mobile */}
        <div className="mt-10 sm:hidden space-y-4">
          <h3 className="font-display text-lg font-semibold text-obsidian text-center">
            {selectedCity} Cast
          </h3>
          {cityHousewives.map(hw => (
            <Link
              key={hw.id}
              to={`/housewife/${hw.id}`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gold/10 no-underline"
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-display font-bold text-sm shrink-0"
                style={{ background: hw.color }}
              >
                {hw.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-obsidian">{hw.name}</p>
                <p className="text-xs text-obsidian/40">Seasons {hw.seasons} · {hw.status}</p>
              </div>
              <ChevronDown className="w-4 h-4 text-obsidian/20 -rotate-90" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
