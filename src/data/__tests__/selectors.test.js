import { describe, expect, test } from 'vitest'
import {
  getControversyFeed,
  getFranchiseTimeline,
  getPersonProfile,
  searchPeople,
} from '../selectors'

describe('selectors', () => {
  test('getPersonProfile returns merged profile shape', () => {
    const profile = getPersonProfile(3)
    expect(profile?.person.displayName).toBe('Teresa Giudice')
    expect(profile?.castTimeline.length).toBeGreaterThan(0)
    expect(Array.isArray(profile?.relationships)).toBe(true)
    expect(Array.isArray(profile?.controversies)).toBe(true)
  })

  test('searchPeople honors filters', () => {
    const rows = searchPeople('', {
      franchiseId: 'rhobh',
      hasNotableSpouse: true,
      rumorPolicy: 'hide',
    })

    expect(rows.length).toBeGreaterThan(0)
    rows.forEach((row) => {
      expect(row.primaryFranchiseId).toBe('rhobh')
      expect(row.notableSpouseCount).toBeGreaterThan(0)
    })
  })

  test('rumor policy hides rumor items', () => {
    const withRumors = getControversyFeed({ rumorPolicy: 'show_labeled' })
    const hiddenRumors = getControversyFeed({ rumorPolicy: 'hide' })

    expect(withRumors.length).toBeGreaterThan(hiddenRumors.length)
    expect(hiddenRumors.some((item) => item.isRumor)).toBe(false)
  })

  test('franchise timeline includes controversy spike counter', () => {
    const timeline = getFranchiseTimeline('rhobh')
    expect(timeline?.timeline.length).toBeGreaterThan(0)
    timeline?.timeline.forEach((line) => {
      expect(typeof line.controversySpikeCount).toBe('number')
    })
  })
})
