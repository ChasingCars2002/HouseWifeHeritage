import { useMemo, useState } from 'react'
import { AlertTriangle, CalendarClock, MapPin } from 'lucide-react'
import { getFranchiseTimeline, getFranchises } from '../data/selectors'

const roleColor = {
  full_time: 'bg-gold/40',
  friend_of: 'bg-blue-300/70',
  guest: 'bg-zinc-300',
  spouse_partner: 'bg-rose-300/70',
}

export default function ChronologyPage() {
  const franchises = getFranchises()
  const [franchiseId, setFranchiseId] = useState(franchises[0]?.id)

  const data = useMemo(() => getFranchiseTimeline(franchiseId), [franchiseId])

  if (!data) return null

  return (
    <div className="min-h-screen marble-bg">
      <div className="bg-gradient-to-b from-obsidian to-obsidian/95 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CalendarClock className="w-8 h-8 text-gold mx-auto mb-4" />
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">Franchise Cast Matrix</h1>
          <p className="mt-3 text-sm sm:text-base text-white/40 max-w-lg mx-auto">
            Track cast roles by season and spot controversy spikes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {franchises.map((franchise) => (
            <button
              key={franchise.id}
              onClick={() => setFranchiseId(franchise.id)}
              className={`px-3 py-2 text-sm rounded-full border-none cursor-pointer ${
                franchise.id === franchiseId ? 'bg-gold text-obsidian' : 'bg-white text-obsidian/60'
              }`}
            >
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {franchise.name.replace('The Real Housewives of ', '')}
              </span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-gold/10 overflow-hidden">
          <div className="grid grid-cols-[120px_1fr_120px] bg-obsidian text-white/70 text-xs uppercase tracking-wider px-4 py-3">
            <div>Season</div>
            <div>Roster by role</div>
            <div>Spike</div>
          </div>

          {data.timeline.map((seasonLine) => (
            <div key={seasonLine.season} className="grid grid-cols-[120px_1fr_120px] gap-3 px-4 py-3 border-t border-gold/10">
              <div className="text-sm font-semibold text-obsidian">S{seasonLine.season}</div>
              <div className="flex flex-wrap gap-2">
                {seasonLine.cast.map((entry) => (
                  <span
                    key={entry.id}
                    className={`text-xs px-2.5 py-1 rounded-full text-obsidian/80 ${roleColor[entry.roleType] || 'bg-marble'}`}
                  >
                    {entry.person?.displayName}
                  </span>
                ))}
              </div>
              <div className="text-xs text-obsidian/60 inline-flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                {seasonLine.controversySpikeCount}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 text-xs text-obsidian/40 flex flex-wrap gap-3">
          <span><span className="inline-block w-3 h-3 rounded-full bg-gold/40 mr-1" />full-time</span>
          <span><span className="inline-block w-3 h-3 rounded-full bg-blue-300/70 mr-1" />friend-of</span>
          <span><span className="inline-block w-3 h-3 rounded-full bg-zinc-300 mr-1" />guest</span>
          <span><span className="inline-block w-3 h-3 rounded-full bg-rose-300/70 mr-1" />spouse/partner</span>
        </div>
      </div>
    </div>
  )
}
