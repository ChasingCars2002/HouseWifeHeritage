import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, MapPin, Sparkles, Star, Play, Heart, Swords,
  Calendar, Scale, Briefcase, Flame, Crown, Diamond
} from 'lucide-react'
import { getHousewifeById, housewives } from '../data/housewives'

export default function BioPage() {
  const { id } = useParams()
  const hw = getHousewifeById(id)

  if (!hw) {
    return (
      <div className="min-h-screen flex items-center justify-center marble-bg">
        <div className="text-center">
          <Diamond className="w-16 h-16 text-gold/20 mx-auto mb-4" />
          <h1 className="font-display text-2xl text-obsidian/40">Housewife Not Found</h1>
          <Link to="/" className="mt-4 inline-block text-gold hover:text-gold-dark text-sm">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const receiptTypeIcon = {
    milestone: Crown,
    drama: Flame,
    business: Briefcase,
    legal: Scale,
  }

  const receiptTypeColor = {
    milestone: 'text-gold bg-gold/10',
    drama: 'text-rose bg-rose-light/50',
    business: 'text-emerald-600 bg-emerald-50',
    legal: 'text-blue-600 bg-blue-50',
  }

  // Find related housewives (alliances/enemies)
  const allAlliances = hw.alliances
    .map(name => housewives.find(h => h.name === name))
    .filter(Boolean)
  const allEnemies = hw.enemies
    .map(name => housewives.find(h => h.name === name))
    .filter(Boolean)

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative bg-obsidian overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: `linear-gradient(135deg, ${hw.color}60, transparent)` }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm mb-6 no-underline transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collection
          </Link>

          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 sm:gap-8">
            {/* Photo */}
            <div className="relative shrink-0">
              <div
                className="absolute -inset-2 rounded-2xl opacity-30 blur-md"
                style={{ background: hw.color }}
              />
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-gold/30">
                <img
                  src={hw.image}
                  alt={hw.name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold/20 to-gold/5">
                        <span class="text-6xl font-display font-bold text-gold/50">${hw.name.charAt(0)}</span>
                      </div>
                    `
                  }}
                />
              </div>
            </div>

            {/* Name and meta */}
            <div className="text-center sm:text-left pb-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-3">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  hw.status === 'OG'
                    ? 'bg-gold text-obsidian'
                    : 'bg-white/10 text-white/70'
                }`}>
                  {hw.status === 'OG' && <Star className="w-3 h-3" />}
                  {hw.status}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 rounded-full text-white/60 text-xs">
                  <MapPin className="w-3 h-3" /> {hw.city}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/10 rounded-full text-white/60 text-xs">
                  <Sparkles className="w-3 h-3" /> {hw.zodiac}
                </span>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                {hw.name}
              </h1>
              <p className="mt-2 text-sm text-white/30">Seasons {hw.seasons}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="marble-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-10">
              {/* Bio */}
              <section>
                <h2 className="font-display text-xl font-semibold text-obsidian mb-4">About</h2>
                <p className="text-sm sm:text-base text-obsidian/60 leading-relaxed">{hw.bio}</p>
              </section>

              {/* Iconic Taglines */}
              <section>
                <h2 className="font-display text-xl font-semibold text-obsidian mb-4 flex items-center gap-2">
                  <Play className="w-5 h-5 text-gold" />
                  Iconic Taglines
                </h2>
                <div className="space-y-3">
                  {hw.taglines.map((tagline, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gold/10 hover:border-gold/30 transition-colors group"
                    >
                      <div className="shrink-0 w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                        <Play className="w-3.5 h-3.5 text-gold" />
                      </div>
                      <div>
                        <p className="text-sm text-obsidian/70 italic leading-relaxed">
                          "{tagline.text}"
                        </p>
                        <p className="mt-1 text-[10px] text-obsidian/30 uppercase tracking-wider font-medium">
                          Season {tagline.season}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* The Receipts */}
              <section>
                <h2 className="font-display text-xl font-semibold text-obsidian mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gold" />
                  The Receipts
                </h2>
                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[18px] top-2 bottom-2 w-0.5 timeline-line" />

                  <div className="space-y-4">
                    {hw.receipts.map((receipt, i) => {
                      const Icon = receiptTypeIcon[receipt.type] || Crown
                      const colorClass = receiptTypeColor[receipt.type] || 'text-gold bg-gold/10'
                      return (
                        <div key={i} className="relative flex gap-4 pl-1">
                          <div className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center z-10 ${colorClass}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="text-xs font-semibold text-gold-dark">{receipt.year}</p>
                            <p className="text-sm text-obsidian/60 mt-0.5 leading-relaxed">{receipt.event}</p>
                            <span className={`mt-1.5 inline-block text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full ${colorClass}`}>
                              {receipt.type}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Family Tree - Alliances */}
              <section className="bg-white rounded-2xl border border-gold/10 p-5 sm:p-6">
                <h3 className="font-display text-lg font-semibold text-obsidian mb-4 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose" />
                  Alliances
                </h3>
                {allAlliances.length > 0 ? (
                  <div className="space-y-2">
                    {allAlliances.map((ally) => (
                      <Link
                        key={ally.id}
                        to={`/housewife/${ally.id}`}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-marble/50 transition-colors no-underline"
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-display font-bold text-xs"
                          style={{ background: ally.color }}
                        >
                          {ally.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-obsidian">{ally.name}</p>
                          <p className="text-[10px] text-obsidian/40">{ally.city}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-obsidian/30 italic">No alliances recorded</p>
                )}

                {/* Unlinked alliance names */}
                {hw.alliances.filter(name => !housewives.find(h => h.name === name)).length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gold/10">
                    {hw.alliances
                      .filter(name => !housewives.find(h => h.name === name))
                      .map(name => (
                        <p key={name} className="text-xs text-obsidian/40 py-1">{name}</p>
                      ))
                    }
                  </div>
                )}
              </section>

              {/* Family Tree - Enemies */}
              <section className="bg-white rounded-2xl border border-gold/10 p-5 sm:p-6">
                <h3 className="font-display text-lg font-semibold text-obsidian mb-4 flex items-center gap-2">
                  <Swords className="w-4 h-4 text-obsidian/40" />
                  Rivals
                </h3>
                {allEnemies.length > 0 ? (
                  <div className="space-y-2">
                    {allEnemies.map((enemy) => (
                      <Link
                        key={enemy.id}
                        to={`/housewife/${enemy.id}`}
                        className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-marble/50 transition-colors no-underline"
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-display font-bold text-xs"
                          style={{ background: enemy.color }}
                        >
                          {enemy.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-obsidian">{enemy.name}</p>
                          <p className="text-[10px] text-obsidian/40">{enemy.city}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-obsidian/30 italic">No rivalries recorded</p>
                )}

                {hw.enemies.filter(name => !housewives.find(h => h.name === name)).length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gold/10">
                    {hw.enemies
                      .filter(name => !housewives.find(h => h.name === name))
                      .map(name => (
                        <p key={name} className="text-xs text-obsidian/40 py-1">{name}</p>
                      ))
                    }
                  </div>
                )}
              </section>

              {/* Quick Facts */}
              <section className="bg-white rounded-2xl border border-gold/10 p-5 sm:p-6">
                <h3 className="font-display text-lg font-semibold text-obsidian mb-4">Quick Facts</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-obsidian/40">City</dt>
                    <dd className="text-obsidian font-medium">{hw.city}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-obsidian/40">Zodiac</dt>
                    <dd className="text-obsidian font-medium">{hw.zodiac}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-obsidian/40">Status</dt>
                    <dd className="text-obsidian font-medium">{hw.status}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-obsidian/40">Seasons</dt>
                    <dd className="text-obsidian font-medium">{hw.seasons}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-obsidian/40">Taglines</dt>
                    <dd className="text-obsidian font-medium">{hw.taglines.length}</dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
