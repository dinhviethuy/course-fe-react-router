export const UserStatus = {
  ACTIVE: 'ACTIVE',
  BLOCKED: 'BLOCKED'
} as const

export type UserStatusType = (typeof UserStatus)[keyof typeof UserStatus]
