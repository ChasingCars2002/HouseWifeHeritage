import { CastStatus, RoleType } from './schema'
import { castAppearances } from './entities/castAppearances'
import { controversies } from './entities/controversies'
import { franchises } from './entities/franchises'
import { people } from './entities/people'
import { sourceIndex } from './entities/sources'
import {
  castByFranchiseSeason,
  controversiesByPersonId,
  franchiseById,
  personById,
  relationshipsByPersonId,
  sourceById,
} from './indexes'

function normalizeQuery(value) {
  return String(value || '').trim().toLowerCase()
}

function getLatestAppearance(person) {
  const appearances = castAppearances.filter((entry) => entry.personId === person.id)
  if (appearances.length === 0) return null
  return appearances.reduce((latest, current) => {
    if (!latest) return current
    if (current.season > latest.season) return current
    return latest
  }, null)
}

function personMatchesFilters(person, filters = {}) {
  const {
    franchiseId,
    roleType,
    castStatus,
    hasNotableSpouse,
    controversyType,
    controversyStatus,
    minSeverity,
    rumorPolicy = 'show_labeled',
  } = filters

  const personCast = castAppearances.filter((entry) => entry.personId === person.id)
  const personControversies = (controversiesByPersonId.get(person.id) || []).filter((item) =>
    rumorPolicy === 'hide' ? !item.isRumor : true
  )
  const personRelationships = relationshipsByPersonId.get(person.id) || []

  if (franchiseId && !personCast.some((entry) => entry.franchiseId === franchiseId)) return false
  if (roleType && !personCast.some((entry) => entry.roleType === roleType)) return false
  if (castStatus && person.castStatus !== castStatus) return false
  if (hasNotableSpouse && !personRelationships.some((entry) => entry.notable)) return false
  if (controversyType && !personControversies.some((entry) => entry.type === controversyType)) return false
  if (controversyStatus && !personControversies.some((entry) => entry.status === controversyStatus)) return false
  if (typeof minSeverity === 'number' && !personControversies.some((entry) => entry.severity >= minSeverity)) return false

  return true
}

export function getFranchises() {
  return [...franchises].sort((a, b) => a.name.localeCompare(b.name))
}

export function getPeople(filters = {}) {
  return people
    .filter((person) => personMatchesFilters(person, filters))
    .map((person) => {
      const latestAppearance = getLatestAppearance(person)
      const personControversies = (controversiesByPersonId.get(person.id) || []).filter((item) =>
        filters.rumorPolicy === 'hide' ? !item.isRumor : true
      )
      const personRelationships = relationshipsByPersonId.get(person.id) || []

      return {
        ...person,
        currentRoleType: latestAppearance?.roleType || RoleType.GUEST,
        currentFranchiseId: latestAppearance?.franchiseId || person.primaryFranchiseId,
        controversyCount: personControversies.length,
        notableSpouseCount: personRelationships.filter((entry) => entry.notable).length,
      }
    })
}

export function searchPeople(query = '', filters = {}) {
  const normalized = normalizeQuery(query)
  return getPeople(filters).filter((person) => {
    if (!normalized) return true

    const franchise = franchiseById.get(person.primaryFranchiseId)
    const searchable = [
      person.displayName,
      person.bioShort,
      franchise?.name,
      ...(person.aliases || []),
      ...(person.tags || []),
    ]

    return searchable.filter(Boolean).some((value) => value.toLowerCase().includes(normalized))
  })
}

