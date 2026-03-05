import { describe, expect, test } from 'vitest'
import { castAppearances } from '../entities/castAppearances'
import { controversies } from '../entities/controversies'
import { franchises } from '../entities/franchises'
import { people } from '../entities/people'
import { relationships } from '../entities/relationships'
import { sourceIndex } from '../entities/sources'

describe('entity integrity', () => {
  test('cast appearance references resolve', () => {
    const personIds = new Set(people.map((person) => person.id))
    const franchiseIds = new Set(franchises.map((franchise) => franchise.id))

    castAppearances.forEach((appearance) => {
      expect(personIds.has(appearance.personId)).toBe(true)
      expect(franchiseIds.has(appearance.franchiseId)).toBe(true)
    })
  })

  test('relationship partnerPersonId references resolve when present', () => {
    const personIds = new Set(people.map((person) => person.id))

    relationships.forEach((relationship) => {
      if (relationship.partnerPersonId) {
        expect(personIds.has(relationship.partnerPersonId)).toBe(true)
      }
    })
  })

  test('controversy sourceRefs are non-empty and valid', () => {
    const sourceIds = new Set(sourceIndex.map((source) => source.id))

    controversies.forEach((controversy) => {
      expect(controversy.sourceRefs.length).toBeGreaterThan(0)
      controversy.sourceRefs.forEach((sourceId) => {
        expect(sourceIds.has(sourceId)).toBe(true)
      })
    })
  })

  test('IDs are unique per entity table', () => {
    const tables = [people, franchises, castAppearances, relationships, controversies, sourceIndex]
    tables.forEach((table) => {
      const ids = table.map((row) => row.id)
      expect(new Set(ids).size).toBe(ids.length)
    })
  })
})
