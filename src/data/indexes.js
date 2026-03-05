import { castAppearances } from './entities/castAppearances'
import { controversies } from './entities/controversies'
import { franchises } from './entities/franchises'
import { people } from './entities/people'
import { relationships } from './entities/relationships'
import { sourceIndex } from './entities/sources'

export const personById = new Map(people.map((person) => [person.id, person]))
export const franchiseById = new Map(franchises.map((franchise) => [franchise.id, franchise]))
export const sourceById = new Map(sourceIndex.map((source) => [source.id, source]))

export const controversiesByPersonId = controversies.reduce((acc, controversy) => {
  if (!acc.has(controversy.personId)) acc.set(controversy.personId, [])
  acc.get(controversy.personId).push(controversy)
  return acc
}, new Map())

export const relationshipsByPersonId = relationships.reduce((acc, relationship) => {
  if (!acc.has(relationship.personId)) acc.set(relationship.personId, [])
  acc.get(relationship.personId).push(relationship)
  return acc
}, new Map())

export const castByFranchiseSeason = castAppearances.reduce((acc, appearance) => {
  if (!acc.has(appearance.franchiseId)) acc.set(appearance.franchiseId, new Map())
  const seasonMap = acc.get(appearance.franchiseId)
  if (!seasonMap.has(appearance.season)) seasonMap.set(appearance.season, [])
  seasonMap.get(appearance.season).push(appearance)
  return acc
}, new Map())