export function getPersonProfile(personId, filters = {}) {
  const id = Number(personId)
  const person = personById.get(id)
  if (!person) return null

  const rumorPolicy = filters.rumorPolicy || 'show_labeled'
  const castTimeline = castAppearances
    .filter((entry) => entry.personId === id)
    .sort((a, b) => a.season - b.season)
    .map((entry) => ({
      ...entry,
      franchise: franchiseById.get(entry.franchiseId),
    }))

  const personRelationships = (relationshipsByPersonId.get(id) || []).map((entry) => ({
    ...entry,
    sources: entry.sourceRefs.map((sourceId) => sourceById.get(sourceId)).filter(Boolean),
  }))

  const personControversies = (controversiesByPersonId.get(id) || [])
    .filter((entry) => (rumorPolicy === 'hide' ? !entry.isRumor : true))
    .sort((a, b) => b.startYear - a.startYear)
    .map((entry) => ({
      ...entry,
      sources: entry.sourceRefs.map((sourceId) => sourceById.get(sourceId)).filter(Boolean),
      impactedFranchiseNames: entry.impactedFranchises
        .map((franchiseId) => franchiseById.get(franchiseId)?.name)
        .filter(Boolean),
    }))

  return {
    person,
    castTimeline,
    relationships: personRelationships,
    controversies: personControversies,
  }
}

export function getFranchiseTimeline(franchiseId) {
  const franchise = franchiseById.get(franchiseId)
  if (!franchise) return null

  const seasonMap = castByFranchiseSeason.get(franchiseId) || new Map()
  const seasons = [...seasonMap.keys()].sort((a, b) => a - b)

  const timeline = seasons.map((season) => {
    const cast = (seasonMap.get(season) || []).map((entry) => ({
      ...entry,
      person: personById.get(entry.personId),
    }))

    const castPersonIds = new Set(cast.map((entry) => entry.personId))
    const controversySpike = controversies.filter(
      (entry) => entry.startYear === season && castPersonIds.has(entry.personId)
    )

    return {
      season,
      cast,
      controversySpikeCount: controversySpike.length,
    }
  })

  return {
    franchise,
    timeline,
  }
}

export function getControversyFeed(filters = {}) {
  const {
    franchiseId,
    controversyType,
    controversyStatus,
    minSeverity,
    rumorPolicy = 'show_labeled',
    sortBy = 'latest',
  } = filters

  const filtered = controversies
    .filter((entry) => (rumorPolicy === 'hide' ? !entry.isRumor : true))
    .filter((entry) => (franchiseId ? entry.impactedFranchises.includes(franchiseId) : true))
    .filter((entry) => (controversyType ? entry.type === controversyType : true))
    .filter((entry) => (controversyStatus ? entry.status === controversyStatus : true))
    .filter((entry) => (typeof minSeverity === 'number' ? entry.severity >= minSeverity : true))
    .map((entry) => ({
      ...entry,
      person: personById.get(entry.personId),
      sources: entry.sourceRefs.map((id) => sourceById.get(id)).filter(Boolean),
    }))

  if (sortBy === 'severe') {
    return filtered.sort((a, b) => b.severity - a.severity || b.startYear - a.startYear)
  }

  if (sortBy === 'ongoing') {
    return filtered.sort((a, b) => {
      if (a.status === 'ongoing' && b.status !== 'ongoing') return -1
      if (b.status === 'ongoing' && a.status !== 'ongoing') return 1
      return b.startYear - a.startYear
    })
  }

  return filtered.sort((a, b) => b.startYear - a.startYear)
}

export function getRelationshipGraph(personId, depth = 1) {
  const rootId = Number(personId)
  const visited = new Set([rootId])
  const edges = []
  let frontier = [rootId]

  for (let step = 0; step < depth; step += 1) {
    const next = []
    frontier.forEach((currentId) => {
      const links = relationshipsByPersonId.get(currentId) || []
      links.forEach((link) => {
        const targetId = link.partnerPersonId || null
        edges.push({
          fromPersonId: currentId,
          toPersonId: targetId,
          partnerName: link.partnerName,
          relationshipType: link.relationshipType,
          notable: link.notable,
        })
        if (targetId && !visited.has(targetId)) {
          visited.add(targetId)
          next.push(targetId)
        }
      })
    })
    frontier = next
  }

  return {
    nodes: [...visited].map((id) => personById.get(id)).filter(Boolean),
    edges,
  }
}

export function getSourceIndex() {
  return [...sourceIndex]
}

export const filterShape = {
  franchiseId: null,
  roleType: null,
  castStatus: null,
  hasNotableSpouse: false,
  controversyType: null,
  controversyStatus: null,
  minSeverity: null,
  rumorPolicy: 'show_labeled',
}
