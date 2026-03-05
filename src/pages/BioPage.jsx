import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AlertTriangle, ArrowLeft, Calendar, HeartHandshake, ShieldCheck, Users } from 'lucide-react'
import { getPersonProfile } from '../data/selectors'

const roleColors = {
  full_time: 'bg-gold/20 text-gold-dark',
  friend_of: 'bg-blue-100 text-blue-700',
  guest: 'bg-gray-100 text-gray-700',
  spouse_partner: 'bg-rose-100 text-rose-700',
}

export default function BioPage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('cast')
  const profile = useMemo(() => getPersonProfile(id, { rumorPolicy: 'show_labeled' }), [id])

  if (!profile) {
    return (
      <div className="min-h-screen marble-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-obsidian/50">Profile not found</h1>
          <Link to="/vault" className="text-sm text-gold mt-3 inline-block">Back to vault</Link>
        </div>
      </div>
    )
  }

  const { person, castTimeline, relationships, controversies } = profile

  return (
    <div className="min-h-screen marble-bg">
      <div className="bg-obsidian text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Link to="/vault" className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm no-underline">
            <ArrowLeft className="w-4 h-4" /> Back to Vault
          </Link>

          <div className="mt-4 flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold">{person.displayName}</h1>
              <p className="text-white/50 mt-2 max-w-3xl text-sm">{person.bioShort}</p>
            </div>
            <div className="text-xs text-white/50">
              Last updated baseline: March 5, 2026
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="bg-white rounded-2xl border border-gold/10 p-2 flex gap-2">
          <TabButton label="Cast History" active={activeTab === 'cast'} onClick={() => setActiveTab('cast')} icon={<Users className="w-4 h-4" />} />
          <TabButton label="Relationships" active={activeTab === 'relationships'} onClick={() => setActiveTab('relationships')} icon={<HeartHandshake className="w-4 h-4" />} />
          <TabButton label="Controversies" active={activeTab === 'controversies'} onClick={() => setActiveTab('controversies')} icon={<AlertTriangle className="w-4 h-4" />} />
        </div>

        {activeTab === 'cast' && (
          <section className="bg-white rounded-2xl border border-gold/10 p-5 sm:p-6">
            <h2 className="font-display text-xl text-obsidian mb-4">Cast History</h2>
            <div className="space-y-3">
              {castTimeline.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between border border-gold/10 rounded-xl p-3">
                  <div>
                    <p className="text-sm font-medium text-obsidian">{entry.franchise?.name}</p>
                    <p className="text-xs text-obsidian/40">Season {entry.season}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full ${roleColors[entry.roleType] || 'bg-marble text-obsidian/60'}`}>
                    {entry.roleType.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'relationships' && (
          <section className="bg-white rounded-2xl border border-gold/10 p-5 sm:p-6">
            <h2 className="font-display text-xl text-obsidian mb-4">Notable Spouses & Partners</h2>
            <div className="space-y-4">
              {relationships.map((entry) => (
                <div key={entry.id} className="border border-gold/10 rounded-xl p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-obsidian">{entry.partnerName}</p>
                      <p className="text-xs text-obsidian/40">{entry.relationshipType} • {entry.startYear || 'n/a'} - {entry.endYear || 'present'}</p>
                    </div>
                    {entry.notable && <span className="text-[10px] px-2 py-1 rounded-full bg-rose-light/50 text-rose">notable</span>}
                  </div>
                  <p className="mt-2 text-sm text-obsidian/60">{entry.notes}</p>
                  <SourceChips sources={entry.sources} />
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'controversies' && (
          <section className="bg-white rounded-2xl border border-gold/10 p-5 sm:p-6">
            <h2 className="font-display text-xl text-obsidian mb-4">Controversies</h2>
            <div className="space-y-4">
              {controversies.map((entry) => (
                <div key={entry.id} className="border border-gold/10 rounded-xl p-4">
                  <div className="flex flex-wrap items-center gap-2 justify-between">
                    <p className="text-sm font-semibold text-obsidian">{entry.title}</p>
                    <div className="flex flex-wrap gap-2 text-[10px]">
                      <span className="px-2 py-1 rounded-full bg-marble text-obsidian/60">{entry.type}</span>
                      <span className="px-2 py-1 rounded-full bg-marble text-obsidian/60">{entry.status}</span>
                      <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700">severity {entry.severity}/5</span>
                      {entry.isRumor && <span className="px-2 py-1 rounded-full bg-red-100 text-red-700">rumor</span>}
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-obsidian/60">{entry.summary}</p>
                  <p className="mt-2 text-xs text-obsidian/40 inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {entry.startYear} {entry.endYear ? `- ${entry.endYear}` : ''}
                  </p>
                  <SourceChips sources={entry.sources} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function TabButton({ label, icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm border-none cursor-pointer transition-colors ${
        active ? 'bg-gold text-obsidian' : 'bg-transparent text-obsidian/50 hover:bg-marble'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

function SourceChips({ sources }) {
  return (
    <div className="mt-3 space-y-1">
      <p className="text-[10px] uppercase tracking-wider text-obsidian/35 inline-flex items-center gap-1">
        <ShieldCheck className="w-3.5 h-3.5" /> Source quality
      </p>
      <div className="flex flex-wrap gap-2">
        {sources.map((source) => (
          <a
            key={source.id}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="text-[10px] px-2 py-1 rounded-full bg-marble text-obsidian/60 no-underline"
            title={`${source.tier} • ${source.reliabilityScore}/5`}
          >
            {source.publisher} ({source.reliabilityScore}/5)
          </a>
        ))}
      </div>
    </div>
  )
}
