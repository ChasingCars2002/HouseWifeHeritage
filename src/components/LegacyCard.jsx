import { Link } from 'react-router-dom'
import { MapPin, Star, Sparkles } from 'lucide-react'

export default function LegacyCard({ housewife }) {
  const { id, name, city, status, zodiac, seasons, taglines, image, color } = housewife
  const latestTagline = taglines[taglines.length - 1]

  return (
    <Link
      to={`/housewife/${id}`}
      className="group block no-underline"
    >
      <div className="relative bg-white rounded-2xl border border-gold/10 overflow-hidden shadow-sm hover:shadow-lg hover:shadow-gold/10 transition-all duration-300 hover:-translate-y-1">
        {/* Status badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
            status === 'OG'
              ? 'bg-gold/90 text-white'
              : status === 'Housewife'
              ? 'bg-white/90 text-gold-dark border border-gold/30'
              : status === 'Friend of'
              ? 'bg-rose-light/90 text-rose'
              : 'bg-marble/90 text-obsidian/60'
          }`}>
            {status === 'OG' && <Star className="w-3 h-3" />}
            {status}
          </span>
        </div>

        {/* Image */}
        <div className="relative h-56 sm:h-64 overflow-hidden bg-marble">
          <div
            className="absolute inset-0 opacity-20"
            style={{ background: `linear-gradient(135deg, ${color}40, transparent)` }}
          />
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-marble to-marble-dark">
                  <span class="text-5xl font-display font-bold text-gold/30">${name.charAt(0)}</span>
                </div>
              `
            }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <h3 className="font-display text-lg font-semibold text-obsidian group-hover:text-gold-dark transition-colors leading-tight">
            {name}
          </h3>

          <div className="flex items-center gap-3 mt-2 text-xs text-obsidian/50">
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {city}
            </span>
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {zodiac}
            </span>
          </div>

          <p className="mt-3 text-xs text-obsidian/40 italic leading-relaxed line-clamp-2">
            "{latestTagline?.text}"
          </p>

          <div className="mt-3 pt-3 border-t border-gold/10 flex items-center justify-between">
            <span className="text-[10px] font-medium text-obsidian/30 uppercase tracking-wider">
              Seasons {seasons}
            </span>
            <span className="text-xs font-medium text-gold group-hover:text-gold-dark transition-colors">
              View Heritage →
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
