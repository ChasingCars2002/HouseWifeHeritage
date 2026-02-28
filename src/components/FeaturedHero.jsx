import { Link } from 'react-router-dom'
import { Crown, MapPin, Sparkles, ArrowRight } from 'lucide-react'

export default function FeaturedHero({ housewife }) {
  if (!housewife) return null

  const { id, name, city, status, zodiac, bio, image, color, taglines } = housewife
  const latestTagline = taglines[taglines.length - 1]

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-obsidian via-obsidian to-obsidian/95">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Featured badge */}
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <Crown className="w-4 h-4 text-gold" />
          <span className="text-xs sm:text-sm font-medium text-gold uppercase tracking-[0.2em]">
            Featured Housewife of the Day
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text content */}
          <div className="order-2 lg:order-1">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gold/20 rounded-full text-gold text-xs font-medium">
                <MapPin className="w-3.5 h-3.5" />
                {city}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full text-white/70 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                {zodiac}
              </span>
              <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                status === 'OG'
                  ? 'bg-gold text-obsidian'
                  : 'bg-white/10 text-white/70'
              }`}>
                {status}
              </span>
            </div>

            {/* Tagline */}
            <blockquote className="mt-6 sm:mt-8 pl-4 border-l-2 border-gold/50">
              <p className="text-base sm:text-lg text-white/60 italic font-display leading-relaxed">
                "{latestTagline?.text}"
              </p>
              <cite className="mt-2 block text-xs text-gold/60 not-italic">
                — Season {latestTagline?.season} Tagline
              </cite>
            </blockquote>

            <p className="mt-6 text-sm sm:text-base text-white/40 leading-relaxed line-clamp-3">
              {bio}
            </p>

            <Link
              to={`/housewife/${id}`}
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gold text-obsidian font-semibold text-sm rounded-full hover:bg-gold-light transition-all hover:shadow-lg hover:shadow-gold/20 no-underline"
            >
              Explore Heritage
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              {/* Decorative ring */}
              <div
                className="absolute -inset-3 rounded-full opacity-20 blur-sm"
                style={{ background: `linear-gradient(135deg, ${color}, transparent)` }}
              />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-gold/30 shadow-2xl">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold/20 to-gold/5">
                        <span class="text-7xl font-display font-bold text-gold/50">${name.charAt(0)}</span>
                      </div>
                    `
                  }}
                />
              </div>
              {/* Diamond decoration */}
              <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gold rounded-xl rotate-45 flex items-center justify-center shadow-lg">
                <Crown className="w-5 h-5 text-white -rotate-45" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
