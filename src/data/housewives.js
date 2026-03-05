import { people } from './entities/people'
import { controversiesByPersonId, franchiseById, relationshipsByPersonId } from './indexes'

export const statuses = ['OG', 'Housewife', 'Friend of', 'Alum']
export const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
]

function toLegacy(person) {
  const franchise = franchiseById.get(person.primaryFranchiseId)
  const controversyReceipts = (controversiesByPersonId.get(person.id) || []).map((item) => ({
    year: item.startYear,
    event: item.title,
    type: item.type === 'interpersonal' ? 'drama' : item.type,
  }))

  const spouseReceipts = (relationshipsByPersonId.get(person.id) || [])
    .filter((item) => item.notable)
    .map((item) => ({
      year: item.startYear || 'n/a',
      event: `${item.relationshipType}: ${item.partnerName}`,
      type: 'milestone',
    }))

  const firstSeason = Math.min(...person.seasonsArray)
  const lastSeason = Math.max(...person.seasonsArray)

  return {
    id: person.id,
    name: person.displayName,
    city: franchise?.location.split(',')[0] || 'Unknown',
    status: person.legacyStatus,
    zodiac: person.zodiac,
    seasons: `${firstSeason}-${lastSeason}`,
    seasonsArray: person.seasonsArray,
    taglines: person.taglines,
    bio: person.bioShort,
    image: person.imageUrl,
    color: person.displayColor,
    alliances: person.alliances || [],
    enemies: person.enemies || [],
    receipts: [...controversyReceipts, ...spouseReceipts].sort((a, b) => Number(a.year || 0) - Number(b.year || 0)),
  }
}

export const housewives = people.map(toLegacy)
export const cities = [...new Set(housewives.map((h) => h.city))].sort()

export function getFeaturedHousewife() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000)
  return housewives[dayOfYear % housewives.length]
}

export function getCities() {
  return cities
}

export function filterHousewives({ query = '', city = '', status = '', zodiac = '' }) {
  const normalizedQuery = query.toLowerCase().trim()
  return housewives.filter((housewife) => {
    const matchesQuery = !normalizedQuery
      || housewife.name.toLowerCase().includes(normalizedQuery)
      || housewife.city.toLowerCase().includes(normalizedQuery)
      || housewife.bio.toLowerCase().includes(normalizedQuery)
      || housewife.taglines.some((tagline) => tagline.text.toLowerCase().includes(normalizedQuery))

    const matchesCity = !city || housewife.city === city
    const matchesStatus = !status || housewife.status === status
    const matchesZodiac = !zodiac || housewife.zodiac === zodiac

    return matchesQuery && matchesCity && matchesStatus && matchesZodiac
  })
}

export function getHousewifesByCity(city) {
  return housewives
    .filter((housewife) => housewife.city === city)
    .sort((a, b) => Math.min(...a.seasonsArray) - Math.min(...b.seasonsArray))
}

export function getHousewifeById(id) {
  return housewives.find((housewife) => housewife.id === Number(id))
}
