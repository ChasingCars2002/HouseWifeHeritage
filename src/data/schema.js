export const RoleType = Object.freeze({
  FULL_TIME: 'full_time',
  FRIEND_OF: 'friend_of',
  GUEST: 'guest',
  SPOUSE_PARTNER: 'spouse_partner',
})

export const CastStatus = Object.freeze({
  CURRENT: 'current',
  ALUM: 'alum',
  PAUSED: 'paused',
})

export const ControversyType = Object.freeze({
  LEGAL: 'legal',
  FINANCIAL: 'financial',
  INTERPERSONAL: 'interpersonal',
  DISCRIMINATION: 'discrimination',
  ETHICS: 'ethics',
  PRODUCTION: 'production',
  RUMOR: 'rumor',
})

export const ControversyStatus = Object.freeze({
  ALLEGED: 'alleged',
  FILED: 'filed',
  LITIGATED: 'litigated',
  RESOLVED: 'resolved',
  DISMISSED: 'dismissed',
  ONGOING: 'ongoing',
})

export const SourceTier = Object.freeze({
  COURT_RECORD: 'court_record',
  PRIMARY_INTERVIEW: 'primary_interview',
  REPUTABLE_PRESS: 'reputable_press',
  BRAVO_EPISODE: 'bravo_episode',
  SOCIAL_MEDIA: 'social_media',
  RUMOR_PRESS: 'rumor_press',
})

/**
 * @typedef {keyof typeof RoleType} RoleTypeKey
 * @typedef {keyof typeof CastStatus} CastStatusKey
 * @typedef {keyof typeof ControversyType} ControversyTypeKey
 * @typedef {keyof typeof ControversyStatus} ControversyStatusKey
 * @typedef {keyof typeof SourceTier} SourceTierKey
 */
