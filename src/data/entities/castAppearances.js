import { CastStatus, RoleType } from '../schema'
import { people } from './people'

const roleOverrides = {
  20: { 10: RoleType.FRIEND_OF },
  21: { 5: RoleType.FRIEND_OF },
}

function roleForSeason(personId, season) {
  return roleOverrides[personId]?.[season] || RoleType.FULL_TIME
}

export const castAppearances = people.flatMap((person) =>
  person.seasonsArray.map((season, i) => ({
    id: `${person.id}-${person.primaryFranchiseId}-${season}`,
    personId: person.id,
    franchiseId: person.primaryFranchiseId,
    season,
    roleType: roleForSeason(person.id, season),
    billingOrder: i + 1,
    statusAtSeason: person.castStatus === CastStatus.CURRENT && season === Math.max(...person.seasonsArray)
      ? CastStatus.CURRENT
      : CastStatus.ALUM,
  }))
)
